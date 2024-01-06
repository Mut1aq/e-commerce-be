import { Module } from '@nestjs/common';
import { StoreOwnersService } from './store-owners.service';
import { StoreOwnersController } from './store-owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseModel } from '../users/entities/user.entity';

@Module({
  controllers: [StoreOwnersController],
  providers: [StoreOwnersService],
  exports: [StoreOwnersService],
  imports: [MongooseModule.forFeature([userMongooseModel])],
})
export class StoreOwnersModule {}
