import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderDocument } from 'modules/store-details/orders/types/order-document.type';
import { ProductDocument } from 'modules/store-details/products/types/product-document.type';
import { VariantDocument } from 'modules/store-details/variants/types/variant-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';

@Schema({ timestamps: true })
export class Room {
  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  customer!: UserDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  employee!: UserDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.ORDER })
  order!: OrderDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.PRODUCT })
  product!: ProductDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.VARIANT })
  variant!: VariantDocument;
}

const roomSchema = SchemaFactory.createForClass(Room);

export const roomMongooseModel: ModelDefinition = {
  name: SCHEMAS.ROOM,
  schema: roomSchema,
};
