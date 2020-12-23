import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, Switch, Route } from "react-router-dom";

import Zaposlenici from "./Zaposlenici/Zaposlenici";
import NavbarContainer from "./Navigation/NavbarContainer";
import Kuhinja from "./Kuhinja/Kuhinja";

/* import NavigationBarContainer from "./NavigationBarContainer/NavigationBarContainer";
import TrackingPageContainer from "./TrackingPage/TrackingPageContainer/TrackingPageContainer";
import ProjectsContainer from "./Projects/ProjectsContainer/ProjectsContainer";
import ClientsContainer from "./Clients/ClientsContainer/ClientsContainer";
import TeamContainer from "./Team/TeamContainer/TeamContainer";
import Settings from "./Settings/Settings";
import Info from "./Info/Info";
import CalendarContainer from "./Calendar/CalendarContainer/CalendarContainer";
import ReportingContainer from "./Reporting/ReportingContainer/ReportingContainer";
import ErrorContainer from "./Error/ErrorContainer/ErrorContainer";
import USER_ROLES from "../constants/userStrings"; */

function Routes(props) {
  return (
    <Container fluid>
      <Col>
        <NavbarContainer user={props.user} />
        <Switch>
          {props.user.role === "Admin" &&
            <>
              <Route path="/zaposlenici" component={() => <Zaposlenici user={props.user}/>}/>
              <Route path="/meni" component={null} />
              <Route path="/promet" component={null} />
            </>
          }
          {props.user.role === "User" &&
            <>
              <Route exact path="/" component={null} />
              <Route path="/meni" component={null} />
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
