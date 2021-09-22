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
// import { email } from '@guestyci/foundation/validators';
import createStyles from "@guestyci/foundation/createStyles";

import ErrorBanner from "@guestyci/foundation/legacy/Table/ErrorBanner";

import { useToast } from "@guestyci/foundation/Toast";
import { addPost } from "../../actions/blogActions";
import { POST_ADD_RESET } from "../../constants/blogConstants";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function PostAddScreen(props) {
  // console.log("email");

  const classes = useStyles();
  const { addToast } = useToast();

  const { api, env, config } = Resource.create();

  const { id: blogId } = useParams();
  // console.log("blogId:", blogId);

  /// states

  const [title, setTitle] = useState();

  const [content, setContent] = useState();

  const errorMessage = "There was a problem add the post.";

  const [error, setError] = useState(false);

  ///selectors

  const postAdd = useSelector((state) => state.postAdd);

  const { postInfo, loading, error: errorAdd } = postAdd;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loadingAccount, errorAccount } = userSignin;
  const { _id: userId } = userInfo;
  console.log("userId:", userId);
  /// effects

  useEffect(() => {
    if (postInfo) {
      addToast.success(`post ${title} was add successfully`);
      props.history.push(`/blog/edit/${blogId}`);
      dispatch({ type: POST_ADD_RESET });
    } else if (errorAdd) {
      addToast.danger("error adding the post");

      setError(true);
    }
  }, [props.history, postInfo, errorAdd]);

  //dispatchers

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    // e.preventDefault();

    console.log("onSubmit");
    console.log(title);
    dispatch(addPost(title, content, userId, blogId));

    // setContent("");
    // setLastName("");

    // setEmail("");

    // console.log(password);

    // async function createPost() {
    //   try {
    //     const response = await api.post(`/posts`, {
    //       title,
    //       email,
    //       // password,
    //     }); // will go to `${config.MAILER_URL}/posts`
    //     console.log("response:", response);
    //     // const data = response.data;]

    //     if (response.status === 200) {
    //       addToast.success(`post ${title} was add successfully`);
    //       props.history.push("/");
    //     } else {
    //       console.log("response.status: ", response.status);
    //     }
    //   } catch (error) {
    //     console.log("error:", error);
    //     addToast.danger("error adding the post");

    //     setError(true);

    //     // setTimeout(() => {
    //     //   setError(false);
    //     // }, 3000);
    //   }
    // }
    // createPost();

    // props.history.push("/");
  };

  const closeError = () => {
    setError(false);
  };

  return (
    <Section className={classes.app} justify="center">
      <Col spacing={6} span={6}>
        <TextField variant="h2">
          Add Post:
          {title}
        </TextField>
        <FinalForm
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
            <Form
              title="Create Post"
              onSubmit={handleSubmit}
              provider={FormProvider.Final}
              fieldInstance={Field}
            >
              <FormGroup>
                <FormGroup>
                  <FormField
                    label="Post Title"
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
                    label="Post Content"
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
                      minRows={71}
                      maxRows={9}
                    />
                  </FormField>
                </FormGroup>

                <RaisedButton type="submit">Create Post</RaisedButton>

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
                to="/blog/list"
                // activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                back to blog list
              </NavLink>
            </Form>
          )}
        />
      </Col>
    </Section>
  );
}
