import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'modules/store-details/products/entities/product.entity';
import { User } from 'modules/system-users/users/entities/user.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Variant {
  @Prop({
    type: String,
    minlength: 1,
    maxlength: 50,
    required: false,
    default: undefined,
  })
  size?: string;

  @Prop({
    type: String,
    minlength: 4,
    maxlength: 7,
    required: false,
    default: undefined,
  })
  color?: string;

  @Prop({
    type: String,
    minlength: 1,
    maxlength: 50,
    required: false,
    default: undefined,
  })
  material?: string;

  @Prop({
    type: String,
    minlength: 1,
    maxlength: 50,
    required: false,
    default: undefined,
  })
  style?: string;

  @Prop({
    type: Number,
    min: 0,
    max: 10000,
    required: true,
  })
  quantity!: number;

  @Prop({
    type: Number,
    min: 0,
    max: 100000,
    required: false,
    default: undefined,
  })
  price?: number;

  @Prop({
    type: Number,
    min: 0,
    max: 99999,
    required: false,
    default: undefined,
  })
  discountedPrice?: number;

  @Prop({
    type: Number,
    min: 1,
    max: 99,
    required: false,
    default: undefined,
  })
  discountedRate?: number;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.PRODUCT })
  product!: Product;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: User;
}

const variantSchema = SchemaFactory.createForClass(Variant);

export const variantMongooseModel: ModelDefinition = {
  name: SCHEMAS.VARIANT,
  schema: variantSchema,
};
