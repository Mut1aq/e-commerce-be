export enum Role {
  CUSTOMER = 1,
  STORE_OWNER,
  ADMIN = 3,
  STORE_EMPLOYEE,
}

export const ownerAndEmployeeRoles = [Role.STORE_EMPLOYEE, Role.STORE_OWNER];
