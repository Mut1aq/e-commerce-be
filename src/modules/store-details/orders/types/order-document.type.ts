import { HydratedDocument } from 'mongoose';
import { Order } from '../entities/order.entity';

export type OrderDocument = HydratedDocument<Order>;
