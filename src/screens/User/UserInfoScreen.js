import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";

import TextField from "@guestyci/foundation/TextField";
import Col from "@guestyci/foundation/Layout/Col";
import Section from "@guestyci/foundation/Layout/Section";

// import { email } from "@guestyci/foundation/validators";
import createStyles from "@guestyci/foundation/createStyles";

import { useToast } from "@guestyci/foundation/Toast";
import { deleteUser, detailsUser, updateUser } from "../../actions/userActions";
import {
  USER_DELETE_RESET,
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from "../../constants/userConstants";
import StatusIndication from "@guestyci/foundation/StatusIndication";
import Spinner from "@guestyci/foundation/Spinner";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function UserInfoScreen(props) {
  const classes = useStyles();

  const { id } = useParams();
  // console.log("id:", id);

  // useSelector
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error: errorUserDetails, user } = userDetails;

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(id));
    }
  }, [dispatch, props.history, user, id]);

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
  }, []);

  const closeError = () => {
    setError(false);
  };

  return (
    <Section className={classes.app} justify="center">
      {loading && <Spinner size={80} strokeWidth={6} />}

      {errorUserDetails && (
        <StatusIndication variant="danger" text="error getting the info" />
      )}

      <Col spacing={6} span={6}>
        {user && (
          <>
            {" "}
            {console.log("user:", user)}
            <TextField variant="h1">
              User Info: {user.firstName} {user.lastName}
            </TextField>
            <TextField variant="h3">First Name: {user.firstName}</TextField>
            <TextField variant="h3">Last Name: {user.lastName}</TextField>
            <TextField variant="h3">Email: {user.email}</TextField>
            {user.accountId && (
              <TextField variant="h3">Account: {user.accountId.name}</TextField>
            )}
            <TextField variant="h3">
              Created At: {new Date(user.createdAt).toLocaleString()}
            </TextField>
            <TextField variant="h3">
              Updated At: {new Date(user.updatedAt).toLocaleString()}
            </TextField>
            {true && (
              <NavLink
                to={`/user/edit/${id}`}
                // activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                edit the user
              </NavLink>
            )}
          </>
        )}
      </Col>
    </Section>
  );
}
