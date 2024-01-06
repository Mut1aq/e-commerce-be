import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseModel } from '../users/entities/user.entity';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [MongooseModule.forFeature([userMongooseModel])],
  exports: [AdminsService],
})
export class AdminsModule {}
