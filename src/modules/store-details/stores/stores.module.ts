import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreOwnersModule } from 'modules/system-users/store-owners/store-owners.module';
import { storeMongooseModel } from './entities/store.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
  imports: [MongooseModule.forFeature([storeMongooseModel]), StoreOwnersModule],
})
export class StoresModule {}
