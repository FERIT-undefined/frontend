import React, { Component } from "react";

import "./Modal.scss";
class Modal extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;