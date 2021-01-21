import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import TextField from "@material-ui/core/TextField";

import "./QuantityPicker.scss";
export default class QuantityPicker extends Component {
  constructor(props) {
    super(props);

    this.state = { value: this.props.meal.quantity ? this.props.meal.quantity : 0, disableDec: true, disableInc: false };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const plusState = this.state.value + 1;
    if (this.state.value < this.props.max) {
      this.setState({ value: plusState });

      this.setState({ disable: false });
    }
    if (this.state.value === this.props.max - 1) {
      this.setState({ disableInc: true });
    }
    if (this.state.value === this.props.min) {
      this.setState({ disableDec: false });
    }
    this.props.updateQuantity(this.props.index, this.props.meal, plusState);
  }

  decrement() {
    const minusState = this.state.value - 1;
    if (this.state.value > this.props.min) {
      this.setState({ value: minusState });
      this.props.updateQuantity(this.props.index, this.props.meal, minusState);
      if (this.state.value === this.props.min + 1) {
        this.setState({ disableDec: true });
      }
    } else {
      this.setState({ value: this.props.min });
      this.props.updateQuantity(
        this.props.index,
        this.props.meal,
        this.props.min
      );
    }
    if (this.state.value === this.props.max) {
      this.setState({ disableInc: false });
    }
  }

  render() {
    const { disableDec, disableInc } = this.state;
    return (
      <div className="quantity-picker">
        <IconButton
          disabled={this.props.meal.added}
          type="button"
          className={`${disableDec ? "mod-disable " : ""
          }quantity-modifier modifier-left`}
          onClick={this.decrement}
        >
          <IndeterminateCheckBoxRoundedIcon style={{ color: "#219ebc" }} />
        </IconButton>
        <input
          className="quantity-display"
          type="text"
          value={this.state.value}
          readOnly
          disabled
        />
        <IconButton
          disabled={this.props.meal.added}
          type="button"
          className={`${disableInc ? "mod-disable " : ""
          }quantity-modifier modifier-right`}
          onClick={this.increment}
        >
          <AddBoxRoundedIcon style={{ color: "219ebc" }} />
        </IconButton>
      </div>
    );
  }
}
