import Axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_ADD_FAIL,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

import { makeDataForTable, prices, ratings } from "../utils";

import Resource from "@guestyci/agni";
// const { api, env, config } = Resource.create();
const temp = Resource.create("user");
temp.api.defaults.baseURL = `http://localhost:9999/api/users`;

//http://localhost:9999/blog-hydra/api/users

const userApi = temp.api;

export const listUsers = (view) => async (dispatch, getState) => {
  console.log("view:", view);
  // console.log("ratings:", ratings);
  // console.log("prices:", prices);

  dispatch({ type: USER_LIST_REQUEST });
  console.log("USER_LIST_REQUEST");

  const {
    accountSignin: { accountInfo },
  } = getState();

  try {
    // console.log("accountInfo:", accountInfo);
    const { data } = await userApi.post("/", { accountInfo, view });

    // console.log("data:", data);

    // let counter = 1;

    let arr = makeDataForTable(data);
    console.log("arr: ", arr);
    //  setData(response.data.results)

    dispatch({ type: USER_LIST_SUCCESS, payload: arr });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

// /////////////////////// listUser ideal ///////////////

// export const listUsers = () => async (dispatch) => {
//   dispatch({ type: USER_LIST_REQUEST });
//   console.log("USER_LIST_REQUEST");
//   try {
//     // const temp = Resource.create('tasks');
//     // temp.api.defaults.baseURL = `http://localhost:9999/tasks`;
//     // export const tasksApi = temp.api;

//     // const { data } = await userApi.get("http://localhost:9999/api/users");

//     const { data } = await userApi.get(); // will go to `${config.MAILER_URL}/users`

//     console.log("data:", data);

//     let counter = 1;
//     const arr = [];

//     let users = data;

//     for (let i = 0; i < users.length; i++) {
//       // console.log("users[i]: ", users[i]);

//       const arrUser = Object.entries(users[i]);
//       console.log("arrUser:", arrUser);

//       //  firstName: {
//       //   children: 'John',
//       // },

//       const bigObj = {};

//       for (let j = 0; j < arrUser.length; j++) {
//         const obj = {};
//         // console.log("arrUser[j]: ", arrUser[j]);
//         // console.log("arrUser[0]: ",arrUser[j][0]);
//         // console.log("arrUser[1]: ",arrUser[j][1]);

//         // console.log("obj:", obj);

//         if (arrUser[j][0] === "_id") {
//           obj.children = arrUser[j][1];
//           //         obj= {children: '613e616d7ab4e566768e79d5'}

//           bigObj.id = obj;
//           //    bigObj= {id: {children: '613e616d7ab4e566768e79d5'}}

//           bigObj._id = arrUser[j][1];

//           //   bigObj= {_id: '613e616d7ab4e566768e79d5'}
//         } else if (
//           arrUser[j][0] === "createdAt" ||
//           arrUser[j][0] === "updatedAt"
//         ) {
//           // ['createdAt', '2021-09-13T08:46:49.849Z']

//           obj.children = new Date(arrUser[j][1]).toLocaleString();
//           // {children: '9/13/2021, 11:46:49 AM'}

//           bigObj[arrUser[j][0]] = obj;

//           // {createdAt: {children: '9/13/2021, 11:46:49 AM'}}
//         } else if (arrUser[j][0] === "accountId") {
//           // console.log("arrUser:", arrUser);

//           // ['accountId',  {_id: '613e1486e5218626969838f0', name: 'Karamba'}]
//           obj.children = arrUser[j][1].name;

//           // {children: 'Karamba'}

//           bigObj[arrUser[j][0]] = obj;
//           //{ accountId: {children: 'Karamba'}}
//         } else {
//           // ['firstName', 'miki']

//           obj.children = arrUser[j][1];

//           // {children: 'miki'}

//           bigObj[arrUser[j][0]] = obj;

//           // firstName: {children: 'miki'}
//         }

//         // console.log("bigObj:", bigObj);

//         // arr.push( `${arrUser[j][0]}: {children: '${arrUser[j][1]}',}`)
//       }
//       // arr.push({gilad:1,...users[i]})
//       arr.push({ ...bigObj });
//       // arr.push({ _id: `${counter}`, ...bigObj });

//       counter++;
//     }

//     console.log("arr: ", arr);
//     //  setData(response.data.results)

//     dispatch({ type: USER_LIST_SUCCESS, payload: arr });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_LIST_FAIL, payload: message });
//   }
// };

// /////////////////////////////////////////////////
export const add =
  (firstName, lastName, email, accountId) => async (dispatch) => {
    dispatch({
      type: USER_ADD_REQUEST,
      payload: { firstName, lastName, email, accountId },
    });
    try {
      const { data } = await userApi.post("/register", {
        firstName,
        lastName,
        email,
        accountId,
      });

      dispatch({ type: USER_ADD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const register =
  (firstName, lastName, email, accountId) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { firstName, lastName, email, accountId },
    });
    try {

      
      // const { data } = await userApi.post("/register", {
      //   firstName,
      //   lastName,
      //   email,
      //   accountId,
      // });

      const { data } = await await Axios.post("http://localhost:9999/api/users/register", {
        firstName,
        lastName,
        email,
        accountId,
      });


      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email, accountId) => async (dispatch) => {
  // console.log("accountId:", accountId);
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, accountId } });
  try {
    const { data } = await userApi.post("/signin", { email, accountId });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // dispatch(emailUser(email));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // console.log("error :", error);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_SIGNOUT });
  // document.location.href = "/signin";
};

export const deleteUser = (userId) => async (dispatch) => {
  console.log("userId:", userId);
  console.log("deleteUser");
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });

  try {
    const { data } = await userApi.delete(`/${userId}`);
    console.log("data:", data);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const detailsUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

  try {
    const { data } = await userApi.get(`/${userId}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch) => {
  console.log("updateUser");
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  try {
    console.log("user:", user);
    const { data } = await userApi.patch(`/${user.userId}`, user);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};
