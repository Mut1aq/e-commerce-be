import { HydratedDocument } from 'mongoose';
import { Room } from '../entities/room.entity';

export type RoomDocument = HydratedDocument<Room>;
