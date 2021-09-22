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
import { register } from "../../actions/accountActions";
import StatusIndication from "@guestyci/foundation/StatusIndication";
import Spinner from "@guestyci/foundation/Spinner";
import { updateUser } from "../../actions/userActions";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function AccountAddScreen(props) {
  console.log("email");

  const classes = useStyles();
  const { addToast } = useToast();

  const { api, env, config } = Resource.create();

  // const { id } = useParams();
  // console.log("id:", id);

  /// states
  const [name, setName] = useState();

  const [email, setEmail] = useState();

  // const [password, setPassword] = useState();

  const errorMessage = "There was a problem add the account.";

  const [error, setError] = useState(false);

  ///selectors

  const accountRegister = useSelector((state) => state.accountRegister);

  const { accountInfo, loading, error: errorRegister } = accountRegister;

  const accountSignin = useSelector((state) => state.accountSignin);
  const {
    accountInfo: accountInfoSignIn,
    loading: loadingSignIn,
    error: errorSignIn,
  } = accountSignin;
  // console.log("accountSignin:", accountSignin);
  let accountId = "";

  if (accountInfoSignIn) {
    accountId = accountInfoSignIn._id;
  }

  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo,
    loading: loadingUserSignIn,
    error: errorUserSignIn,
  } = userSignin;
  console.log("userSignin:", userSignin);

  let userId = "";
  if (userInfo) {
    userId = userInfo._id;
    console.log("userId:", userId);
  }

  /// effects

  useEffect(() => {
    if (accountInfoSignIn) {
      addToast.success(`account ${name} was add successfully`);
      props.history.push("/");
    } else if (errorRegister) {
      addToast.danger("error adding the account");

      setError(true);
    }
  }, [props.history, accountInfo, accountInfoSignIn]);

  //dispatchers

  const dispatch = useDispatch();
  let userInfoFirstName = "";

  let userInfoEmail = "";
  if (userInfo) {
    console.log('userInfo:', userInfo)
    userInfoFirstName = userInfo.firstName;
    console.log('userInfoFirstName:', userInfoFirstName)
    userInfoEmail = userInfo.email;
    console.log('userInfoEmail:', userInfoEmail)
  }

  const onSubmit = (e) => {
    // e.preventDefault();

    console.log("onSubmit");
    // console.log(name);
    // console.log(email);

    dispatch(register(name, email, userInfoFirstName, userInfoEmail, userId));
    // dispatch(updateUser({ id, accountId }));

    // console.log(password);

    // async function createAccount() {
    //   try {
    //     const response = await api.post(`/accounts`, {
    //       name,
    //       email,
    //       // password,
    //     }); // will go to `${config.MAILER_URL}/accounts`
    //     console.log("response:", response);
    //     // const data = response.data;]

    //     if (response.status === 200) {
    //       addToast.success(`account ${name} was add successfully`);
    //       props.history.push("/");
    //     } else {
    //       console.log("response.status: ", response.status);
    //     }
    //   } catch (error) {
    //     console.log("error:", error);
    //     addToast.danger("error adding the account");

    //     setError(true);

    //     // setTimeout(() => {
    //     //   setError(false);
    //     // }, 3000);
    //   }
    // }
    // createAccount();

    // props.history.push("/");
  };

  const closeError = () => {
    setError(false);
  };

  return (
    <Section className={classes.app} justify="center">
      <Col spacing={6} span={6}>
        {loadingUserSignIn && <Spinner size={80} strokeWidth={6} />}
        {loadingSignIn && <Spinner size={80} strokeWidth={6} />}

        {errorUserSignIn && (
          <StatusIndication
            variant="danger"
            text="User must be sign in to create account"
          />
        )}

        {errorSignIn && (
          <StatusIndication
            variant="danger"
            text="error in creating a new account"
          />
        )}

        {userInfo && (
          <>
            {" "}
            <TextField variant="h2">
              Add Account:
              {name}
            </TextField>
            <FinalForm
              onSubmit={onSubmit}
              initialValues={{}}
              render={({ handleSubmit }) => (
                <Form
                  title="Create Account"
                  onSubmit={handleSubmit}
                  provider={FormProvider.Final}
                  fieldInstance={Field}
                >
                  <FormGroup>
                    <FormGroup>
                      <FormField
                        label="Account Name"
                        name="name"
                        //   info="Drama, Action etc."
                      >
                        <Input
                          name="name"
                          value={name}
                          placeholder={name}
                          onChange={(e) => setName(e.target.value)}
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
                    <RaisedButton type="submit">Create Account</RaisedButton>

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
                    to="/account/signin"
                    // activeStyle={activeStyle}
                    style={{ marginLeft: "20px" }}
                    exact
                  >
                    signin exist account
                  </NavLink>
                </Form>
              )}
            />
          </>
        )}
      </Col>
    </Section>
  );
}
