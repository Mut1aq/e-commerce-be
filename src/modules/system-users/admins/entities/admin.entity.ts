import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'modules/system-users/users/entities/user.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ _id: false, timestamps: false })
export class AdminProperties {
  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.USERS }] })
  suspendedUsers!: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.USERS }] })
  deletedUsers!: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.USERS }] })
  storeOwners!: User[];
}

export const adminPropertiesSchema =
  SchemaFactory.createForClass(AdminProperties);
