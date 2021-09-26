import React, { useEffect, useState } from "react";
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
import { email as emailValid } from "@guestyci/foundation/validators";
import createStyles from "@guestyci/foundation/createStyles";

import FlatButton from "@guestyci/foundation/FlatButton";
import { Row } from "@guestyci/foundation/Layout";
import { ReactComponent as BtnTrash } from "@guestyci/foundation/icons/BtnTrash.svg";
import Icon from "@guestyci/foundation/Icon";

import { useToast } from "@guestyci/foundation/Toast";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function UserEditPreprodScreen(props) {
  const classes = useStyles();

  const { addToast } = useToast();

  const { api, env, config } = Resource.create();

  const { id } = useParams();
  console.log("id:", id);

  const [firstName, setFirstName] = useState();

  const [lastName, setLastName] = useState();

  const [email, setEmail] = useState();

  const [error, setError] = useState(false);

  const errorMessage = "There was a problem edit the user.";

  useEffect(() => {
    console.log("useEffect");
    async function getUser() {
      const response = await api.get(`/users/${id}`); // will go to `${config.MAILER_URL}/users`
      console.log("response:", response.data);
      const { data } = response;

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
    }
    getUser();
  }, []);

  //   const handleChange=(e)=>{
  //       console.log(e.target.value)

  //       setFirstName(e.target.value)
  //   }

  const onSubmit = (e) => {
    // e.preventDefault();

    console.log("onSubmit");
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    async function updateUser() {
      try {
        const response = await api.put(`/users/${id}`, {
          firstName,
          lastName,
          email,
        }); // will go to `${config.MAILER_URL}/users`

        firstName && addToast.success(`the user ${firstName} was edit`);

        console.log("response:", response.data);
        // const data = response.data;

        // props.history.push('/preprod/table');
      } catch (error) {
        console.log("error:", error);
        addToast.danger("error edit the user");
      }
    }
    updateUser();

    // props.history.push("/");
  };

  const handleDelete = async () => {
    console.log("handleDelete");
    if (window.confirm("Are you sure?")) {
      try {
        const response = await api.delete(`/users/${id}`); // will go to `${config.MAILER_URL}/users`
        console.log("response:", response);
        // const data = response.data;
        addToast.success("user was delete");

        props.history.push("/preprod/table");
      } catch (error) {
        console.log("error:", error);
        addToast.danger("error deleting the user");
      }
    }
  };

  const closeError = () => {
    setError(false);
  };

  return (
    <Section className={classes.app} justify="center">
      <Col spacing={6} span={6}>
        <TextField variant="h2">
          Edit the User:
          {firstName}
        </TextField>
        <FinalForm
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
            <Form
              title="Edit User"
              onSubmit={handleSubmit}
              provider={FormProvider.Final}
              fieldInstance={Field}
            >
              <FormGroup>
                <FormGroup>
                  <FormField
                    label="First Name"
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
                  <FormField label="Last Name" name="lastName">
                    <Input
                      name="lastName"
                      value={lastName}
                      placeholder={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormField>

                  <FormField label="Email" name="email">
                    <Input
                      name="email"
                      value={email}
                      placeholder={email}
                      // validate={[emailValid]}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormField>
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
                <RaisedButton type="submit">Edit User</RaisedButton>

                <FlatButton type="error" onClick={handleDelete}>
                  <Row align="center" spacing={2}>
                    <Icon svg={BtnTrash} />
                    <TextField> Delete</TextField>
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
      </Col>
    </Section>
  );
}
