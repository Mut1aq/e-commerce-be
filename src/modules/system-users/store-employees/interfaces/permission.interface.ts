import { Action } from 'shared/enums/action.enum';

export interface PermissionI {
  store: Action[];
  category: Action[];
  product: Action[];
  variant: Action[];
  order: Action[];
  review: Action[];
  employee: Action[];
}
