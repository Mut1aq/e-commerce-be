import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StoreDocument } from 'modules/store-details/stores/types/store-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ _id: false, timestamps: false })
export class StoreOwnerProperties {
  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  identity!: string;

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
    minlength: 6,
    maxlength: 18,
    required: true,
    unique: true,
    sparse: true,
  })
  phoneNumber!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.STORE }] })
  stores!: StoreDocument[];
}

export const storeOwnerPropertiesSchema =
  SchemaFactory.createForClass(StoreOwnerProperties);
