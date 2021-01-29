import React, { Component } from "react";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import TextField from "@material-ui/core/TextField";

import "./QuantityPicker.scss";
export default class QuantityPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.meal.quantity ? this.props.meal.quantity : 0,
      disableDec: true,
      disableInc: false,
    };
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
        <button
          className={classNames({
            "quantity-picker__increment":true,
            disabled: this.props.meal.added || disableInc
          })}
          disabled={this.props.meal.added || disableInc}
          onClick={this.increment}
        >
          +
        </button>
        <input
          className="quantity-picker__display"
          type="text"
          value={this.state.value}
          readOnly
          disabled
        />
        <button
          className={classNames({
            "quantity-picker__decrement":true,
            disabled: this.props.meal.added || disableDec
          })}
          disabled={this.props.meal.added || disableDec}
          onClick={this.decrement}
        >
          -
        </button>
      </div>
    );
  }
}
