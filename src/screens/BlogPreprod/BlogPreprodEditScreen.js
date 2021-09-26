import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import Resource from "@guestyci/agni";

import RaisedButton from "@guestyci/foundation/RaisedButton";

import { Form as FinalForm, Field } from "react-final-form";

import Form from "@guestyci/foundation/Form";
import Input from "@guestyci/foundation/Input";
import DateRangePicker from "@guestyci/foundation/DatePicker/DateRangePicker";
import SingleDatePicker from "@guestyci/foundation/DatePicker/SingleDatePicker";
import NumberPicker from "@guestyci/foundation/NumberPicker";
import EmailInput from "@guestyci/foundation/EmailInput";
import Dropdown, { Option } from "@guestyci/foundation/Dropdown";
import TextField from "@guestyci/foundation/TextField";
import TextArea from "@guestyci/foundation/TextArea";
import Col from "@guestyci/foundation/Layout/Col";
import Section from "@guestyci/foundation/Layout/Section";
import DurationPicker from "@guestyci/foundation/DurationPicker";
import TimePicker from "@guestyci/foundation/TimePicker";

import FormField from "@guestyci/foundation/FormField";
import FormGroup from "@guestyci/foundation/FormGroup";
import { FormProvider } from "@guestyci/foundation/enums";
// import { email } from "@guestyci/foundation/validators";
import createStyles from "@guestyci/foundation/createStyles";

import FlatButton from "@guestyci/foundation/FlatButton";
import { Row } from "@guestyci/foundation/Layout";
import { ReactComponent as BtnTrash } from "@guestyci/foundation/icons/BtnTrash.svg";
import Icon from "@guestyci/foundation/Icon";

import { useToast } from "@guestyci/foundation/Toast";
import {
  deleteBlogPreprod,
  detailsPreprodBlog,
  updateBlogPreprod,
} from "../../actions/blogActions";
import {
  BLOG_DELETE_RESET,
  BLOG_DETAILS_RESET,
  BLOG_UPDATE_RESET,
  POST_DELETE_RESET,
} from "../../constants/blogConstants";
import PostListPreprod from "../../components/PostListPreprod";
import { userDataReducer } from "../../reducers/userReducers";

// posts

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
    marginTop: "80px",
  },
}));

export default function BlogPreprodEditScreen(props) {
  // console.log("props:", props);
  const classes = useStyles();

  const { addToast } = useToast();

  // const { api, env, config } = Resource.create();

  const { id } = useParams();
  // console.log("id:", id);

  const [title, setTitle] = useState();

  const [error, setError] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const errorMessage = "There was a problem edit the blog.";

  // useSelector
  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error: errorBlogDetails, blog } = blogDetails;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogUpdate;

  const blogDelete = useSelector((state) => state.blogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingPostDelete,
    error: errorPostDelete,
    success: successPostDelete,
  } = postDelete;

  const userData = useSelector((state) => state.userData);

  const {
    accountData,
    userInfoData,
    loading: loadingUserData,
    error: errorUserData,
  } = userData;

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: BLOG_DELETE_RESET });
      dispatch({ type: BLOG_DETAILS_RESET });
      props.history.push("/blog/preprod/list");
      addToast.success(`the blog ${title} was delete`);
    } else if (errorDelete) {
      addToast.danger("error edit the blog");
    }
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      dispatch({ type: BLOG_DETAILS_RESET });

      // props.history.push("/blog/list");
      addToast.success(`the blog ${title} was edit`);
    } else if (errorUpdate) {
      addToast.danger("error edit the blog");
    }
    if (!blog || successPostDelete) {
      dispatch(detailsPreprodBlog(id));
    } else {
      setTitle(blog.title);
    }

    if (successPostDelete) {
      dispatch({ type: POST_DELETE_RESET });
      // props.history.push("/blog/list");
      addToast.success(`the post  was delete`);
    } else if (errorPostDelete) {
      addToast.danger("error delete the post");
    }
  }, [
    dispatch,
    props.history,
    successUpdate,
    successDelete,
    errorPostDelete,
    successPostDelete,
    blog,
    id,
  ]);

  useEffect(() => {
    dispatch({ type: BLOG_DETAILS_RESET });
  }, []);

  const onSubmit = (e) => {
    // e.preventDefault();
    // dispatch update blog
    dispatch(updateBlogPreprod({ id, title }));
  };

  const handleDelete = async () => {
    console.log("handleDelete");
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlogPreprod(id));
    }
  };

  const closeError = () => {
    setError(false);
  };

  return (
    <>
      <Section className={classes.app} justify="center">
        <Col spacing={6} span={6}>
          {blog && (
            <>
              <h1>Blog Title: {blog.title}</h1>
              <h6>Blog Admin: {blog.admin}</h6>
              <h6> Blog Admin Email: {blog.email}</h6>
            </>
          )}
          {console.log("userInfoData._id:", userInfoData)}
          {blog && blog.userPreprodId === userInfoData.userId && (
            <>
              {editMode ? (
                <>
                  {" "}
                  <TextField
                    onClick={() => setEditMode((prev) => !prev)}
                    variant="h2"
                  >
                    {title}
                  </TextField>
                  <FinalForm
                    onSubmit={onSubmit}
                    initialValues={{}}
                    render={({ handleSubmit }) => (
                      <Form
                        title="Edit Blog"
                        onSubmit={handleSubmit}
                        provider={FormProvider.Final}
                        fieldInstance={Field}
                      >
                        <FormGroup>
                          <FormGroup>
                            <FormField
                              label="Blog Title"
                              name="title"
                              //   info="Drama, Action etc."
                            >
                              <Input
                                name="title"
                                value={title}
                                placeholder={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </FormField>
                          </FormGroup>

                          <RaisedButton type="submit">Edit Blog</RaisedButton>

                          <FlatButton type="error" onClick={handleDelete}>
                            <Row align="center" spacing={2}>
                              <Icon svg={BtnTrash} />
                              <TextField> Delete Blog</TextField>
                            </Row>
                          </FlatButton>

                          {error && (
                            <ErrorBanner
                              show={error}
                              errorMessage={errorMessage}
                              onClick={closeError}
                              actionText="Try again"
                            />
                          )}
                        </FormGroup>
                      </Form>
                    )}
                  />
                </>
              ) : (
                <>
                  <TextField
                    variant="h2"
                    onClick={() => setEditMode((prev) => !prev)}
                  >
                    Click Here to Edit the Blog{" "}
                  </TextField>
                </>
              )}
            </>
          )}{" "}
          <PostListPreprod
            blogData={blog}
            history={props.history}
            blogAdmin={blog && blog.userPreprodId === userInfoData.userId}
          />
        </Col>
      </Section>

      {/* /////////////////////// posts////////////////// */}
    </>
  );
}
