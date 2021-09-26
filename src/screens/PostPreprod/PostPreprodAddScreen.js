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
import { addPostPreprod } from "../../actions/blogActions";
import { POST_ADD_RESET } from "../../constants/blogConstants";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function PostPreprodAddScreen(props) {
  // console.log("email");

  const classes = useStyles();
  const { addToast } = useToast();

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

  // const userData= useSelector((state) => state.userData);
  // const { userInfoData, loadingAccount, errorAccount } = userData;
  // const {  userId } = userInfoData;
  // console.log("userId:", userId);
  /// effects

  useEffect(() => {
    if (postInfo) {
      addToast.success(`post ${title} was add successfully`);
      props.history.push(`/blog/preprod/edit/${blogId}`);
      dispatch({ type: POST_ADD_RESET });
    } else if (errorAdd) {
      addToast.danger("error adding the post");
      dispatch({ type: POST_ADD_RESET });

      setError(true);
    }
  }, [props.history, postInfo, errorAdd]);

  //dispatchers

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    // e.preventDefault();

    console.log("onSubmit");
    // console.log(title);
    dispatch(addPostPreprod(title, content, blogId));
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
                to={`/blog/preprod/edit/${blogId}`}
                // activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                back to the blog
              </NavLink>
            </Form>
          )}
        />
      </Col>
    </Section>
  );
}
