import React from "react";
import { useDispatch, useSelector } from "react-redux";

import createStyles from "@guestyci/foundation/createStyles";

import Section from "@guestyci/foundation/Layout/Section";

import { Tabs, Tab } from "@guestyci/history/NavTabs";
import { NavLink } from "react-router-dom";
import { signout } from "../actions/accountActions";
import { signoutUser, signoutUserPreprod } from "../actions/userActions";

const useStyles = createStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.background.white,
      padding: `0 ${theme.spacer(7)}px`,
      height: 30,
      minHeight: 30,
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      zIndex: 1,
    },
    fade: {
      position: "relative",
      top: -2,
    },
  }),
  { name: "NavBar" }
);

const NavBar = () => {
  // const accountSignin = useSelector((state) => state.accountSignin);
  // const {
  //   accountInfo: accountInfoSignIn,
  //   loading: loadingSignIn,
  //   error: errorSignIn,
  // } = accountSignin;

  const accountSignin = useSelector((state) => state.accountSignin);
  const { accountInfo } = accountSignin;
  // console.log('accountInfo:', accountInfo)

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userData = useSelector((state) => state.userData);
  const {
    userInfoData,
    accountData,
    loading: loadingUserData,
    error: errorUserData,
  } = userData;
  console.log("userData:", userData);

  const dispatch = useDispatch();

  const classes = useStyles();

  const activeStyle = {
    fontWeight: "bold",
    color: "red",
    textDecoration: "none",
  };
  return (
    <>
      {accountData && userInfoData && (
        <Section className={classes.root}>
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>

          {/* {accountData && (
            <NavLink
              style={{ marginLeft: "20px" }}
              to={`/account/info/${accountData._id}`}
              activeStyle={activeStyle}
              exact
            >
              account: {accountData.name}
            </NavLink>
          )} */}

          {accountData && (
            <div style={{ marginLeft: "20px" }} activeStyle={activeStyle}>
              account: {accountData.name}
            </div>
          )}

          {userInfoData && (
            <NavLink
              style={{ marginLeft: "20px" }}
              to={`/user/edit/${userInfoData.userId}/preprod`}
              activeStyle={activeStyle}
              exact
            >
              user:{userInfoData.fullName}
            </NavLink>
          )}
          <div
            onClick={() => dispatch(signoutUserPreprod())}
            activeStyle={activeStyle}
            style={{ marginLeft: "20px" }}
            exact
          >
            sign out user
          </div>

          {userInfoData && (
            <>
              {" "}
              <NavLink
                to="/preprod/table"
                activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                User List
              </NavLink>
              <NavLink
                to="/blog/preprod/list"
                activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                Blog List
              </NavLink>
            </>
          )}
          {/* <NavLink
        to="/blog/list"
        activeStyle={activeStyle}
        style={{ marginLeft: "20px" }}
        exact
      >
        Account Blogs
      </NavLink> */}

          {/* <Tabs
          noAnimate
          noBorderBottom
          exact={false}
        >
            <Tab
              to="/"
              value={{path: '/', label: 'usersTable', src: '/'}}
              key={`/`}
            >

        users Table
            </Tab>
            <Tab
              to={"/user/add"}
              value={{path: '/user/add', label: 'userAdd', src: '/user/add'}}
              key={`/user/add`}
            >
        Add New User
            </Tab>

        </Tabs>
    */}
        </Section>
      )}
      {/* ///////////////////////////////////////////////////////// */}
      {!accountData && !userInfoData && (
        <Section className={classes.root}>
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>

          {accountInfo && (
            <NavLink
              style={{ marginLeft: "20px" }}
              to={`/account/info/${accountInfo._id}`}
              activeStyle={activeStyle}
              exact
            >
              account: {accountInfo.name}
            </NavLink>
          )}

          {accountInfo && (
            <>
              <div
                onClick={() => dispatch(signout())}
                activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                sign out account
              </div>
            </>
          )}

          {userInfo && !accountInfo && (
            <NavLink
              to="/account/signin"
              activeStyle={activeStyle}
              style={{ marginLeft: "20px" }}
              exact
            >
              sign in account
            </NavLink>
          )}

          {userInfo ? (
            <>
              <NavLink
                style={{ marginLeft: "20px" }}
                to={`/user/info/${userInfo._id}`}
                activeStyle={activeStyle}
                exact
              >
                user:{userInfo.firstName}
              </NavLink>
              <div
                onClick={() => dispatch(signoutUser())}
                activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                sign out user
              </div>
            </>
          ) : (
            <NavLink
              to="/user/signin"
              activeStyle={activeStyle}
              style={{ marginLeft: "20px" }}
              exact
            >
              signin user
            </NavLink>
          )}

          {accountInfo && userInfo && (
            <>
              {" "}
              <NavLink
                to="/user/list"
                activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                User List
              </NavLink>
              <NavLink
                to="/blog/list"
                activeStyle={activeStyle}
                style={{ marginLeft: "20px" }}
                exact
              >
                Blog List
              </NavLink>
            </>
          )}
          {/* <NavLink
        to="/blog/list"
        activeStyle={activeStyle}
        style={{ marginLeft: "20px" }}
        exact
      >
        Account Blogs
      </NavLink> */}

          <NavLink
            to="/preprod/table"
            activeStyle={activeStyle}
            style={{ marginLeft: "20px" }}
            exact
          >
            Prepord Table
          </NavLink>

          {/* <Tabs
          noAnimate
          noBorderBottom
          exact={false}
        >
            <Tab
              to="/"
              value={{path: '/', label: 'usersTable', src: '/'}}
              key={`/`}
            >

        users Table
            </Tab>
            <Tab
              to={"/user/add"}
              value={{path: '/user/add', label: 'userAdd', src: '/user/add'}}
              key={`/user/add`}
            >
        Add New User
            </Tab>

        </Tabs>
    */}
        </Section>
      )}
    </>
  );
};

export default NavBar;
