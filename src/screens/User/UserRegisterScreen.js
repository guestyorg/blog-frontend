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
import { register } from "../../actions/userActions";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function UserRegisterScreen(props) {
  // console.log("email");

  const classes = useStyles();
  const { addToast } = useToast();

  const { api, env, config } = Resource.create();

  // const { id } = useParams();
  // console.log("id:", id);

  /// states
  const [firstName, setFirstName] = useState();

  const [lastName, setLastName] = useState();

  const [email, setEmail] = useState();

  // const [password, setPassword] = useState();

  const errorMessage = "There was a problem add the user.";

  const [error, setError] = useState(false);

  ///selectors

  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error: errorRegister } = userRegister;

  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo: userInfoSignIn,
    loading: loadingSignIn,
    error: errorSignIn,
  } = userSignin;
  console.log("userSignin:", userSignin);

  const accountSignin = useSelector((state) => state.accountSignin);
  const { accountInfo, loadingAccount, errorAccount } = accountSignin;
  console.log("accountSignin:", accountSignin);
  let accountId ;
  if (accountSignin && accountInfo) {
    accountId = accountInfo._id;
  }
  console.log("accountId:", accountId);

  // const { _id:accountId } = accountInfo;
  // console.log('accountId:', accountId)
  /// effects

  useEffect(() => {
    if (userInfoSignIn) {
      addToast.success(`user ${firstName} was add successfully`);
      props.history.push("/user/list");
    } else if (errorRegister) {
      addToast.danger("error adding the user");

      setError(true);
    }
  }, [props.history, userInfo, userInfoSignIn, errorRegister]);

  //dispatchers

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    // e.preventDefault();

    console.log("onSubmit");
    console.log(firstName);
    console.log(lastName);

    console.log(email);

    dispatch(register(firstName, lastName, email, accountId));

    // setFirstName("");
    // setLastName("");

    // setEmail("");

    // console.log(password);

    // async function createUser() {
    //   try {
    //     const response = await api.post(`/users`, {
    //       firstName,
    //       email,
    //       // password,
    //     }); // will go to `${config.MAILER_URL}/users`
    //     console.log("response:", response);
    //     // const data = response.data;]

    //     if (response.status === 200) {
    //       addToast.success(`user ${firstName} was add successfully`);
    //       props.history.push("/");
    //     } else {
    //       console.log("response.status: ", response.status);
    //     }
    //   } catch (error) {
    //     console.log("error:", error);
    //     addToast.danger("error adding the user");

    //     setError(true);

    //     // setTimeout(() => {
    //     //   setError(false);
    //     // }, 3000);
    //   }
    // }
    // createUser();

    // props.history.push("/");
  };

  const closeError = () => {
    setError(false);
  };

  return (
    <Section classfirstName={classes.app} justify="center">
      <Col spacing={6} span={6}>
        <TextField variant="h2">
          Add User:
          {firstName}
        </TextField>
        <FinalForm
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
            <Form
              title="Create User"
              onSubmit={handleSubmit}
              provider={FormProvider.Final}
              fieldInstance={Field}
            >
              <FormGroup>
                <FormGroup>
                  <FormField
                    label="User First Name"
                    name="firstName"
                    //   info="Drama, Action etc."
                  >
                    <Input
                      name="firstName"
                      value={firstName}
                      placeholder={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormField>
                  <FormField
                    label="User Last Name"
                    name="lastName"
                    //   info="Drama, Action etc."
                  >
                    <Input
                      name="lastName"
                      value={lastName}
                      placeholder={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormField>
                  <FormField label="Email" name="email">
                    <EmailInput
                      name="email"
                      value={email}
                      placeholder={email}
                      // validate={[email]}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormField>

                  {/* 
                  <FormField label="Password" name="password">
                    <Input
                      name="password"
                      type={password}
                      value={password}
                      placeholder={password}
                      validate={[password]}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormField> */}
                </FormGroup>
                {/* <FormField label="Country" info="e.g (US)" name="country">
                    <Input />
                  </FormField>
                  <FormField label="Runtime" name="runtime">
                    <Input />
                  </FormField>
                  <FormField label="Contact" name="contact">
                    <Input />
                  </FormField>
                  <FormField label="Biography" name="bigraphy" required>
                    <TextArea />
                  </FormField>
                  <FormField label="Age" name="age" required>
                    <NumberPicker />
                  </FormField> */}
                {/* <FormField
                  label="Email"
                  name="email"
                  validate={[email]}
                  required
                >
                  <EmailInput
                    name="email"
                    value={email}
                    placeholder={email}
                  />
                </FormField> */}
                {/* <FormField label="Gender" name="gender" required>
                    <Dropdown>
                      {['Male', 'Female'].map((gender) => (
                        <Option value={gender} key={gender}>
                          {gender}
                        </Option>
                      ))}
                    </Dropdown>
                  </FormField>
                  <FormField
                    label="Single Date Picker"
                    name="singleDatePicker"
                    required
                  >
                    <SingleDatePicker />
                  </FormField>
                  <FormField
                    label="Date Range Picker"
                    name="dateRangePicker"
                    required
                  >
                    <DateRangePicker />
                  </FormField>
                  <FormField label="Time picker" name="time" required>
                    <TimePicker />
                  </FormField>
                  <FormField label="Duration picker" name="duration" required>
                    <DurationPicker />
                  </FormField> */}
                <RaisedButton type="submit">Create User</RaisedButton>

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
                to="/user/signin"
                // activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                signin exist user
              </NavLink>
            </Form>
          )}
        />
      </Col>
    </Section>
  );
}
