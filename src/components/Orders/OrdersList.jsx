import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Container from "react-bootstrap/Container";
import ReceiptIcon from "@material-ui/icons/Receipt";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import DoneIcon from "@material-ui/icons/Done";
import moment from "moment";
import _ from "lodash";

import {
  exportOrder,
  getTableOrders,
} from "../../store/actions/tableOrderActions";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import "./OrdersList.scss";

function OrdersList(props) {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [order, setOrder] = useState({});
  const orders = useSelector(state => state.tableOrder.tableOrders);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTableOrders());
  }, []);

  const getTotalPrice = orders => {
    const totalPrice = _.reduce(
      (orders ? orders : order).meals,
      (total, meal) =>
        total +
        (meal.price -
          meal.price * (meal.discount / 100) +
          (meal.price - meal.price * (meal.discount / 100)) *
            (meal.pdv / 100)) *
          meal.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  const getStatus = tableNumber => {
    const currentTable = orders.filter(order => order.table === tableNumber);
    let status;
    if (!currentTable.length) {
      status = "no orders";
    } else {
      const mealOrdered = currentTable[0].meals.filter(
        meal => meal.status.toLowerCase() === "ordered"
      );
      const mealStarted = currentTable[0].meals.filter(
        meal => meal.status.toLowerCase() === "started"
      );
      const mealDone = currentTable[0].meals.filter(
        meal => meal.status.toLowerCase() === "done"
      );
      if (mealOrdered.length) status = "ordered";
      if (mealStarted.length >= 1) status = "started";
      if (mealDone.length === currentTable[0].meals.length) status = "done";
    }
    return status;
  };

  const exportAllOrders = () => {
    orders.map(orders => {
      if (orders.done) {
        setOrder(orders);
        dispatch(exportOrder(orders.table, props.user, getTotalPrice(orders)));
      }
    });
    setOrder({});
  };

  return (
    <div>
      <div className="container-fluid orders">
        <Header label="Narudžbe" user={props.user} />
        <button
          className="orders__export-all-button card"
          onClick={() => {
            setShow(true);
          }}
        >
          Pošalji na promet
        </button>
        {orders && orders.length ?
          orders.map(order =>
            <div
              className={classNames({
                "card shadow orders__card": true,
                done: getStatus(order.table) === "done",
                started: getStatus(order.table) === "started",
                ordered: getStatus(order.table) === "ordered",
              })}
              key={order.table}
            >
              <div
                className={classNames({
                  orders__card__table: true,
                  done: getStatus(order.table) === "done",
                  started: getStatus(order.table) === "started",
                  ordered: getStatus(order.table) === "ordered",
                })}
              >
                {order.table}
              </div>
              <div className="orders__card__list">
                {order.meals.map(meal => {
                  const mealPrice =
                    meal.price -
                    meal.price * (meal.discount / 100) +
                    (meal.price - meal.price * (meal.discount / 100)) *
                      (meal.pdv / 100);

                  return (
                    <div className="orders__card__list__meal" key={meal.id}>
                      <div className="col orders__card__list__meal__name">
                        {meal.name}
                      </div>
                      <div className="col orders__card__list__meal__quantity">
                        {meal.quantity} kom
                      </div>
                      <div className="col orders__card__list__meal__price">
                        {(meal.quantity * mealPrice).toFixed(2)} HRK
                      </div>
                      <div
                        className={classNames({
                          orders__card__list__meal__status: true,
                          done: meal.status.toLowerCase() === "done",
                          started: meal.status.toLowerCase() === "started",
                          ordered: meal.status.toLowerCase() === "ordered",
                        })}
                      >
                        {meal.status.toLowerCase() === "done" &&
                          "Spremno za posluživanje"}
                        {meal.status.toLowerCase() === "started" &&
                          "U pripremi"}
                        {meal.status.toLowerCase() === "ordered" && "Naručeno"}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="col orders__card__list__receipt"
                onClick={() => {
                  setShowModal(true);
                  setOrder(order);
                }}
              >
                <ReceiptIcon fontSize="large" />
              </div>
            </div>
          )
          :
          <div className="no-orders">TRENUTNO NEMA NARUDŽBI</div>
        }
      </div>
      {showModal && order &&
        <Modal
          className="animated--grow-in delay-2s"
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
            setOrder({});
          }}
        >
          <div className="receipt" id="fadein">
            <div className="receipt__icons" hidden={hidden}>
              <div className="receipt__icons__close-icon">
                <IconButton id="close" onClick={() => setShowModal(false)}>
                  <CloseIcon
                    id="closeIcon"
                    style={{ color: "rgba(244, 243, 239, 1)" }}
                  />
                </IconButton>
              </div>
              <div className="receipt__icons__print-icon">
                <IconButton
                  id="close"
                  onClick={() => {
                    setHidden(true);
                    var prtContent = document.getElementById("fadein");
                    var WinPrint = window.open(
                      "",
                      "",
                      "left=0,top=0,width=300,height=auto,toolbar=0,scrollbars=0,status=0"
                    );
                    WinPrint.document.write(
                      `<style>
                      @media print {
                        @page { margin: 0; }
                        body { margin: 1.6cm; }
                      }
                      .orders-list { padding: 1%; }
                      .orders-list .mealRow .orders-meal-row { padding: 16px 0; }
                      .receipt {
                        width: 40%;
                        border-radius: 6px;
                        background: white;
                        height: fit-content;
                        padding: 2%;
                      }
                        .receipt__icons {
                          display: none;}
                          .receipt__icons__close-icon {
                            background-color: white;
                            border-radius: 50%; }
                          .receipt__icons__print-icon {
                            margin-top: 10px;
                            background-color: white;
                            border-radius: 50%; }
                            .receipt__container__info__date {
                              text-align: center;
                              font-weight: bold;
                              font-size: 18px; }
                            .receipt__container__info__waiter {
                              padding-top: 10px;
                              font-size: 14px; }
                            .receipt__container__info__table {
                              padding-top: 5px;
                              font-size: 14px; }
                            .receipt__container__meal-row .row:not(:first-child) {
                              margin-top: 15px; }
                            .receipt__container__table-header, .receipt__container__meal {
                              max-width: none;
                              text-align: center;
                              padding: 0; }
                         .receipt__container__table-header .row {
                           display: -ms-inline-flexbox;
                           display: inline-flex;
                           flex-wrap: nowrap;
                           font-weight: bold;
                           justify-content: space-evenly;
                           width: 100%;
                           margin-bottom: 2%;
                          }

                         .receipt .receipt__container__meal-row .row:not(:first-child) {
                          margin-top: 15px; }
                          .receipt__container__meal-row .row{display: -ms-flexbox;
                            display: flex;
                            -ms-flex-wrap: wrap;
                            flex-wrap: wrap;}
                            .row .col {-ms-flex-preferred-size: 0;
                              flex-basis: 0;
                              -ms-flex-positive: 1;
                              flex-grow: 1;
                              min-width: 0;
                              max-width: 100%;
                              margin: 0;
                          }
                        .receipt-container__total-price {
                          display: flex;
                          float: right;
                          justify-content: space-between;
                          width: 45%;
                          margin-right: 2%;
                          font-weight: bold;
                          flex-wrap: wrap;
                          .receipt-container__total-price__label {
                            font-size: 20px;
                          }
                          .receipt-container__total-price__value {
                            font-size: 20px;
                            white-space: nowrap;
                          }
                        }
                          .col-2 {-ms-flex: 0 0 16.666667%;
                            flex: 0 0 16.666667%;
                            max-width: 16.666667%;
                          }
                          .col-5 {-ms-flex: 0 0 41.666667%;
                            flex: 0 0 41.666667%;
                            max-width: 41.666667%;
                        }
                      </style>`
                    );
                    WinPrint.document.write(prtContent.innerHTML);
                    WinPrint.document.close();
                    WinPrint.focus();
                    WinPrint.print();
                    setHidden(false);
                    WinPrint.addEventListener("afterprint", () => {
                      WinPrint.close();
                    });
                  }}
                >
                  <PrintIcon
                    id="print-icon"
                    style={{
                      color: " rgba(244, 243, 239, 1)",
                      background: "transparent",
                    }}
                  />
                </IconButton>
              </div>
              {order.done &&
                <div className="receipt__icons__traffic">
                  <IconButton
                    id="done"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Jeste li sigurni da želite zatvoriti i spremiti račun?\nOPREZ: Nećete moći isprintati račun nakon ove akcije"
                        )
                      ) {
                        setShowModal(false);
                        dispatch(
                          exportOrder(order.table, props.user, getTotalPrice())
                        );
                      }
                    }}
                  >
                    <DoneIcon style={{ color: " rgba(244, 243, 239, 1)" }} />
                  </IconButton>
                </div>
              }
            </div>
            <div className="receipt__container">
              <div className="receipt__container__info">
                <div className="receipt__container__info__date">
                  {moment.utc().format("DD.MM.YYYY HH:MM")}
                </div>
                <div className="receipt__container__info__waiter">
                  Djelatnik: {props.user.fname} {props.user.lname}
                </div>
                <div className="receipt__container__info__table">
                  Stol: {order.table}
                </div>
              </div>
              <hr />
              <div className="col-9 receipt__container__table-header">
                <div className="row p-2 mt-2">
                  <div className="col">NAZIV</div>
                  <div className="col">CIJENA</div>
                  <div className="col">KOLIČINA</div>
                  <div className="col">UKUPNO</div>
                </div>
              </div>
              <div className="receipt__container__meal-row">
                <div className="col-9 receipt__container__meal">
                  {order.meals.map(meal => {
                    const mealPrice =
                      meal.price -
                      meal.price * (meal.discount / 100) +
                      (meal.price - meal.price * (meal.discount / 100)) *
                        (meal.pdv / 100);
                    return (
                      <div className="row p-2 mt-2" key={meal.name}>
                        <div className="col">{meal.name}</div>
                        <div className="col">{mealPrice.toFixed(2)} HRK</div>
                        <div className="col">{meal.quantity}</div>
                        <div className="col">
                          {(meal.quantity * mealPrice).toFixed(2)} HRK
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className="receipt-container__total-price">
                <div className="receipt__container__total-price__label">
                  Ukupno:{" "}
                </div>
                <div className="receipt__container__total-price__value">
                  {getTotalPrice()} HRK
                </div>
              </div>
            </div>
          </div>
        </Modal>
      }
      {show &&
        <Modal show={show} closeModal={() => setShow(false)}>
          <div className="export-modal animated--grow-in delay-2s">
            <p className="export-modal__text">
              Želite li poslati sve gotove narudžbe na promet?
            </p>
            <div className="export-modal__button-container">
              <button
                className="export-modal__button-container__confirm-button"
                onClick={() => {
                  exportAllOrders();
                  setShow(false);
                }}
              >
                Da
              </button>
              <button
                className="export-modal__button-container__decline-button"
                onClick={() => setShow(false)}
              >
                Ne
              </button>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
}

export default OrdersList;
