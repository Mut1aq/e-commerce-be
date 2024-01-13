import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreEmployeeDto } from './create-store-employee.dto';

export class UpdateStoreEmployeeDto extends PartialType(CreateStoreEmployeeDto) {}
