import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductDocument } from 'modules/store-details/products/types/product-document.type';
import { VariantDocument } from 'modules/store-details/variants/types/variant-document.type';
import { User } from 'modules/system-users/users/entities/user.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Review {
  @Prop({
    type: String,
    minlength: 10,
    maxlength: 2200,
    required: false,
    default: undefined,
  })
  text?: string;

  @Prop({
    type: Number,
    min: 0,
    max: 5,
    required: true,
  })
  star!: number;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.PRODUCT })
  product!: ProductDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.VARIANT, default: undefined })
  variant?: VariantDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: User;
}

const reviewSchema = SchemaFactory.createForClass(Review);

export const reviewMongooseModel: ModelDefinition = {
  name: SCHEMAS.REVIEW,
  schema: reviewSchema,
};
