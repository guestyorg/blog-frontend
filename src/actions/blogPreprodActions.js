import Axios from "axios";
import {
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  ////////////
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,

  ////////////////
  BLOG_REGISTER_FAIL,
  BLOG_REGISTER_REQUEST,
  BLOG_REGISTER_SUCCESS,
  BLOG_ADD_FAIL,
  BLOG_ADD_REQUEST,
  BLOG_ADD_SUCCESS,
  POST_ADD_FAIL,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  BLOG_SIGNIN_FAIL,
  BLOG_SIGNIN_REQUEST,
  BLOG_SIGNIN_SUCCESS,
  BLOG_SIGNOUT,
  BLOG_UPDATE_PROFILE_FAIL,
  BLOG_UPDATE_PROFILE_REQUEST,
  BLOG_UPDATE_PROFILE_SUCCESS,
  /////
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,

  ///////
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  ////
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_ADD_PREPROD_FAIL,
  BLOG_ADD_PREPROD_SUCCESS,
  BLOG_ADD_PREPROD_REQUEST,
} from "../constants/blogConstants";
import Resource from "@guestyci/agni";
import { makeDataForTable } from "../utils";
// const { api, env, config } = Resource.create();
const temp = Resource.create("user");
temp.api.defaults.baseURL = `http://localhost:9999/api/blogs-preprod`;

const blogApi = temp.api;
const { api, env, config } = Resource.create();

export const addBlogPreprod = (title) => async (dispatch) => {
  dispatch({
    type: BLOG_ADD_PREPROD_REQUEST,
    payload: { title },
  });
  try {
    async function sendDataWithAccount() {
      const { data: accountData } = await api.get("/accounts/me"); // will go to `${config.MAILER_URL}/users`

      const { name: accountName } = accountData;

      const { data } = await blogApi.post("/create/preprod", {
        title,
        accountName,
      });

      dispatch({
        type: BLOG_ADD_PREPROD_SUCCESS,
        payload: data,
      });
    }
    sendDataWithAccount();
  } catch (error) {
    dispatch({
      type: BLOG_ADD_PREPROD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBlogsPreprod = (view) => async (dispatch) => {
  dispatch({ type: BLOG_LIST_REQUEST });
  console.log("BLOG_LIST_REQUEST");

  try {
    const { data } = await blogApi.post("/preprod/list", { view });

    let arr = makeDataForTable(data);

    console.log("arr: ", arr);
    //  setData(response.data.results)

    dispatch({ type: BLOG_LIST_SUCCESS, payload: arr });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_LIST_FAIL, payload: message });
  }
};

export const deleteBlogPreprod = (blogId) => async (dispatch) => {
  // console.log("blogId:", blogId);
  console.log("deleteBlogPreprod");
  dispatch({ type: BLOG_DELETE_REQUEST, payload: blogId });

  try {
    const { data } = await blogApi.delete(`/${blogId}/preprod`);
    // console.log("data:", data);
    dispatch({ type: BLOG_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_DELETE_FAIL, payload: message });
  }
};

export const detailsPreprodBlog = (blogId) => async (dispatch) => {
  dispatch({ type: BLOG_DETAILS_REQUEST, payload: blogId });

  try {
    const { data } = await blogApi.get(`/${blogId}/preprod`);
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_DETAILS_FAIL, payload: message });
  }
};

export const updateBlogPreprod = (blog) => async (dispatch) => {
  // console.log("blog:", blog.id);
  dispatch({ type: BLOG_UPDATE_REQUEST, payload: blog });
  try {
    const { data } = await blogApi.patch(`/${blog.id}/preprod`, blog);
    dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_UPDATE_FAIL, payload: message });
  }
};

export const addPostPreprod = (title, content, blogId) => async (dispatch) => {
  dispatch({
    type: POST_ADD_REQUEST,
    payload: { title, content, blogId },
  });
  try {
    const { data } = await blogApi.post(`/${blogId}/posts/create/preprod`, {
      title,
      content,
    });

    dispatch({ type: POST_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePostPreprod = (blogId, postId) => async (dispatch) => {
  // console.log("postId:", postId);
  console.log("deletePostPreprod");
  dispatch({ type: POST_DELETE_REQUEST, payload: { blogId, postId } });

  try {
    const { data } = await blogApi.delete(`/${blogId}/posts/${postId}/preprod`);
    // console.log("data:", data);
    dispatch({ type: POST_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_DELETE_FAIL, payload: message });
  }
};

export const detailsPreprodPost = (blogId, postId) => async (dispatch) => {
  dispatch({ type: POST_DETAILS_REQUEST, payload: { blogId, postId } });

  try {
    const { data } = await blogApi.get(`/${blogId}/posts/${postId}/preprod`);
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_DETAILS_FAIL, payload: message });
  }
};

export const updatePostPreprod =
  ({ blogId, postId, title, content }) =>
  async (dispatch) => {
    dispatch({
      type: POST_UPDATE_REQUEST,
      payload: { blogId, postId, title, content },
    });
    try {
      const { data } = await blogApi.patch(
        `/${blogId}/posts/${postId}/preprod`,
        {
          title,
          content,
        }
      );
      dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_UPDATE_FAIL, payload: message });
    }
  };
