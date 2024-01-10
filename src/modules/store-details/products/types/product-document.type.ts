import { HydratedDocument } from 'mongoose';
import { Product } from '../entities/product.entity';

export type ProductDocument = HydratedDocument<Product>;
