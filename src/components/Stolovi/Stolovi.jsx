import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

import Modal from "../Modal/Modal";
import MeniList from "../Meni/MeniList";
import "./Stolovi.scss";
import {
  addOrder,
  getTableOrders,
} from "../../store/actions/tableOrderActions";
import OrdersList from "../Orders/OrdersList";
import Header from "../Header/Header";

function Stolovi(props) {
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState([]);
  const [table, setTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState({});
  const orders = useSelector(state => state.tableOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTableOrders());
  }, []);

  const addMeal = meal => {
    setTotalPrice(totalPrice + meal.price * meal.quantity);
    setMeals([...meals, meal]);
  };

  const removeMeal = meal => {
    setTotalPrice(totalPrice - meal.price * meal.quantity);
    setMeals(meals.filter(meals => meals.id !== meal.id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getStatus = tableNumber => {
    const currentTable = orders.tableOrders.filter(
      order => order.table === tableNumber
    );
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

  const getOrder = tableNumber => {
    const currentTableOrder = orders.tableOrders.filter(
      order => order.table === tableNumber
    );
    if (currentTableOrder.length) {
      setOrder(currentTableOrder);
    } else {
      setOrder({});
    }
  };

  return (
    <div>
      <div className="tables">
        <Header label="Stolovi" user={props.user} />
        <div className="tables__list">
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(1) === "no orders",
              green: getStatus(1) === "done",
              red: getStatus(1) === "ordered",
              yellow: getStatus(1) === "started",
            })}
            onClick={() => {
              setTable(1);
              setShowModal(true);
              getOrder(1);
            }}
          >
            1
            {/* <button
            className="table-button"
            onClick={() => {
              setTable(1);
              setShowModal(true);
              getOrder(1);
            }}
          /> */}
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(2) === "no orders",
              green: getStatus(2) === "done",
              red: getStatus(2) === "ordered",
              yellow: getStatus(2) === "started",
            })}
            onClick={() => {
              setTable(2);
              setShowModal(true);
              getOrder(2);
            }}
          >
            2
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(3) === "no orders",
              green: getStatus(3) === "done",
              red: getStatus(3) === "ordered",
              yellow: getStatus(3) === "started",
            })}
            onClick={() => {
              setTable(3);
              setShowModal(true);
              getOrder(3);
            }}
          >
            3
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(4) === "no orders",
              green: getStatus(4) === "done",
              red: getStatus(4) === "ordered",
              yellow: getStatus(4) === "started",
            })}
            onClick={() => {
              setTable(4);
              setShowModal(true);
              getOrder(4);
            }}
          >
            4
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(5) === "no orders",
              green: getStatus(5) === "done",
              red: getStatus(5) === "ordered",
              yellow: getStatus(5) === "started",
            })}
            onClick={() => {
              setTable(5);
              setShowModal(true);
              getOrder(5);
            }}
          >
            5
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(6) === "no orders",
              green: getStatus(6) === "done",
              red: getStatus(6) === "ordered",
              yellow: getStatus(6) === "started",
            })}
            onClick={() => {
              setTable(6);
              setShowModal(true);
              getOrder(6);
            }}
          >
            6
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(7) === "no orders",
              green: getStatus(7) === "done",
              red: getStatus(7) === "ordered",
              yellow: getStatus(7) === "started",
            })}
            onClick={() => {
              setTable(7);
              setShowModal(true);
              getOrder(7);
            }}
          >
            7
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(8) === "no orders",
              green: getStatus(8) === "done",
              red: getStatus(8) === "ordered",
              yellow: getStatus(8) === "started",
            })}
            onClick={() => {
              setTable(8);
              setShowModal(true);
              getOrder(8);
            }}
          >
            8
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(9) === "no orders",
              green: getStatus(9) === "done",
              red: getStatus(9) === "ordered",
              yellow: getStatus(9) === "started",
            })}
            onClick={() => {
              setTable(9);
              setShowModal(true);
              getOrder(9);
            }}
          >
            9
          </div>
          <div
            className={classNames({
              "tables__list__order-table": true,
              black: getStatus(10) === "no orders",
              green: getStatus(10) === "done",
              red: getStatus(10) === "ordered",
              yellow: getStatus(10) === "started",
            })}
            onClick={() => {
              setTable(10);
              setShowModal(true);
              getOrder(10);
            }}
          >
            10
          </div>
        </div>
      </div>
      {showModal &&
        <Modal
          className="animated--grow-in delay-2s"
          showModal={showModal}
          closeModal={closeModal}
        >
          <div className="orders-modal animated--grow-in delay-2s">
            <div className="orders-modal__close-icon">
              <IconButton id="close" onClick={() => closeModal()}>
                <CloseIcon
                  id="closeIcon"
                  fontSize="large"
                  style={{ color: "rgba(244, 243, 239, 0.7)" }}
                />
              </IconButton>
            </div>
            {order && order.length ?
              order.map(order =>
                <div
                  className={classNames({
                    "card shadow orders-modal__card": true,
                    done: getStatus(order.table) === "done",
                    started: getStatus(order.table) === "started",
                    ordered: getStatus(order.table) === "ordered",
                  })}
                  key={order.table}
                >
                  <div
                    className={classNames({
                      "col-1 orders-modal__card__table": true,
                      done: getStatus(order.table) === "done",
                      started: getStatus(order.table) === "started",
                      ordered: getStatus(order.table) === "ordered",
                    })}
                  >
                    {order.table}
                  </div>
                  <div className="col orders-modal__card__list">
                    {order.meals.map(meal =>
                      <div
                        className="col orders-modal__card__list__meal"
                        key={meal.name}
                      >
                        <div className="col orders-modal__card__list__meal__name">
                          {meal.name}
                        </div>
                        <div className="col orders-modal__card__list__meal__quantity">
                          {meal.quantity} kom
                        </div>
                        <div className="col orders-modal__card__list__meal__price">
                          {(meal.quantity * meal.price).toFixed(2)} HRK
                        </div>
                        <div
                          className={classNames({
                            "col orders-modal__card__list__meal__status": true,
                            done: meal.status.toLowerCase() === "done",
                            started: meal.status.toLowerCase() === "started",
                            ordered: meal.status.toLowerCase() === "ordered",
                          })}
                        >
                          {meal.status.toLowerCase() === "done" &&
                            "Spremno za posluživanje"}
                          {meal.status.toLowerCase() === "started" &&
                            "U pripremi"}
                          {meal.status.toLowerCase() === "ordered" &&
                            "Naručeno"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
              :
              <div className="orders-modal__menu">
                <MeniList
                  addMeal={addMeal}
                  removeMeal={removeMeal}
                  table={table}
                  tableSelect
                  hideHeader={true}
                  fromTables={true}
                />
                <button
                  className="orders-modal__menu__btn"
                  onClick={e => {
                    e.preventDefault();
                    dispatch(addOrder(props.user, table, meals, totalPrice));
                    setShowModal(false);
                  }}
                  disabled={!meals.length}
                  hidden={!meals.length}
                  type="button"
                >
                  Potvrdi
                </button>
              </div>
            }
          </div>
        </Modal>
      }
    </div>
  );
}
export default Stolovi;
