import React, { Component } from "react";

import "./Modal.scss";
class Modal extends Component {
  render() {
    return (
      <>
        <div className="overlay" onClick={this.props.closeModal} />
        <div className="content  animated--fade-in">{this.props.children}</div>
      </>
    );
  }
}

export default Modal;
