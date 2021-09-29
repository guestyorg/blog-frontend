import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";

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
import { deletePostPreprod, detailsPreprodPost, updatePostPreprod } from "../../actions/blogPreprodActions";
import {
  POST_DELETE_RESET,
  POST_DETAILS_RESET,
  POST_UPDATE_RESET,
} from "../../constants/blogConstants";

// posts

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function PostPreprodEditScreen(props) {
  const classes = useStyles();

  const { addToast } = useToast();

  // const { api, env, config } = Resource.create();

  const { blogId, postId } = useParams();
  // console.log("id:", id);

  const [title, setTitle] = useState();

  /////
  const [content, setContent] = useState();
  /////
  const [error, setError] = useState(false);

  const errorMessage = "There was a problem edit the post.";

  // useSelector
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error: errorPostDetails, post } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: POST_DELETE_RESET });
      dispatch({ type: POST_DETAILS_RESET });
      props.history.push(`/blog/preprod/edit/${blogId}`);
      addToast.success(`the post ${title} was delete`);
    } else if (errorDelete) {
      addToast.danger("error delete the post");
    }
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      dispatch({ type: POST_DETAILS_RESET });

      // props.history.push("/post/list");
      addToast.success(`the post ${title} was edit`);
    } else if (errorUpdate) {
      addToast.danger("error edit the post");
    }
    if (!post) {
      dispatch(detailsPreprodPost(blogId, postId));
    } else {
      setTitle(post.title);
      ////
      setContent(post.content);
    }
  }, [
    dispatch,
    props.history,
    successUpdate,
    successDelete,
    post,
    blogId,
    postId,
  ]);

  useEffect(() => {
    dispatch({ type: POST_DETAILS_RESET });
  }, []);

  const onSubmit = (e) => {
    // e.preventDefault();
    // dispatch update post
    dispatch(updatePostPreprod({ blogId, postId, title, content }));
  };

  const handleDelete = async () => {
    console.log("handleDelete");
    if (window.confirm("Are you sure?")) {
      dispatch(deletePostPreprod(blogId, postId));
    }
  };

  const closeError = () => {
    setError(false);
  };

  return (
    <>
      <Section className={classes.app} justify="center">
        <Col spacing={6} span={6}>
          <TextField variant="h2">
            Edit the Post:
            {title}
          </TextField>
          <FinalForm
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit }) => (
              <Form
                title="Edit Post"
                onSubmit={handleSubmit}
                provider={FormProvider.Final}
                fieldInstance={Field}
              >
                <FormGroup>
                  <FormGroup>
                    <FormField
                      label="title"
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

                    <FormField
                      label="content"
                      name="content"
                      //   info="Drama, Action etc."
                    >
                      {/* <Input
                        name="content"
                        value={content}
                        placeholder={content}
                        onChange={(e) => setContent(e.target.value)}
                      /> */}
                      <TextArea
                        name="content"
                        placeholder={content}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        minRows={100}
                        // maxRows={15}
                      />
                    </FormField>

                    {/* <TextField>content</TextField> */}
                  </FormGroup>

                  <RaisedButton type="submit">Edit Post</RaisedButton>

                  <FlatButton type="error" onClick={handleDelete}>
                    <Row align="center" spacing={2}>
                      <Icon svg={BtnTrash} />
                      <TextField> Delete Post</TextField>
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

                <NavLink
                  to={`/${blogId}/post/${postId}/view/preprod`}
                  // activeStyle={activeStyle}
                  style={{ marginLeft: "20px" }}
                  exact
                >
                  view post
                </NavLink>

                <NavLink
                  to={`/blog/preprod/edit/${blogId}`}
                  // activeStyle={activeStyle}
                  style={{ marginLeft: "20px" }}
                  exact
                >
                  back to blog
                </NavLink>
              </Form>
            )}
          />
        </Col>
      </Section>
      {/* /////////////////////// posts//////////////////  */}
      {/* <PostList postId={id} /> */}
    </>
  );
}
