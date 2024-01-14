export const ROUTES = {
  AUTH: {
    CONTROLLER: 'auth',
    REGISTER_CUSTOMER: 'register-customer',
    LOG_USER_IN: 'login-user',
    LOG_OUT: 'logout',
    REGISTER_ADMIN: 'register-admin',
    REGISTER_STORE_OWNER: 'register-store-owner',
    REGISTER_STORE_EMPLOYEE: 'register-store-employee',
  },

  USERS: {
    CONTROLLER: 'users',
    UPDATE_PROFILE: 'profile',
  },

  STORES: {
    CONTROLLER: 'stores',
    CREATE: '',
    FIND_ALL: '',
    FIND_ONE: ':storeID',
    UPDATE_ONE: ':storeID',
    DELETE_ONE: ':storeID',
  },

  PRODUCTS: {
    CONTROLLER: 'products',
    CREATE: ':categoryID',
    FIND_ALL: '',
    FIND_ALL_FOR_CATEGORY: ':categoryID',
    FIND_ONE: ':productID',
    UPDATE_ONE: ':productID',
    DELETE_ONE: ':productID',
  },

  VARIANTS: {
    CONTROLLER: 'variants',
    CREATE: ':productID',
    FIND_ALL: ':productID',
    FIND_ONE: ':variantID',
    UPDATE_ONE: ':productID/:variantID',
    DELETE_ONE: ':variantID',
  },

  CATEGORIES: {
    CONTROLLER: 'categories',
    CREATE: ':storeID',
    FIND_ALL: '',
    FIND_ONE: ':categoryID',
    UPDATE_ONE: ':categoryID',
    DELETE_ONE: ':categoryID',
  },
};
