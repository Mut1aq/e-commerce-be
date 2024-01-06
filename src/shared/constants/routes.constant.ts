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

  POSTS: {
    CONTROLLER: 'posts',
    CREATE: '',
    FIND_ALL: '',
    FIND_ONE: ':postID',
    UPDATE_ONE: ':postID',
    DELETE_ONE: ':postID',
    FEED: 'feed',
  },
};
