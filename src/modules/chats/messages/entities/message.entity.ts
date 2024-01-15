import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomDocument } from 'modules/chats/rooms/types/room-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { MediaObjectI } from 'shared/interfaces/db/media-object.interface';

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: String,
    minlength: 1,
    maxlength: 2200,
    required: false,
  })
  name?: string;

  @Prop({
    type: [
      {
        type: {
          url: { type: String, required: true },
          solutionID: { type: String, required: true },
          fileName: { type: String, required: true },
          format: { type: String, required: true },
        },
      },
    ],
    default: undefined,
  })
  images?: MediaObjectI[];

  @Prop({
    type: [
      {
        type: {
          url: { type: String, required: true },
          solutionID: { type: String, required: true },
          fileName: { type: String, required: true },
          format: { type: String, required: true },
        },
      },
    ],
    default: undefined,
  })
  videos?: MediaObjectI[];

  @Prop({
    type: [
      {
        type: {
          url: { type: String, required: true },
          solutionID: { type: String, required: true },
          fileName: { type: String, required: true },
          format: { type: String, required: true },
        },
      },
    ],
    default: undefined,
  })
  documents?: MediaObjectI[];

  @Prop({
    type: {
      url: { type: String, required: true },
      solutionID: { type: String, required: true },
      fileName: { type: String, required: true },
      format: { type: String, required: true },
    },
    default: undefined,
  })
  voice?: MediaObjectI;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  sender!: UserDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  receiver!: UserDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.ROOM })
  room!: RoomDocument;
}

const messageSchema = SchemaFactory.createForClass(Message);

export const messageMongooseModel: ModelDefinition = {
  name: SCHEMAS.MESSAGE,
  schema: messageSchema,
};
