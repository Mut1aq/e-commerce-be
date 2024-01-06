import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { storeMongooseModel } from './entities/store.entity';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [MongooseModule.forFeature([storeMongooseModel])],
})
export class StoreModule {}
