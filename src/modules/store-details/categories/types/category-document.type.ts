import { HydratedDocument } from 'mongoose';
import { Category } from '../entities/category.entity';

export type CategoryDocument = HydratedDocument<Category>;
