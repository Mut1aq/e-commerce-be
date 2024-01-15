import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Action } from 'shared/enums/action.enum';
import { PermissionI } from '../interfaces/permission.interface';

@Schema({ _id: false, timestamps: false })
export class StoreEmployeeProperties {
  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  identity!: string;

  // @Prop(mediaObjectProp)
  // identity!: MediaObjectI;

  @Prop({
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  })
  lastName!: string;

  @Prop({
    type: String,
    required: true,
  })
  birthday!: string;

  @Prop({
    type: String,
    required: true,
  })
  hireDate!: string;

  @Prop({
    type: String,
    minlength: 6,
    maxlength: 18,
    required: true,
    unique: true,
    sparse: true,
  })
  phoneNumber!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.STORE }] })
  firedEmployees!: UserDocument[];

  @Prop(
    raw({
      store: { type: [{ type: Number, enum: Action }] },
      category: { type: [{ type: Number, enum: Action }] },
      product: { type: [{ type: Number, enum: Action }] },
      variant: { type: [{ type: Number, enum: Action }] },
      order: { type: [{ type: Number, enum: Action }] },
      review: { type: [{ type: Number, enum: Action }] },
      storeEmployees: { type: [{ type: Number, enum: Action }] },
    }),
  )
  permission!: PermissionI;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: UserDocument;
}

export const storeEmployeePropertiesSchema = SchemaFactory.createForClass(
  StoreEmployeeProperties,
);
