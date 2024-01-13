import { Module } from '@nestjs/common';
import { StoreEmployeesService } from './store-employees.service';
import { StoreEmployeesController } from './store-employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseModel } from '../users/entities/user.entity';

@Module({
  controllers: [StoreEmployeesController],
  providers: [StoreEmployeesService],
  exports: [StoreEmployeesService],
  imports: [MongooseModule.forFeature([userMongooseModel])],
})
export class StoreEmployeesModule {}
