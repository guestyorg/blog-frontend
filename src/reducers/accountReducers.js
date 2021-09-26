import {
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_RESET,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_RESET,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_SIGNIN_FAIL,
  ACCOUNT_SIGNIN_REQUEST,
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNOUT,
  

  ACCOUNT_UPDATE_FAIL,
 
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_RESET,
  ACCOUNT_UPDATE_SUCCESS,

 
} from "../constants/accountConstants";


export const accountRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_REGISTER_REQUEST:
      return { loading: true };
    case ACCOUNT_REGISTER_SUCCESS:
      return { loading: false, accountInfo: action.payload };
    case ACCOUNT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accountSigninReducer = (state = {}, action) => {
  // console.log('accountSigninReducer:', accountSigninReducer)
  switch (action.type) {
    case ACCOUNT_SIGNIN_REQUEST:
      return { loading: true };
    case ACCOUNT_SIGNIN_SUCCESS:
      return { loading: false, accountInfo: action.payload };
    case ACCOUNT_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_SIGNOUT:
      return {};
    default:
      return state;
  }
};



export const accountDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ACCOUNT_DETAILS_REQUEST:
      return { loading: true };
    case ACCOUNT_DETAILS_SUCCESS:
      return { loading: false, account: action.payload };
    case ACCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const accountUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_REQUEST:
      return { loading: true };
    case ACCOUNT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ACCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const accountListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ACCOUNT_LIST_REQUEST:
      return { loading: true };
    case ACCOUNT_LIST_SUCCESS:
      return { loading: false, accounts: action.payload };
    case ACCOUNT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const accountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_DELETE_REQUEST:
      return { loading: true };
    case ACCOUNT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ACCOUNT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


