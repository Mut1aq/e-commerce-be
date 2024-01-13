import { Action } from 'shared/enums/action.enum';
import { PermissionI } from '../interfaces/permission.interface';

export const storeOnlyPermission: PermissionI = {
  store: [Action.MANAGE],
  category: [],
  product: [],
  variant: [],
  order: [],
  review: [],
  employee: [],
};

export const categoryOnlyPermission: PermissionI = {
  store: [],
  category: [Action.MANAGE],
  product: [],
  variant: [],
  order: [],
  review: [],
  employee: [],
};

export const productOnlyPermission: PermissionI = {
  store: [],
  category: [],
  product: [Action.MANAGE],
  variant: [],
  order: [],
  review: [],
  employee: [],
};

export const variantOnlyPermission: PermissionI = {
  store: [],
  category: [],
  product: [],
  variant: [Action.MANAGE],
  order: [],
  review: [],
  employee: [],
};
