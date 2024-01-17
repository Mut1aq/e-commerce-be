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
import { Roles } from 'core/decorators/roles.decorator';
import { CacheService } from 'core/lib/cache/cache.service';
import { CacheObjectI } from 'core/lib/cache/interfaces/cache-object.interface';
import { DecodedTokenI } from 'shared/interfaces/http/decoded-token.interface';
import { RequestI } from 'shared/interfaces/http/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
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

      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles) {
        return true;
      }

      const accessToken = request.cookies['accessToken'];

      const decodedToken = this.jwtService.verify<DecodedTokenI>(accessToken, {
        secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
      });

      const { sub, role } = decodedToken;

      const cacheObject = await this.cacheService.get<CacheObjectI>(sub + '');

      const isTokenFromCacheSameAsTokenFromHeaders =
        cacheObject?.accessToken === accessToken;

      if (!isTokenFromCacheSameAsTokenFromHeaders)
        throw new HttpException('Nice Try', HttpStatus.UNAUTHORIZED);

      const isRoleIncluded = roles.includes(role);

      if (!isRoleIncluded)
        throw new HttpException(
          'You are not authorized for this action',
          HttpStatus.UNAUTHORIZED,
        );

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
