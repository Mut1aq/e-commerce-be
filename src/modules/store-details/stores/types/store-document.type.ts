import { HydratedDocument } from 'mongoose';
import { Store } from '../entities/store.entity';

export type StoreDocument = HydratedDocument<Store>;
