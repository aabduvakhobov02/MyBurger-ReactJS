import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../../store/actions";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    console.log(this.props.history);
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
