import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.css";

import SignIn from "./Navigation/SignIn";
import SignUp from "./Navigation/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <SignIn/>
        </Route>
        <Route path="/register">
          <SignUp/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
