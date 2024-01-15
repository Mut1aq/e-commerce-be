import { Prop, SchemaFactory, Schema, ModelDefinition } from '@nestjs/mongoose';
import { CategoryDocument } from 'modules/store-details/categories/types/category-document.type';
import { VariantDocument } from 'modules/store-details/variants/types/variant-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { MediaObjectI } from 'shared/interfaces/db/media-object.interface';

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
    required: true,
  })
  photos!: MediaObjectI[];

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
  videos!: MediaObjectI[];

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
