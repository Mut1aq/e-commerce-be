import { PermissionI } from 'modules/system-users/store-employees/interfaces/permission.interface';
import { Role } from 'shared/enums/role.enum';

export interface PrivateTokenPayloadI {
  sub: string;
  role: Role;
  permission?: PermissionI | undefined;
}

export interface PublicTokenPayloadI {
  role: Role;
  permission?: PermissionI | undefined;
}
