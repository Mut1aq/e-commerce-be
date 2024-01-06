import { Prop, SchemaFactory, ModelDefinition, Schema } from '@nestjs/mongoose';
import { User } from 'modules/system-users/users/entities/user.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Store {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  })
  name!: string;

  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  logo!: string;

  @Prop({
    type: String,
    minlength: 6,
    maxlength: 18,
    required: true,
  })
  phoneNumber!: string;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USERS })
  author!: User;
}

const storeSchema = SchemaFactory.createForClass(Store);

export const storeMongooseModel: ModelDefinition = {
  name: SCHEMAS.STORES,
  schema: storeSchema,
};
