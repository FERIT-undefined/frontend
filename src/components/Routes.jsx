import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

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

const Routes = props => (
  <Switch>
    <Route exact path="/" component={null} />
  </Switch>
);

const mapStateToProps = state => ({
  isAdmin: state.user.currentUser.role === USER_ROLES.ADMIN,
});

export default connect(mapStateToProps)(Routes);
