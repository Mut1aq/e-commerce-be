import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { HttpExceptionFilter } from 'core/exception-filters/http-exception.filter';
import { MongoDbDuplicateKeyFilter } from 'core/exception-filters/mongo-db-duplicate-key.filter';
import { MongooseValidationFilter } from 'core/exception-filters/mongoose-validation.filter';
import { AccessTokenGuard } from 'core/guards/access-token.guard';
import { PermissionsGuard } from 'core/guards/permissions.guard';
import { RolesGuard } from 'core/guards/roles.guard';
import { LoggingInterceptor } from 'core/interceptors/logging.interceptor';
import { ResponseMappingInterceptor } from 'core/interceptors/response-mapping.interceptor';

const accessTokenGuardProvider: Provider<AccessTokenGuard> = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

const rolesGuardProvider: Provider<RolesGuard> = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

const permissionsGuardProvider: Provider<PermissionsGuard> = {
  provide: APP_GUARD,
  useClass: PermissionsGuard,
};

const throttlerGuardProvider: Provider<ThrottlerGuard> = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

const httpExceptionFilterProvider: Provider<HttpExceptionFilter> = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

const loggingInterceptorProvider: Provider<LoggingInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};

const responseMappingInterceptorProvider: Provider<ResponseMappingInterceptor> =
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseMappingInterceptor,
  };

const mongoDbDuplicateKeyFilterProvider: Provider<MongoDbDuplicateKeyFilter> = {
  provide: APP_FILTER,
  useClass: MongoDbDuplicateKeyFilter,
};

const mongooseValidationFilterProvider: Provider<MongooseValidationFilter> = {
  provide: APP_FILTER,
  useClass: MongooseValidationFilter,
};

export const filters = [
  httpExceptionFilterProvider,
  mongoDbDuplicateKeyFilterProvider,
  mongooseValidationFilterProvider,
];
export const guards = [
  accessTokenGuardProvider,
  rolesGuardProvider,
  permissionsGuardProvider,
  throttlerGuardProvider,
];
export const interceptors = [
  loggingInterceptorProvider,
  responseMappingInterceptorProvider,
];
