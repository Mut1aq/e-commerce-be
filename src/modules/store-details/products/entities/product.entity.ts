import { Prop, SchemaFactory, Schema, ModelDefinition } from '@nestjs/mongoose';
import { CategoryDocument } from 'modules/store-details/categories/types/category-document.type';
import { VariantDocument } from 'modules/store-details/variants/types/variant-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    minlength: 10,
    maxlength: 2200,
    required: true,
  })
  description!: string;

  @Prop({
    type: Number,
    min: 0,
    max: 100000,
    required: true,
  })
  price!: number;

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

  @Prop({
    type: [{ type: String, maxlength: 2048, minlength: 3, required: true }],
  })
  photos!: string[];

  @Prop({
    type: [{ type: String, maxlength: 2048, minlength: 3, required: true }],
  })
  videos!: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.VARIANT }] })
  variants!: VariantDocument[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.CATEGORY })
  category!: CategoryDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: UserDocument;
}

const productSchema = SchemaFactory.createForClass(Product);

export const productMongooseModel: ModelDefinition = {
  name: SCHEMAS.PRODUCT,
  schema: productSchema,
};
