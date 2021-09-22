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
import { deleteBlog, detailsBlog, updateBlog } from "../../actions/blogActions";
import {
  BLOG_DELETE_RESET,
  BLOG_DETAILS_RESET,
  BLOG_UPDATE_RESET,
  POST_DELETE_RESET,
} from "../../constants/blogConstants";
import PostList from "../../components/PostList";

// posts

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
    marginTop: "80px",
  },
}));

export default function BlogEditScreen(props) {
  // console.log("props:", props);
  const classes = useStyles();

  const { addToast } = useToast();

  // const { api, env, config } = Resource.create();

  const { id } = useParams();
  // console.log("id:", id);

  const [title, setTitle] = useState();

  const [error, setError] = useState(false);

  const errorMessage = "There was a problem edit the blog.";

  // useSelector
  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error: errorBlogDetails, blog } = blogDetails;

  const blogAdminId = blog && blog.userId._id;
  console.log("blogAdminId:", blogAdminId);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loadinguser, erroruser } = userSignin;
  const { _id: userId } = userInfo;
  console.log("userId:", userId);

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

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: BLOG_DELETE_RESET });
      dispatch({ type: BLOG_DETAILS_RESET });
      props.history.push("/blog/list");
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
      dispatch(detailsBlog(id));
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
    dispatch(updateBlog({ id, title }));
  };

  const handleDelete = async () => {
    console.log("handleDelete");
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlog(id));
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
              <h6>
                Blog Admin: {blog.userId.firstName} {blog.userId.lastName}
              </h6>
              <h6> Blog Admin Email: {blog.userId.email}</h6>
            </>
          )}
          {blogAdminId === userId && (
            <>
              <TextField variant="h2">
                Edit the Blog:
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
          )}{" "}
          <PostList
            blogData={blog}
            history={props.history}
            blogAdmin={blogAdminId === userId}
          />
        </Col>
      </Section>

      {/* /////////////////////// posts////////////////// */}
    </>
  );
}
