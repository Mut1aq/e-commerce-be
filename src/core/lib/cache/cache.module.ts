import { CacheModule as NestJSCacheModule } from '@nestjs/cache-manager';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { cacheManagerOptions } from 'shared/configs/app.option';
import { CacheService } from './cache.service';

@Global()
@Module({})
export class CacheModule {
  static register(): DynamicModule {
    let options = null;
    switch (process.env.CACHE_SOLUTION) {
      case 'CACHE-MANAGER-REDIS-YET':
        options = cacheManagerOptions;
        break;
    }

    return {
      providers: [CacheService],
      imports: [NestJSCacheModule.registerAsync(options!)],
      exports: [CacheService],
      module: CacheModule,
    };
  }
}
