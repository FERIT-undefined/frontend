import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, Switch, Route } from "react-router-dom";

import Zaposlenici from "./Zaposlenici/Zaposlenici";
import NavbarContainer from "./Navigation/NavbarContainer";
import MeniList from "./Meni/MeniList";
import Kuhinja from "./Kuhinja/Kuhinja";

function Routes(props) {
  return (
    <Container fluid>
      <Col>
        <NavbarContainer user={props.user} />
        <Switch>
          {props.user.role === "Admin" &&
            <>
              <Route path="/zaposlenici" component={() => <Zaposlenici user={props.user}/>}/>
              <Route path="/meni" component={() => <MeniList user={props.user}/>} />
              <Route path="/promet" component={null} />
            </>
          }
          {props.user.role === "User" &&
            <>
              <Route exact path="/" component={null} />
              <Route path="/meni" component={() => <MeniList user={props.user}/>} />
              <Route path="/stolovi" component={null} />
            </>
          }
          {props.user.role === "Kitchen" && <Kuhinja/>}
        </Switch>
      </Col>
    </Container>
  );
}

export default Routes;
