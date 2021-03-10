import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Switch, NavLink, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./pages/layout/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const theme = createMuiTheme({});

const App = () => {
  const userId = useSelector(({ login }) => login.userId);
  console.log(userId);
  const signup = useSelector(({ signup }) => signup.signup);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Switch>
        <PrivateRoute
          path="/"
          exact
          condition={Boolean(userId)}
          userId={userId}
          component={Home}
          redirectTo="/login"
        />
        <PrivateRoute
          path="/login"
          exact
          condition={Boolean(!userId)}
          component={SignIn}
          redirectTo="/"
        />
        <PrivateRoute
          path="/signup"
          exact
          condition={Boolean(!signup) && Boolean(!userId)}
          component={SignUp}
          redirectTo="/"
        />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
