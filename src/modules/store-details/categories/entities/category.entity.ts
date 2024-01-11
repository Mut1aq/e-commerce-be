import { Prop, SchemaFactory, ModelDefinition, Schema } from '@nestjs/mongoose';
import { ProductDocument } from 'modules/store-details/products/types/product-document.type';
import { StoreDocument } from 'modules/store-details/stores/types/store-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { CategoryDocument } from '../types/category-document.type';

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  })
  name!: string;

  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  coverPhoto!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.PRODUCT }] })
  products!: ProductDocument[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.STORE })
  store!: StoreDocument;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.CATEGORY }] })
  subCategories!: CategoryDocument[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: UserDocument;
}

const categorySchema = SchemaFactory.createForClass(Category);

export const categoryMongooseModel: ModelDefinition = {
  name: SCHEMAS.CATEGORY,
  schema: categorySchema,
};
