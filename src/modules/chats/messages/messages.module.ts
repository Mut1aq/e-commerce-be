import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { UsersModule } from 'modules/system-users/users/users.module';
import { RoomsModule } from '../rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { messageMongooseModel } from './entities/message.entity';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
  imports: [
    UsersModule,
    RoomsModule,
    MongooseModule.forFeature([messageMongooseModel]),
  ],
})
export class MessagesModule {}
