import { Prop, SchemaFactory, ModelDefinition, Schema } from '@nestjs/mongoose';
import { CategoryDocument } from 'modules/store-details/categories/types/category-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { MediaObjectI } from 'shared/interfaces/db/media-object.interface';
import { StoreDocument } from '../types/store-document.type';

@Schema({ timestamps: true })
export class Store {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  })
  name!: string;

  @Prop({
    type: {
      url: { type: String, required: true },
      solutionID: { type: String, required: true },
      fileName: { type: String, required: true },
      format: { type: String, required: true },
    },
    default: true,
  })
  logo!: MediaObjectI;

  @Prop({
    type: {
      url: { type: String, required: true },
      solutionID: { type: String, required: true },
      fileName: { type: String, required: true },
      format: { type: String, required: true },
    },
    default: true,
  })
  coverPhoto!: MediaObjectI;

  @Prop({
    type: String,
    minlength: 6,
    maxlength: 18,
    required: true,
  })
  phoneNumber!: string;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: UserDocument;

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.CATEGORY }] })
  categories!: CategoryDocument[];

  @Prop({ type: [{ type: Types.ObjectId, ref: SCHEMAS.STORE }] })
  branches!: StoreDocument[];
}

const storeSchema = SchemaFactory.createForClass(Store);

export const storeMongooseModel: ModelDefinition = {
  name: SCHEMAS.STORE,
  schema: storeSchema,
};
