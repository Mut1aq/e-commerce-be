import { Prop, SchemaFactory, ModelDefinition, Schema } from '@nestjs/mongoose';
import { Product } from 'modules/store-details/products/entities/product.entity';
import { Store } from 'modules/store-details/store/entities/store.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  })
  name!: string;

  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  coverPhoto!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.PRODUCTS }] })
  products!: Product[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.STORES })
  store!: Store;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.CATEGORIES }] })
  subCategories!: Category[];
}

const categorySchema = SchemaFactory.createForClass(Category);

export const categoryMongooseModel: ModelDefinition = {
  name: SCHEMAS.CATEGORIES,
  schema: categorySchema,
};
