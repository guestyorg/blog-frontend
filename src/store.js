// import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';

// import thunk from "redux-thunk";

// import {
//   accountDeleteReducer,
//   accountDetailsReducer,
//   accountListReducer,
//   accountRegisterReducer,
//   accountSigninReducer,
//   accountUpdateReducer,
// } from "./reducers/accountReducers";

// import {
//   userDeleteReducer,
//   userDetailsReducer,
//   userListReducer,
//   userRegisterReducer,
//   userSigninReducer,
//   userUpdateReducer,
// } from "./reducers/userReducers";

// ////

// import {
//   blogDeleteReducer,
//   blogDetailsReducer,
//   blogListReducer,
//   blogRegisterReducer,
//   blogSigninReducer,
//   blogUpdateReducer,
// } from "./reducers/blogReducers";

// const initialState = {
//   userSignin: {
//     userInfo: localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo"))
//       : null,
//   },

//   accountSignin: {
//     accountInfo: localStorage.getItem("accountInfo")
//       ? JSON.parse(localStorage.getItem("accountInfo"))
//       : null,
//   },
// };
// const reducer = combineReducers({
//   userRegister: userRegisterReducer,

//   userSignin: userSigninReducer,

//   userDetails: userDetailsReducer,
//   userUpdate: userUpdateReducer,

//   userList: userListReducer,
//   userDelete: userDeleteReducer,

//   /////

//   blogRegister: blogRegisterReducer,

//   blogSignin: blogSigninReducer,

//   blogDetails: blogDetailsReducer,
//   blogUpdate: blogUpdateReducer,

//   blogList: blogListReducer,
//   blogDelete: blogDeleteReducer,

//   /////

//   accountRegister: accountRegisterReducer,

//   accountSignin: accountSigninReducer,

//   accountDetails: accountDetailsReducer,
//   accountUpdate: accountUpdateReducer,

//   accountList: accountListReducer,
//   accountDelete: accountDeleteReducer,
// });
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

// export default store;

import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

import {
  accountDeleteReducer,
  accountDetailsReducer,
  accountListReducer,
  accountRegisterReducer,
  accountSigninReducer,
  accountUpdateReducer,
} from "./reducers/accountReducers";

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userAddReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  blogDeleteReducer,
  postDeleteReducer,
  blogDetailsReducer,
  postDetailsReducer,
  blogListReducer,
  blogRegisterReducer,
  blogAddReducer,
  postAddReducer,
  blogSigninReducer,
  blogUpdateReducer,
  postUpdateReducer
} from "./reducers/blogReducers";

const initialState = {
  accountSignin: {
    accountInfo: localStorage.getItem("accountInfo")
      ? JSON.parse(localStorage.getItem("accountInfo"))
      : null,
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// temp reducer to be removed
// Once real reducers added you can delete this
const tempReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// shape the state structure
const rootReducer = combineReducers({
  userRegister: userRegisterReducer,

  userAdd: userAddReducer,

  userSignin: userSigninReducer,

  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,

  userList: userListReducer,
  userDelete: userDeleteReducer,

  blogRegister: blogRegisterReducer,

  blogAdd: blogAddReducer,

  postAdd: postAddReducer,

  blogSignin: blogSigninReducer,

  blogDetails: blogDetailsReducer,

  postDetails: postDetailsReducer,

  blogUpdate: blogUpdateReducer,


  postUpdate: postUpdateReducer,


  blogList: blogListReducer,
  blogDelete: blogDeleteReducer,

  postDelete: postDeleteReducer,

  accountRegister: accountRegisterReducer,

  accountSignin: accountSigninReducer,

  accountDetails: accountDetailsReducer,
  accountUpdate: accountUpdateReducer,

  accountList: accountListReducer,
  accountDelete: accountDeleteReducer,
});

// Add custom middleware here
const featureMiddleware = [];

/**
 * Initialize the redux store
 * Create the store
 * Applying extra arguments
 * To pass further arguments please config the function
 * @param initialState  {Object}  initial state for store
 * @param api {Object}  API class for api middleware
 * @return {Store<any, AnyAction> & {dispatch: any}}
 */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// (initialState = {
//   userSignin: {
//     userInfo: localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo"))
//       : null,
//   },
// }),
//   api;

export default () => {
  // console.log('initialState:', initialState)
  const store = createStore(
    rootReducer,
    initialState,
    // composeEnhancer(
    //   applyMiddleware(...featureMiddleware, thunk.withExtraArgument(api))
    // )
    composeEnhancer(applyMiddleware(thunk))
  );
  return store;
};
