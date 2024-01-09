import { Prop, SchemaFactory, ModelDefinition, Schema } from '@nestjs/mongoose';
import { Product } from 'modules/store-details/products/entities/product.entity';
import { Store } from 'modules/store-details/stores/entities/store.entity';
import { User } from 'modules/system-users/users/entities/user.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

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
  products!: Product[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.STORE })
  store!: Store;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.CATEGORY }] })
  subCategories!: Category[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: User;
}

const categorySchema = SchemaFactory.createForClass(Category);

export const categoryMongooseModel: ModelDefinition = {
  name: SCHEMAS.CATEGORY,
  schema: categorySchema,
};
