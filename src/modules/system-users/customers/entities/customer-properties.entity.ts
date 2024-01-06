import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: false })
export class CustomerProperties {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
    lowercase: true,
    sparse: true,
  })
  username!: string;

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
}

export const customerPropertiesSchema =
  SchemaFactory.createForClass(CustomerProperties);
