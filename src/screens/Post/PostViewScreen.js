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
import {
  deletePost,
  detailsPost,
  detailsBlog,
  updatePost,
} from "../../actions/blogActions";
import {
  POST_DELETE_RESET,
  POST_DETAILS_RESET,
  POST_UPDATE_RESET,
} from "../../constants/blogConstants";

// posts

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
    marginTop: "20px",
  },
}));

export default function PostViewScreen(props) {
  const classes = useStyles();

  // const { api, env, config } = Resource.create();

  const { blogId, postId } = useParams();
  // console.log("id:", id);

  const [title, setTitle] = useState();

  const [email, setEmail] = useState();

  /////
  const [content, setContent] = useState();
  /////

  const [author, setAuthor] = useState();

  const [date, setDate] = useState();

  // useSelector
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error: errorPostDetails, post } = postDetails;
  console.log("post:", post);

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading: loadingBlog, error: errorBlogDetails, blog } = blogDetails;

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) {
      dispatch(detailsPost(blogId, postId));
      dispatch(detailsBlog(blogId));
    } else {
      setTitle(post.title);
      ////

      setAuthor(`${post.userId.firstName} ${post.userId.lastName}`);

      setEmail(post.userId.email);
      setContent(post.content);
      setDate(new Date(post.createdAt).toLocaleString());
    }
  }, [dispatch, props.history, post, blogId, postId]);

  useEffect(() => {
    dispatch({ type: POST_DETAILS_RESET });
  }, []);

  return (
    <>
      <Section className={classes.app} justify="center">
        <Col spacing={6} span={6}>
          <TextField variant="h1">{title}</TextField>
          <TextField variant="h5">{author}</TextField>
          <TextField variant="h5">{email}</TextField>

          <TextField variant="h5">{date}</TextField>

          <TextField variant="h4">{content}</TextField>

          {post && blog && post.userId._id === blog.userId._id && (
            <NavLink
              to={`/blog/edit/${blogId}/post/${postId}`}
              // activeStyle={activeStyle}
              style={{ marginLeft: "20px" }}
              exact
            >
              edit the post
            </NavLink>
          )}


          <NavLink
            to={`/blog/edit/${blogId}`}
            // activeStyle={activeStyle}
            style={{ marginLeft: "20px" }}
            exact
          >
            back to blog
          </NavLink>
        </Col>
      </Section>
      {/* /////////////////////// posts//////////////////  */}
      {/* <PostList postId={id} /> */}
    </>
  );
}
