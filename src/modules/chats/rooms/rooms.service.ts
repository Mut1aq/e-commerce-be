import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomDocument } from './types/room-document.type';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(SCHEMAS.ROOM) private readonly roomModel: Model<Room>,
  ) {}
  create(_createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, _updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  findByIDAndChatParticipant(roomID: string, userID: string | Types.ObjectId) {
    userID = new Types.ObjectId(userID);
    return this.roomModel.findOne<RoomDocument>({
      $and: [
        { _id: new Types.ObjectId(roomID) },
        {
          $or: [
            {
              customer: userID,
            },
            {
              employee: userID,
            },
          ],
        },
      ],
    });
  }
}
