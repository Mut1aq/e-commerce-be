import { Prop, SchemaFactory, ModelDefinition, Schema } from '@nestjs/mongoose';
import { Category } from 'modules/store-details/categories/entities/category.entity';
import { User } from 'modules/system-users/users/entities/user.entity';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Store {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  })
  name!: string;

  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  logo!: string;

  @Prop({ type: String, maxlength: 2048, minlength: 3, required: true })
  coverPhoto!: string;

  @Prop({
    type: String,
    minlength: 6,
    maxlength: 18,
    required: true,
  })
  phoneNumber!: string;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.CATEGORY }] })
  categories!: Category[];

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.STORE }] })
  branches!: Store[];
}

const storeSchema = SchemaFactory.createForClass(Store);

export const storeMongooseModel: ModelDefinition = {
  name: SCHEMAS.STORE,
  schema: storeSchema,
};
