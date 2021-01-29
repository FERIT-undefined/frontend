import React, { useEffect, useState } from "react";
import {
  getTableOrders,
  changeStatus,
} from "../../store/actions/tableOrderActions";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import "./Kuhinja.scss";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";

const Kuhinja = () => {
  const tableOrders = useSelector(state => state.tableOrder.tableOrders);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [table, setTable] = useState(null);
  const [meal, setMeal] = useState(null);
  useEffect(() => {
    dispatch(getTableOrders());
  }, []);

  const changeMealStatus = () => {
    let status;
    if (meal.status.toLowerCase() === "ordered") status = "started";
    if (meal.status.toLowerCase() === "started") status = "done";
    dispatch(changeStatus(status, table, meal, user));
  };

  const getStatus = tableNumber => {
    const currentTable = tableOrders.filter(
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

  return (
    <div className="container-fluid kitchen">
      <Header label="Narudžbe" user={user} />
      {tableOrders && tableOrders.length ? 
        tableOrders.map((order, i) =>
          !order.done ? 
            <div
              className={classNames({
                "card shadow orders__card": true,
                done: getStatus(order.table) === "done",
                started: getStatus(order.table) === "started",
                ordered: getStatus(order.table) === "ordered",
              })}
              key={order.table}
              onClick={() => {
                setTable(order);
              }}
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
                {order.meals.map(meal => 
                  <div className="orders__card__list__meal" key={meal.name}>
                    <div className="col-3 orders__card__list__meal__name">
                      {meal.name}
                    </div>
                    <div className="col-3 orders__card__list__meal__quantity">
                      {meal.quantity}
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
                      {meal.status.toLowerCase() === "started" && "U pripremi"}
                      {meal.status.toLowerCase() === "ordered" && "Naručeno"}
                    </div>
                    <div className="col kitchen__card__list__button-container">
                      <button
                        className="kitchen__card__list__button-container__change"
                        onClick={() => {
                          setShow(true);
                          setMeal(meal);
                        }}
                      >
                        Promijeni status
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            : null
        )
        : 
        <div className="no-orders">TRENUTNO NEMA NARUDŽBI</div>
      }
      {show && 
        <Modal show={show} closeModal={() => setShow(false)}>
          <div className="kitchen__status-modal animated--grow-in delay-2s">
            <p className="kitchen__status-modal__text">
              Jeste li sigurni da želite promijeniti status?
            </p>
            <div className="kitchen__status-modal__button-container">
              <button
                className="kitchen__status-modal__button-container__confirm-button"
                onClick={() => {
                  setShow(false);
                  changeMealStatus();
                }}
              >
                Da
              </button>
              <button
                className="kitchen__status-modal__button-container__decline-button"
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
};

export default Kuhinja;
