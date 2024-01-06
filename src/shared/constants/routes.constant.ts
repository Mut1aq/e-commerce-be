export const ROUTES = {
  AUTH: {
    CONTROLLER: 'auth',
    REGISTER_CUSTOMER: 'register-customer',
    LOG_USER_IN: 'login-user',
    LOG_OUT: 'logout',
    REGISTER_ADMIN: 'register-admin',
    REGISTER_STORE_OWNER: 'register-store-owner',
  },

  USERS: {
    CONTROLLER: 'users',
    FIND_ALL: '',
    FIND_ONE: ':userID',
    UPDATE_ONE: 'update',
    DELETE_ONE: 'delete',
    FOLLOW_UNFOLLOW: 'follow-unfollow/:userIDToPerformActionOn',
    FOLLOWERS: 'followers/:userIDToView',
    FOLLOWINGS: 'followings/:userIDToView',
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
    CREATE: '',
    FIND_ALL: '',
    FIND_ONE: ':productID',
    UPDATE_ONE: ':productID',
    DELETE_ONE: ':productID',
  },

  CATEGORIES: {
    CONTROLLER: 'categories',
    CREATE: '',
    FIND_ALL: '',
    FIND_ONE: ':categoryID',
    UPDATE_ONE: ':categoryID',
    DELETE_ONE: ':categoryID',
  },
};
