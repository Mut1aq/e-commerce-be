import { HydratedDocument } from 'mongoose';
import { Variant } from '../entities/variant.entity';

export type VariantDocument = HydratedDocument<Variant>;
