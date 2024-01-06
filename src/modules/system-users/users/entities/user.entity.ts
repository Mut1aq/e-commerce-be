import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AdminProperties,
  adminPropertiesSchema,
} from 'modules/system-users/admins/entities/admin.entity';
import {
  CustomerProperties,
  customerPropertiesSchema,
} from 'modules/system-users/customers/entities/customer-properties.entity';
import {
  storeOwnerPropertiesSchema,
  StoreOwnerProperties,
} from 'modules/system-users/store-owners/entities/store-owner.entity';

import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Role } from 'shared/enums/role.enum';
import { AccountStatus } from '../enums/account-status.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    minlength: 5,
    maxlength: 320,
    required: true,
    unique: true,
    lowercase: true,
  })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({
    type: Number,
    enum: Role,
    required: true,
  })
  role!: Role;

  @Prop({
    type: Number,
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  accountStatus!: AccountStatus;

  @Prop({
    type: storeOwnerPropertiesSchema,
    required: false,
    default: undefined,
  })
  storeOwnerProperties?: StoreOwnerProperties;

  @Prop({
    type: customerPropertiesSchema,
    required: false,
    default: undefined,
  })
  customerProperties?: CustomerProperties;

  @Prop({
    type: adminPropertiesSchema,
    required: false,
    default: undefined,
  })
  adminProperties?: AdminProperties;
}

const UserSchema = SchemaFactory.createForClass(User);

export const userMongooseModel: ModelDefinition = {
  name: SCHEMAS.USERS,
  schema: UserSchema,
};
