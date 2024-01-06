import { Prop, SchemaFactory, Schema, ModelDefinition } from '@nestjs/mongoose';
import { Category } from 'modules/store-details/categories/entities/category.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { variantProp } from '../constants/variant-prop.constant';
import { VariantI } from '../interfaces/variant.interface';

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  })
  name!: string;

  @Prop({
    type: String,
    minlength: 10,
    maxlength: 2200,
    required: true,
    unique: true,
  })
  description!: string;

  @Prop({
    type: [{ type: String, maxlength: 2048, minlength: 3, required: true }],
  })
  photos!: string[];

  @Prop({
    type: [{ type: String, maxlength: 2048, minlength: 3, required: true }],
  })
  videos!: string[];

  @Prop(variantProp)
  variant!: VariantI;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.CATEGORIES })
  category!: Category;
}

const productSchema = SchemaFactory.createForClass(Product);

export const productMongooseModel: ModelDefinition = {
  name: SCHEMAS.CATEGORIES,
  schema: productSchema,
};
