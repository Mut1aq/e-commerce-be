import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CacheService } from 'core/lib/cache/cache.service';
import { CacheObjectI } from 'core/lib/cache/interfaces/cache-object.interface';
import { UsersService } from 'modules/system-users/users/users.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import {
  PrivateTokenPayloadI,
  PublicTokenPayloadI,
} from 'shared/interfaces/http/token-payload.interface';
import { LogUserInDto } from './dto/log-user-in.dto';
import { Response } from 'express';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}

  async logUserIn(
    logUserInDto: LogUserInDto,
    response: Response,
  ): Promise<ResponseFromServiceI<string>> {
    const { credentials } = logUserInDto;

    const user = await this.usersService.findUserByEmail(credentials);

    if (!user)
      throw new HttpException(
        'User Credentials is incorrect',
        HttpStatus.UNAUTHORIZED,
      );

    const { password } = user;
    const isPasswordCorrect = await bcrypt.compare(
      logUserInDto.password,
      password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        'User Credentials is incorrect',
        HttpStatus.UNAUTHORIZED,
      );

    const privatePayload: PrivateTokenPayloadI = {
      sub: user.id,
      role: user.role,
      permission: user.storeEmployeeProperties?.permission,
    };

    const publicPayload: PublicTokenPayloadI = {
      role: user.role,
      permission: user.storeEmployeeProperties?.permission,
    };

    const userFromCache = await this.cacheService.get<CacheObjectI>(
      user.id + '',
    );

    let permissionToken: string | undefined = undefined;

    if (!userFromCache?.accessToken) {
      const accessToken = this.jwtService.sign(privatePayload, {
        secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
        expiresIn: this.configService.get<string>(
          'USER_ACCESS_TOKEN_EXPIRES_IN',
        )!,
      });
      permissionToken = this.jwtService.sign(publicPayload, {
        secret: this.configService.get<string>('USER_PERMISSION_TOKEN_SECRET')!,
        expiresIn: this.configService.get<string>(
          'USER_PERMISSION_TOKEN_EXPIRES_IN',
        )!,
      });

      await this.cacheService.set(
        user.id + '',
        {
          userID: user.id + '',
          accessToken,
        },
        86400 * 1000,
      );

      const isProduction =
        this.configService.get<string>('NODE_ENV') === 'prod';

      response.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
        expires: new Date(Date.now() + 86400 * 1000),
        secure: isProduction,
      });

      return {
        data: permissionToken,
        message: 'auth.success.login',
        httpStatus: HttpStatus.OK,
      };
    }

    permissionToken = this.jwtService.sign(publicPayload, {
      secret: this.configService.get<string>('USER_PERMISSION_TOKEN_SECRET')!,
      expiresIn: this.configService.get<string>(
        'USER_PERMISSION_TOKEN_EXPIRES_IN',
      )!,
    });

    return {
      data: permissionToken,
      message: 'auth.success.login',
      httpStatus: HttpStatus.OK,
    };
  }
}
