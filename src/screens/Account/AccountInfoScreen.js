import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";

import TextField from "@guestyci/foundation/TextField";
import Col from "@guestyci/foundation/Layout/Col";
import Section from "@guestyci/foundation/Layout/Section";

// import { email } from "@guestyci/foundation/validators";
import createStyles from "@guestyci/foundation/createStyles";

import { useToast } from "@guestyci/foundation/Toast";
import { detailsAccount } from "../../actions/accountActions";
import { ACCOUNT_DETAILS_RESET } from "../../constants/accountConstants";
import StatusIndication from "@guestyci/foundation/StatusIndication";
import Spinner from "@guestyci/foundation/Spinner";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
  },
}));

export default function AccountInfoScreen(props) {
  const classes = useStyles();

  const { id } = useParams();
  // console.log("id:", id);

  // useSelector
  const accountDetails = useSelector((state) => state.accountDetails);
  const { loading, error: errorAccountDetails, account } = accountDetails;
  console.log('account:', account)

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account) {
      dispatch(detailsAccount(id));
    }
  }, [dispatch, props.history, account, id]);

  useEffect(() => {
    dispatch({ type: ACCOUNT_DETAILS_RESET });
  }, []);

  const closeError = () => {
    setError(false);
  };

  return (
    <Section className={classes.app} justify="center">
      {loading && <Spinner size={80} strokeWidth={6} />}

      {errorAccountDetails && (
        <StatusIndication variant="danger" text="error getting the info" />
      )}

      <Col spacing={6} span={6}>
        {account && (
          <>
            <TextField variant="h1">Account Info: {account.name}</TextField>
            {account.name && (
              <TextField variant="h3">Name: {account.name} </TextField>
            )}
            {account.email && (
              <TextField variant="h3">Email: {account.email}</TextField>
            )}
            <TextField variant="h3">
              Creator Name: {account.creatorName}
            </TextField>

            <TextField variant="h3">
              {" "}
              Creator Email: {account.creatorEmail}
            </TextField>

            <TextField variant="h3">
              Created At: {new Date(account.createdAt).toLocaleString()}
            </TextField>
            <TextField variant="h3">
              Updated At: {new Date(account.updatedAt).toLocaleString()}
            </TextField>
          </>
        )}
      </Col>
    </Section>
  );
}
