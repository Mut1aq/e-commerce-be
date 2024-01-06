import { Reflector } from '@nestjs/core';
import { Role } from 'shared/enums/role.enum';

export const Roles = Reflector.createDecorator<Role[]>();
