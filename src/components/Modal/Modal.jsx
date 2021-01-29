import React, { Component } from "react";

import "./Modal.scss";
class Modal extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="content  animated--fade-in">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
