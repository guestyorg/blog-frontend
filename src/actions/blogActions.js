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
temp.api.defaults.baseURL = `http://localhost:9999/api/blogs`;

const blogApi = temp.api;
const { api, env, config } = Resource.create();

export const listBlogs = (view) => async (dispatch, getState) => {
  dispatch({ type: BLOG_LIST_REQUEST });
  console.log("BLOG_LIST_REQUEST");
  const {
    accountSignin: { accountInfo },
  } = getState();

  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // console.log('accountInfo:', accountInfo,view)
    const { data } = await blogApi.post("/", { accountInfo,userInfo, view });

    // const temp = Resource.create('tasks');
    // temp.api.defaults.baseURL = `http://localhost:9999/tasks`;
    // export const tasksApi = temp.api;

    // const data = await blogApi.get(); // will go to `${config.MAILER_URL}/blogs`

    // console.log("data:", data);

    // let counter = 1;

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

//////////////////////ideal list blogs///////////////

// export const listBlogs = () => async (dispatch) => {
//   dispatch({ type: BLOG_LIST_REQUEST });
//   console.log("BLOG_LIST_REQUEST");
//   try {
//     const { data } = await blogApi.get();

//     // const temp = Resource.create('tasks');
//     // temp.api.defaults.baseURL = `http://localhost:9999/tasks`;
//     // export const tasksApi = temp.api;

//     // const data = await blogApi.get(); // will go to `${config.MAILER_URL}/blogs`

//     console.log("data:", data);

//     // let counter = 1;
//     const arr = [];

//     let blogs = data;

//     for (let i = 0; i < blogs.length; i++) {
//       // console.log("blogs[i]: ", blogs[i]);

//       const arrBlog = Object.entries(blogs[i]);
//       console.log("arrBlog:", arrBlog);

//       //  title: {
//       //   children: 'John',
//       // },

//       const bigObj = {};

//       for (let j = 0; j < arrBlog.length; j++) {
//         const obj = {};
//         // console.log("arrBlog[j]: ", arrBlog[j]);
//         // console.log("arrBlog[0]: ",arrBlog[j][0]);
//         // console.log("arrBlog[1]: ",arrBlog[j][1]);

//         // console.log("obj:", obj);

//         if (arrBlog[j][0] === "_id") {
//           obj.children = arrBlog[j][1];
//           //         obj= {children: '613e616d7ab4e566768e79d5'}

//           bigObj.id = obj;
//           //    bigObj= {id: {children: '613e616d7ab4e566768e79d5'}}

//           bigObj._id = arrBlog[j][1];

//           //   bigObj= {_id: '613e616d7ab4e566768e79d5'}
//         } else if (
//           arrBlog[j][0] === "createdAt" ||
//           arrBlog[j][0] === "updatedAt"
//         ) {
//           // ['createdAt', '2021-09-13T08:46:49.849Z']

//           obj.children = new Date(arrBlog[j][1]).toLocaleString();
//           // {children: '9/13/2021, 11:46:49 AM'}

//           bigObj[arrBlog[j][0]] = obj;

//           // {createdAt: {children: '9/13/2021, 11:46:49 AM'}}
//         } else if (arrBlog[j][0] === "userId") {
//           // console.log("arrBlog:", arrBlog);

//           // ['userId',  {_id: '613e1486e5218626969838f0', name: 'Karamba'}]
//           obj.children = `${arrBlog[j][1].firstName} ${arrBlog[j][1].lastName}`;

//           // {children: 'Karamba'}

//           let emailObj = {};

//           emailObj.children = arrBlog[j][1].email;

//           bigObj["admin"] = obj;

//           bigObj["email"] = emailObj;

//           let accountObj = {};

//           accountObj.children = arrBlog[j][1].accountId.name;

//           bigObj["account"] = accountObj;

//           //{ accountId: {children: 'Karamba'}}
//         } else {
//           // ['firstName', 'miki']

//           obj.children = arrBlog[j][1];

//           // {children: 'miki'}

//           bigObj[arrBlog[j][0]] = obj;

//           // firstName: {children: 'miki'}
//         }

//         // console.log("bigObj:", bigObj);

//         // arr.push( `${arrBlog[j][0]}: {children: '${arrBlog[j][1]}',}`)
//       }
//       // arr.push({gilad:1,...blogs[i]})
//       arr.push({ ...bigObj });
//       // arr.push({ _id: `${counter}`, ...bigObj });

//       // counter++;
//     }

//     console.log("arr: ", arr);
//     //  setData(response.data.results)

//     dispatch({ type: BLOG_LIST_SUCCESS, payload: arr });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: BLOG_LIST_FAIL, payload: message });
//   }
// };

////////////////////////////////////////

export const add = (title, userId, accountId) => async (dispatch) => {
  dispatch({
    type: BLOG_ADD_REQUEST,
    payload: { title, userId },
  });
  try {
    const { data } = await blogApi.post("/create", {
      title,
      userId,
      accountId,
    });

    dispatch({ type: BLOG_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const register =
  (title, lastName, email, userId) => async (dispatch) => {
    dispatch({
      type: BLOG_REGISTER_REQUEST,
      payload: { title, lastName, email, userId },
    });
    try {
      const { data } = await blogApi.post("/create", {
        title,
        lastName,
        email,
        userId,
      });

      dispatch({ type: BLOG_REGISTER_SUCCESS, payload: data });

      dispatch({ type: BLOG_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("blogInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: BLOG_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email) => async (dispatch) => {
  dispatch({ type: BLOG_SIGNIN_REQUEST, payload: { email } });
  try {
    const { data } = await blogApi.post("/signin", { email });
    dispatch({ type: BLOG_SIGNIN_SUCCESS, payload: data });
    // dispatch(emailBlog(email));

    localStorage.setItem("blogInfo", JSON.stringify(data));
  } catch (error) {
    // console.log("error :", error);
    dispatch({
      type: BLOG_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signoutBlog = () => (dispatch) => {
  localStorage.removeItem("blogInfo");

  dispatch({ type: BLOG_SIGNOUT });
  // document.location.href = "/signin";
};

export const deleteBlog = (blogId) => async (dispatch) => {
  console.log("blogId:", blogId);
  console.log("deleteBlog");
  dispatch({ type: BLOG_DELETE_REQUEST, payload: blogId });

  try {
    const { data } = await blogApi.delete(`/${blogId}`);
    console.log("data:", data);
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

/////////////////
export const deletePost = (blogId, postId) => async (dispatch) => {
  // console.log("postId:", postId);
  console.log("deletePost");
  dispatch({ type: POST_DELETE_REQUEST, payload: { blogId, postId } });

  try {
    const { data } = await blogApi.delete(`/${blogId}/posts/${postId}`);
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

export const detailsBlog = (blogId) => async (dispatch) => {
  dispatch({ type: BLOG_DETAILS_REQUEST, payload: blogId });

  try {
    const { data } = await blogApi.get(`/${blogId}`);
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_DETAILS_FAIL, payload: message });
  }
};

///////
export const detailsPost = (blogId, postId) => async (dispatch) => {
  dispatch({ type: POST_DETAILS_REQUEST, payload: { blogId, postId } });

  try {
    const { data } = await blogApi.get(`/${blogId}/posts/${postId}`);
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_DETAILS_FAIL, payload: message });
  }
};

export const updateBlog = (blog) => async (dispatch) => {
  // console.log("blog:", blog.id);
  dispatch({ type: BLOG_UPDATE_REQUEST, payload: blog });
  try {
    const { data } = await blogApi.patch(`/${blog.id}`, blog);
    dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_UPDATE_FAIL, payload: message });
  }
};

/////////
export const updatePost =
  ({ blogId, postId, title, content }) =>
  async (dispatch) => {
    dispatch({
      type: POST_UPDATE_REQUEST,
      payload: { blogId, postId, title, content },
    });
    try {
      const { data } = await blogApi.patch(`/${blogId}/posts/${postId}`, {
        title,
        content,
      });
      dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_UPDATE_FAIL, payload: message });
    }
  };

/////

/////post actions

////-------get

// router.route('/:id/posts/:postId').get

// await blogApi.get(`/${blog.id}/posts`);

//---------create

// router.route('/:id/posts').post(async (req, res, next)

// await blogApi.post(`/${blog.id}/posts`, post);

export const addPost = (title, content, userId, blogId) => async (dispatch) => {
  dispatch({
    type: POST_ADD_REQUEST,
    payload: { title, content, userId, blogId },
  });
  try {
    const { data } = await blogApi.post(`/${blogId}/posts/create`, {
      title,
      content,
      userId,
      blogId,
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

///--------- update

// router.route('/:id/posts/:postId').patch

// await blogApi.patch(`/${blog.id}/posts/${postId}`, post)

////-----------delete

//router.route('/:id/posts/:postId').delete

// await blogApi.delete(`/${blog.id}/posts/${postId}`)

///////preprod

