import Axios from "axios";
import {
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_SIGNIN_FAIL,
  ACCOUNT_SIGNIN_REQUEST,
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNOUT,
  ACCOUNT_UPDATE_PROFILE_FAIL,
  ACCOUNT_UPDATE_PROFILE_REQUEST,
  ACCOUNT_UPDATE_PROFILE_SUCCESS,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
} from "../constants/accountConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

import Resource from "@guestyci/agni";
import { updateUser } from "./userActions";
// const { api, env, config } = Resource.create();
const temp = Resource.create("account");
temp.api.defaults.baseURL = `http://localhost:9999/api/accounts`;
const accountApi = temp.api;

export const register =
  (name, email, creatorName, creatorEmail, userId, createAccount) =>
  async (dispatch) => {
    dispatch({
      type: ACCOUNT_REGISTER_REQUEST,
      payload: { name, email, creatorName, creatorEmail, userId },
    });
    try {
      const { data } = await Axios.post("http://localhost:9999/api/accounts/register", {
        name,
        email,
        creatorName,
        creatorEmail,
      });
      // console.log("data:================", data);

      let accountId = data._id;
      // const { data } = await accountApi.post(
      //   "/register",
      //   {
      //     name,
      //     email,
      //   }
      // );
      dispatch(updateUser({ userId, accountId, createAccount }));

      dispatch({ type: ACCOUNT_REGISTER_SUCCESS, payload: data });

      dispatch({ type: ACCOUNT_SIGNIN_SUCCESS, payload: data });

      localStorage.setItem("accountInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ACCOUNT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email, accountId) => async (dispatch) => {
  dispatch({ type: ACCOUNT_SIGNIN_REQUEST, payload: { email, accountId } });
  try {
    // const { data } = await accountApi.post("/signin", { email, accountId });
    const { data } = await Axios.post("http://localhost:9999/api/accounts/signin", { email, accountId });

    dispatch({ type: ACCOUNT_SIGNIN_SUCCESS, payload: data });
    // dispatch(emailAccount(email));

    localStorage.setItem("accountInfo", JSON.stringify(data));
  } catch (error) {
    // console.log("error :", error);
    dispatch({
      type: ACCOUNT_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("accountInfo");
  localStorage.removeItem("userInfo");

  dispatch({ type: ACCOUNT_SIGNOUT });

  // dispatch({ type: USER_SIGNOUT });

  // document.location.href = "/signin";
};

export const listAccounts = () => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LIST_REQUEST });
  try {
    const {
      accountSignin: { accountInfo },
    } = getState();
    const { data } = await accountApi.get("", {
      headers: {
        Authorization: `Bearer ${accountInfo.token}`,
      },
    });

    dispatch({ type: ACCOUNT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACCOUNT_LIST_FAIL, payload: message });
  }
};

export const deleteAccount = (accountId) => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_DELETE_REQUEST, payload: accountId });
  const {
    accountSignin: { accountInfo },
  } = getState();
  try {
    const { data } = await accountApi.delete(`/${accountId}`, {
      headers: { Authorization: `Bearer ${accountInfo.token}` },
    });
    dispatch({ type: ACCOUNT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACCOUNT_DELETE_FAIL, payload: message });
  }
};

export const detailsAccount = (accountId) => async (dispatch) => {
  dispatch({ type: ACCOUNT_DETAILS_REQUEST, payload: accountId });
  try {
    const { data } = await accountApi.get(`/${accountId}`);
    dispatch({ type: ACCOUNT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACCOUNT_DETAILS_FAIL, payload: message });
  }
};

export const updateAccount = (account) => async (dispatch, getState) => {
  console.log("account:", account);
  dispatch({ type: ACCOUNT_UPDATE_PROFILE_REQUEST, payload: account });
  const {
    accountSignin: { accountInfo },
  } = getState();
  try {
    const { data } = await accountApi.patch(`/${account._id}`, account, {
      headers: { Authorization: `Bearer ${accountInfo.token}` },
    });
    dispatch({ type: ACCOUNT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ACCOUNT_UPDATE_FAIL, payload: message });
  }
};
