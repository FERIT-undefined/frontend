import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import moment from "moment";
import token from "jsonwebtoken";

import { logOutAndWipeLocalStorage } from "../interceptor";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      alreadyFetched: false,
    };
  }

  componentDidMount() {
    this.renderFunc();
  }

  renderFunc = async () => {
    const { refreshToken } = this.props;
    // eslint-disable-next-line eqeqeq
    if (refreshToken == null || refreshToken === "") {
      this.setState({ response: false });
    } else {
      this.setState({ response: true });
    }
    // TODO: Remove comments if refresh token has expiration date
    /*
    const user = token.decode(refreshToken);
    if (user && user.exp <= moment.utc().unix()) {
      this.setState({ response: false });
      logOutAndWipeLocalStorage();
    }
    */
  };

  render() {
    if (this.state.response) {
      return (
        <Route {...this.props} render={() => <Component {...this.props} />} />
      );
    }
    if (this.state.response === false) {
      return <Redirect to="/login" />;
    }
    return null;
  }
}

const mapStateToProps = state => ({
  refreshToken: state.users.user && state.users.user.refreshToken,
});

export default connect(mapStateToProps)(PrivateRoute);
