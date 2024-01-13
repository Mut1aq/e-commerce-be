import { PermissionI } from 'modules/system-users/store-employees/interfaces/permission.interface';
import { Action } from 'shared/enums/action.enum';

export const createCategory: Partial<PermissionI> = {
  category: [Action.MANAGE, Action.CREATE],
};
