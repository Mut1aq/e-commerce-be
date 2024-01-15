import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { roomMongooseModel } from './entities/room.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [MongooseModule.forFeature([roomMongooseModel])],
})
export class RoomsModule {}
