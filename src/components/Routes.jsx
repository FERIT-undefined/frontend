import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, Switch, Route } from "react-router-dom";

import Zaposlenici from "./Zaposlenici/Zaposlenici";
import NavbarContainer from "./Navigation/NavbarContainer";
import MeniList from "./Meni/MeniList";
import Kuhinja from "./Kuhinja/Kuhinja";
import Stolovi from "./Stolovi/Stolovi";
import OrdersList from "./Orders/OrdersList";
import Traffic from "./Traffic/Traffic";

function Routes(props) {
  return (
    <Container fluid>
      <NavbarContainer user={props.user} />
      <Switch>
        {props.user.role === "Admin" && 
          <>
            <Route
              exact
              path="/"
              component={() => <Zaposlenici user={props.user} />}
            />
            <Route
              path="/jelovnik"
              component={() => <MeniList user={props.user} />}
            />
            <Route path="/promet" component={() => <Traffic />} />
          </>
        }
        {props.user.role === "Konobar" && 
          <>
            <Route
              exact
              path="/"
              component={() => <OrdersList user={props.user} />}
            />
            <Route
              path="/jelovnik"
              component={() => <MeniList user={props.user} />}
            />
            <Route
              path="/stolovi"
              component={() => <Stolovi user={props.user} orders={props.orders}/>}
            />
          </>
        }
        {props.user.role === "Kuhar" && <Kuhinja />}
      </Switch>
    </Container>
  );
}

export default Routes;
