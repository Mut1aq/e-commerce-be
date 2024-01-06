import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseModel } from '../users/entities/user.entity';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [MongooseModule.forFeature([userMongooseModel])],
  exports: [CustomersService],
})
export class CustomersModule {}
