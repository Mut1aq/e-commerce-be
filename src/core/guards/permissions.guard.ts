import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'core/decorators/public.decorator';
import { CacheService } from 'core/lib/cache/cache.service';
import { CacheObjectI } from 'core/lib/cache/interfaces/cache-object.interface';
import { Role } from 'shared/enums/role.enum';
import { DecodedTokenI } from 'shared/interfaces/http/decoded-token.interface';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { Permissions } from 'core/decorators/permissions.decorator';
import { PermissionI } from 'modules/system-users/store-employees/interfaces/permission.interface';
import { Action } from 'shared/enums/action.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<RequestI>();

      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getClass(), context.getHandler()],
      );

      if (isPublic) return true;

      const permissionFromMetadata = this.reflector.get(
        Permissions,
        context.getHandler(),
      ) as PermissionI & { [key: string]: Action[] };
      if (!permissionFromMetadata) {
        return true;
      }

      const authorization = request.headers.authorization;

      if (
        !authorization ||
        Array.isArray(authorization) ||
        typeof authorization !== 'string'
      )
        throw new HttpException('Invalid Headers', HttpStatus.UNAUTHORIZED);

      const [bearer, accessToken] = authorization.split(' ');

      if (bearer !== 'Bearer')
        throw new HttpException('Invalid Headers', HttpStatus.UNAUTHORIZED);

      const decodedToken = this.jwtService.verify<DecodedTokenI>(accessToken, {
        secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
      });

      const { sub, role, permission } = decodedToken;

      if (role === Role.STORE_OWNER) return true;

      if (!permission || role !== Role.STORE_EMPLOYEE)
        throw new HttpException(
          'You are not authorized',
          HttpStatus.UNAUTHORIZED,
        );

      const cacheObject = await this.cacheService.get<CacheObjectI>(sub + '');

      const isTokenFromCacheSameAsTokenFromHeaders =
        cacheObject?.accessToken === accessToken;

      if (!isTokenFromCacheSameAsTokenFromHeaders)
        throw new HttpException('Nice Try', HttpStatus.UNAUTHORIZED);

      for (const firstLevelPermissionKey in permissionFromMetadata) {
        const firstLevelElement =
          permissionFromMetadata[firstLevelPermissionKey]!;
        const secondLevelElement = (
          permission as PermissionI & { [key: string]: Action[] }
        )[firstLevelPermissionKey];

        const isActionIncluded = firstLevelElement.some((action) =>
          secondLevelElement.includes(action),
        );
        if (!isActionIncluded)
          throw new HttpException(
            'You are not authorized for this action',
            HttpStatus.UNAUTHORIZED,
          );
      }

      return true;
    } catch (error: any) {
      throw new HttpException(
        !!error?.message
          ? error.message
          : 'You are not authorized for this action',
        !!error?.status ? error.status : HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
