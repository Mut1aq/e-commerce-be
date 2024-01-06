import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreOwnerDto } from './create-store-owner.dto';

export class UpdateStoreOwnerDto extends PartialType(CreateStoreOwnerDto) {}
