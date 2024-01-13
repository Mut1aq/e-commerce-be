import { Reflector } from '@nestjs/core';
import { PermissionI } from 'modules/system-users/store-employees/interfaces/permission.interface';

export const Permissions = Reflector.createDecorator<Partial<PermissionI>>();
