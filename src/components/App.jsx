import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.css";

import SignIn from "./Navigation/SignIn";
import SignUp from "./Navigation/SignUp";
import PrivateRoute from "./PrivateRoute";
import Routes from "./Routes";

function App() {
  const user = useSelector(state => state.users.user);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={() => <SignIn user={user}/>}/>
        <Route path="/register" component={() => <SignUp user={user}/>}/>
        <PrivateRoute component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
