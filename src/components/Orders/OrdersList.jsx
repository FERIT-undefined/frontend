import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import ReceiptIcon from "@material-ui/icons/Receipt";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
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
        {orders &&
          orders.map(order => 
            <div className="row p-2 mt-2 mealRow" key={order.table}>
              <div className="col-1">{order.table}</div>
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
                        {meal.status.toLowerCase() === "done" && "Posluzeno"}
                        {meal.status.toLowerCase() === "started" &&
                          "U pripremi"}
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
          )}
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
                        width: 300px;
                        border-radius: 6px;
                        background: white;
                        height: fit-content;
                        padding: 16px; }
                        .receipt__icons {
                          display: none;}
                          .receipt__icons__close-icon {
                            background-color: white;
                            border-radius: 50%; }
                          .receipt__icons__print-icon {
                            margin-top: 10px;
                            background-color: white;
                            border-radius: 50%; }
                        .info {
                          text-align: center; }
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
                        .total_price {
                          text-align: -webkit-right;
                          text-align: end; }
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
                    WinPrint.addEventListener("afterprint", () => {
                      dispatch(exportOrder(order.table, props.user));
                      WinPrint.close();
                      setHidden(false);
                    });
                  }}
                >
                  <PrintIcon />
                </IconButton>
              </div>
            </div>
            <div className="info">
              <div>{moment.utc().format("DD.MM.YYYY")}</div>
              <div>
                {props.user.fname} {props.user.lname}
              </div>
            </div>
            <hr />
            <div className="receipt-meal-row">
              {order.meals.map(meal => 
                <div className="row" key={meal.name}>
                  <div className="col">{meal.name}</div>
                  <div className="col-2">{meal.quantity}</div>
                  <div className="col-5">{meal.quantity * meal.price} Kn</div>
                </div>
              )}
            </div>
            <hr />
            <div className="total_price">{order.total_price} Kn</div>
          </div>
        </Modal>
      }
    </div>
  );
}

export default OrdersList;
