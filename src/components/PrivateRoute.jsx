import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import moment from "moment";
import token from "jsonwebtoken";

import { logOutAndWipeLocalStorage, saveNewRefreshToken, refreshAuthentication } from "../interceptor";

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
    const { refreshToken, expiredToken } = this.props;
    if (refreshToken == null || refreshToken === "") {
      this.setState({ response: false });
    }
    if (expiredToken > moment.utc().unix()) {
      this.setState({ response: true, alreadyFetched: false });
    } else if (!this.state.alreadyFetched && refreshToken != null && refreshToken !== "") {
      const response = await refreshAuthentication(refreshToken);
      if (!response.data || response.status !== 200) {
        logOutAndWipeLocalStorage();
      }
      const newToken = response.data && response.data.accessToken;
      const currentUser = token.decode(newToken);
      if (currentUser == null || currentUser.exp <= moment.utc().unix()) {
        logOutAndWipeLocalStorage();
      }
      saveNewRefreshToken(newToken, refreshToken);
      this.setState({
        alreadyFetched: true,
      }, () => this.renderFunc());
    }
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
  expiredToken: state.tokenStore.currentUser && state.tokenStore.currentUser.exp,
  refreshToken: state.tokenStore.refreshToken,
});

export default connect(mapStateToProps)(PrivateRoute);
