import { Role } from 'shared/enums/role.enum';

export interface TokenPayloadI {
  sub: string;
  role: Role;
}
