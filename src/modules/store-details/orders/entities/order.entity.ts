import {
  ModelDefinition,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ProductDocument } from 'modules/store-details/products/types/product-document.type';
import { VariantDocument } from 'modules/store-details/variants/types/variant-document.type';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { OrderStatus } from '../enums/order-status.enum';
import { TimelineI } from '../interfaces/timeline.interface';

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: [
      raw({
        status: { type: Number, enum: OrderStatus, required: true },
        date: { type: String, required: true },
        message: { type: String, required: false },
      }),
    ],
    default: { status: OrderStatus.PENDING, date: new Date().toUTCString() },
  })
  timeline!: TimelineI[];

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.PRODUCT })
  product!: ProductDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.VARIANT, default: undefined })
  variant?: VariantDocument;

  @Prop({ type: Types.ObjectId, ref: SCHEMAS.USER })
  author!: UserDocument;
}

const orderSchema = SchemaFactory.createForClass(Order);

export const orderMongooseModel: ModelDefinition = {
  name: SCHEMAS.ORDER,
  schema: orderSchema,
};
