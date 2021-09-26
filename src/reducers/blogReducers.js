import {
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_RESET,
  BLOG_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_RESET,
  POST_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_RESET,
  BLOG_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_RESET,
  POST_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_REGISTER_FAIL,
  BLOG_REGISTER_REQUEST,
  BLOG_REGISTER_SUCCESS,
  BLOG_ADD_FAIL,
  BLOG_ADD_REQUEST,
  BLOG_ADD_SUCCESS,
  BLOG_ADD_RESET,
  BLOG_ADD_PREPROD_FAIL,
  BLOG_ADD_PREPROD_REQUEST,
  BLOG_ADD_PREPROD_SUCCESS,
  BLOG_ADD_PREPROD_RESET,
  POST_ADD_FAIL,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_ADD_RESET,
  BLOG_SIGNIN_FAIL,
  BLOG_SIGNIN_REQUEST,
  BLOG_SIGNIN_SUCCESS,
  BLOG_SIGNOUT,
  ///
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_RESET,
  BLOG_UPDATE_SUCCESS,
  /////
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_RESET,
  POST_UPDATE_SUCCESS,
} from "../constants/blogConstants";

export const blogAddReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_ADD_REQUEST:
      return { loading: true };
    case BLOG_ADD_SUCCESS:
      return { loading: false, blogInfo: action.payload };
    case BLOG_ADD_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const blogPreprodAddReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_ADD_PREPROD_REQUEST:
      return { loading: true };
    case BLOG_ADD_PREPROD_SUCCESS:
      return { loading: false, blogInfo: action.payload };
    case BLOG_ADD_PREPROD_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_ADD_PREPROD_RESET:
      return {};
    default:
      return state;
  }
};

//////
export const postAddReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ADD_REQUEST:
      return { loading: true };
    case POST_ADD_SUCCESS:
      return { loading: false, postInfo: action.payload };
    case POST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case POST_ADD_RESET:
      return {};
    default:
      return state;
  }
};
//////////
export const blogRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_REGISTER_REQUEST:
      return { loading: true };
    case BLOG_REGISTER_SUCCESS:
      return { loading: false, blogInfo: action.payload };
    case BLOG_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_SIGNIN_REQUEST:
      return { loading: true };
    case BLOG_SIGNIN_SUCCESS:
      return { loading: false, blogInfo: action.payload };
    case BLOG_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const blogDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

////////
export const postDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case POST_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

/////

export const blogUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return { loading: true };
    case BLOG_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

///////
export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

//////////
export const blogListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
//////////////

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true};
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

/////////
