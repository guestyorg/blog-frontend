import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useSelector } from "react-redux";

import createStyles from "@guestyci/foundation/createStyles";
// import Col from '@guestyci/foundation/Layout/Col';
// import Icon from '@guestyci/foundation/Icon';
// import TextField from '@guestyci/foundation/TextField';

import { ReactComponent as Logo } from "@guestyci/foundation/icons/BtnGuestySymbol.svg";
// import TableExample from '../TableExample';

import Section from "@guestyci/foundation/Layout/Section";
import UserTable from "../screens/UserTable";

import UserEditScreen from "../screens/User/UserEditScreen";

import UserAddScreen from "../screens/User/UserAddScreen";


import UserEditPreprodScreen from "../screens/UserPreprod/UserEditPreprodScreen";


import UserAddPreprodScreen from "../screens/UserPreprod/UserAddPreprodScreen";

import AccountAddScreen from "../screens/Account/AccountAddScreen";

import AccountSigninScreen from "../screens/Account/AccountSigninScreen";

import FormControlExample from "../FormControlExample";

import NavBar from "../components/NavBar";
import UserListScreen from "../screens/User/UserListScreen/UserListScreen";

import UserRegisterScreen from "../screens/User/UserRegisterScreen";
import UserSigninScreen from "../screens/User/UserSigninScreen";

import BlogListScreen from "../screens/Blog/BlogListScreen/BlogListScreen";

import BlogEditScreen from "../screens/Blog/BlogEditScreen";

import BlogAddScreen from "../screens/Blog/BlogAddScreen";

import PostAddScreen from "../screens/Post/PostAddScreen";
import PostEditScreen from "../screens/Post/PostEditScreen";

import PostViewScreen from "../screens/Post/PostViewScreen";

import PrivateRoute from "../components/PrivateRoute";
import Home from "../screens/Home";
import UserInfoScreen from "../screens/User/UserInfoScreen";

import AccountInfoScreen from "../screens/Account/AccountInfoScreen";
import BlogPreprodListScreen from "../screens/BlogPreprod/BlogPreprodListScreen/BlogPreprodListScreen";
import BlogPreprodAddScreen from "../screens/BlogPreprod/BlogPreprodAddScreen";
import BlogPreprodEditScreen from "../screens/BlogPreprod/BlogPreprodEditScreen";
import PostPreprodAddScreen from "../screens/PostPreprod/PostPreprodAddScreen";

import PostPreprodViewScreen from "../screens/PostPreprod/PostPreprodViewScreen";
import PostPreprodEditScreen from "../screens/PostPreprod/PostPreprodEditScreen";

// This is a demo scaffolding for guesty create-react-app
// One development starts clear this file and set your own App.js
// REMOVE the styling
// const useStyles = createStyles((theme) => ({
//   app: {
//     background: theme.palette.background.system,
//     minHeight: '100vh',
//   },
//   appLogo: {
//     animation: '$spin infinite 10s linear',
//     pointerEvents: 'none',
//     height: 100,
//     width: 100,
//     margin: 40,
//   },
//   '@keyframes spin': {
//     from: {
//       transform: 'rotate(0deg)',
//     },
//     to: {
//       transform: 'rotate(360deg)',
//     },
//   },
// }));

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "white",
    height: 700,
  },
}));

// This is your App entry point.
// Add the desired configuration and logic here
// REMOVE the comments once development starts

const App = () => {
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  // const accountSignin = useSelector((state) => state.accountSignin);
  // const { accountInfo } = accountSignin;
  const classes = useStyles();
  return (
    <Section className={classes.app}>
      <Router>
        <NavBar />

        <Switch>
          <Route path="/" component={Home} exact />

          <Route
            path="/preprod/table"
            exact
            render={({ history }) => <UserTable history={history} />}
          />

          <Route path="/account/signin" component={AccountSigninScreen} exact />

          <Route path="/account/register" component={AccountAddScreen} exact />

          <Route path="/account/signin" component={AccountSigninScreen} exact />

          <PrivateRoute
            path="/account/info/:id"
            component={AccountInfoScreen}
            exact
          />

          <Route path="/user/register" component={UserRegisterScreen} exact />
          <Route path="/user/signin" component={UserSigninScreen} exact />

          <PrivateRoute path="/user/list" component={UserListScreen} exact />

          <PrivateRoute path="/user/edit/:id" component={UserEditScreen} exact />

          <PrivateRoute path="/user/edit/:id/preprod" component={UserEditPreprodScreen} exact />


          <PrivateRoute path="/user/info/:id" component={UserInfoScreen} exact />

          <PrivateRoute path="/user/add" component={UserAddScreen} exact />

          <PrivateRoute path="/user/add/preprod" component={UserAddPreprodScreen} exact />

          {/* <Route path="/blog/list" component={BlogListScreen} exact /> */}

          <PrivateRoute path="/blog/list" component={BlogListScreen} exact />

          <PrivateRoute
            path="/blog/preprod/list"
            component={BlogPreprodListScreen}
            exact
          />

          {/* <Route
            path="/blog/list"
            exact
            render={({ history }) =>
              userInfo && accountInfo ? (
                <BlogListScreen history={history} />
              ) : (
                <Redirect to="/account/signin" />
              )
            }
          /> */}

          {/* <Route path="/blog/edit/:id" component={BlogEditScreen} exact /> */}

          {/* <Route
            path="/blog/edit/:id"
            exact
            render={({ history }) => <BlogEditScreen history={history} />}
          /> */}

          <PrivateRoute
            path="/blog/edit/:id"
            component={BlogEditScreen}
            exact
          />

          <PrivateRoute
            path="/blog/preprod/edit/:id"
            component={BlogPreprodEditScreen}
            exact
          />

          <PrivateRoute path="/blog/add" component={BlogAddScreen} exact />
          <PrivateRoute
            path="/blog/preprod/add"
            component={BlogPreprodAddScreen}
            exact
          />

          {/* <Route path="/blog/add" component={BlogAddScreen} exact /> */}

          <PrivateRoute
            path="/blog/edit/:id/post/add"
            component={PostAddScreen}
            exact
          />

          <PrivateRoute
            path="/blog/:id/post/add/preprod"
            component={PostPreprodAddScreen}
            exact
          />
          {/* 
          <Route
            path="/blog/edit/:id/post/add"
            exact
            render={({ history }) => <PostAddScreen history={history} />}
          /> */}

          <PrivateRoute
            path="/blog/edit/:blogId/post/:postId"
            component={PostEditScreen}
            exact
          />

          <PrivateRoute
            path="/blog/edit/:blogId/post/:postId/preprod"
            component={PostPreprodEditScreen}
            exact
          />
          {/* <PrivateRoute
            path="/blog/edit/:blogId/post/:postId"
            exact
            render={({ history }) => <PostEditScreen history={history} />}
          /> */}

          {/* <Route path="/post/edit/:id" component={PostEditScreen} exact /> */}

          <PrivateRoute
            path="/:blogId/post/:postId/view"
            component={PostViewScreen}
            exact
          />

          <PrivateRoute
            path="/:blogId/post/:postId/view/preprod"
            component={PostPreprodViewScreen}
            exact
          />
        </Switch>
      </Router>
    </Section>
  );
};

export default App;
