import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
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
import "./OrdersList.scss";

function OrdersList(props) {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [order, setOrder] = useState({});
  const orders = useSelector(state => state.tableOrder.tableOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTableOrders());
  }, []);

  const getTotalPrice = () => {
    const totalPrice = _.reduce(order.meals, (total, meal) => total + (meal.price -
      meal.price * (meal.discount / 100) +
      (meal.price - meal.price * (meal.discount / 100)) *
      (meal.pdv / 100)) * meal.quantity, 0);
    return totalPrice.toFixed(2);
  };
  console.log(order);
  return (
    <div>
      <div className="container-fluid orders-list">
        <div className="row p-2 font-weight-bold mt-3 listInfoRow">
          <div className="col-1">STOL</div>
          <div className="col">
            <div className="row">
              <div className="col">NARUDŽBA</div>
              <div className="col">KOLIČINA</div>
              <div className="col">CIJENA</div>
              <div className="col">STATUS</div>
            </div>
          </div>
          <div className="col-3">ISPIS</div>
        </div>
        {orders.length ?
          orders.map(order =>

            <div className={classNames({
              "row p-2 mt-2 mealRow": true,
              isDone: order.done
            })} key={order.table}>

              <div className="col-1">{console.log(order), order.table}</div>
              <div className="col">
                {order.meals.map(meal => {
                  const mealPrice =
                    meal.price -
                    meal.price * (meal.discount / 100) +
                    (meal.price - meal.price * (meal.discount / 100)) *
                    (meal.pdv / 100);
                  return (
                    <div className="row orders-meal-row" key={meal.name}>
                      <div className="col">{meal.name}</div>
                      <div className="col">{meal.quantity}</div>
                      <div className="col">
                        {(meal.quantity * mealPrice).toFixed(2)} HRK
                      </div>
                      <div
                        className={classNames({
                          col: true,
                          done: meal.status.toLowerCase() === "done",
                          started: meal.status.toLowerCase() === "started",
                          ordered: meal.status.toLowerCase() === "ordered",
                        })}
                      >
                        {meal.status.toLowerCase() === "done" && "Spremno za posluživanje"}
                        {meal.status.toLowerCase() === "started" && "U pripremi"}
                        {meal.status.toLowerCase() === "ordered" && "Naručeno"}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-3">
                <div
                  onClick={() => {
                    setShowModal(true);
                    setOrder(order);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <ReceiptIcon />
                </div>
              </div>
            </div>
          )
          :
          <div className="no-orders">TRENUTNO NEMA NARUDŽBI</div>
        }
      </div>
      {showModal && order &&
        <Modal
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
                  <CloseIcon id="closeIcon" style={{ color: "#219ebc" }} />
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
                        
                          .info__date {
                            text-align: center;
                            font-weight: bold;
                            font-size: 18px;
                          }
                          .info__waiter {
                            padding-top: 10px;
                            font-size: 14px;
                          }
                          .info__table {
                            padding-top: 5px;
                            font-size: 14px;
                          }
                         
                         .receipt-table-header .receipt-meal {
                          max-width: none;
                          text-align: center;
                          padding: 0;
                         }
                         .receipt-table-header .row {
                           display: -ms-inline-flexbox;
                           display: inline-flex;
                           flex-wrap: nowrap;
                           font-weight: bold;
                           justify-content: space-evenly;
                           width: 100%;
                           margin-bottom: 2%;
                          }
                         
                         .receipt .receipt-meal-row .row:not(:first-child) {
                          margin-top: 15px; }
                          .receipt-meal-row .row{display: -ms-flexbox;
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
                        .total-price {
                          display: flex;
                          float: right;
                          justify-content: space-between;
                          width: 45%;
                          margin-right: 2%;
                          font-weight: bold;
                          flex-wrap: wrap; 
                          .total-price__label {
                            font-size: 20px;
                          }
                          .total-price__value {
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
                  <PrintIcon />
                </IconButton>
              </div>
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
                      console.log(order.table);
                      dispatch(exportOrder(order.table, props.user));
                    }
                  }}
                >
                  <DoneIcon />
                </IconButton>
              </div>
            </div>
            <div className="info">
              <div className="info__date">{moment.utc().format("DD.MM.YYYY HH:MM")}</div>
              <div className="info__waiter">
                Djelatnik: {props.user.fname} {props.user.lname}
              </div>
              <div className="info__table">
                Stol: {order.table}
              </div>
            </div>
            <hr />
            <div className="col-9 receipt-table-header">
              <div className="row p-2 mt-2">
                <div className="col">NAZIV</div>
                <div className="col">CIJENA</div>
                <div className="col">KOLIČINA</div>
                <div className="col">UKUPNO</div>
              </div>
            </div>
            <div className="receipt-meal-row">
              <div className="col-9 receipt-meal">
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
                      <div className="col">{(meal.quantity * mealPrice).toFixed(2)} HRK</div>
                    </div>
                  );
                }
                )}
              </div>
            </div>
            <hr />
            <div className="total-price">
              <div className="total-price__label">Ukupno: </div>
              <div className="total-price__value">
                {getTotalPrice()} HRK
              </div>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
}

export default OrdersList;
