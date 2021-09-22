import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const accountSignin = useSelector((state) => state.accountSignin);
  const { accountInfo } = accountSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && accountInfo ? (
          <Component {...props} ></Component>
        ) : (
          <Redirect to="/account/signin" />
        )
      }
    ></Route>
  );
}
