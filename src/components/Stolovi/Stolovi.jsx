import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
// import { Modal } from "react-responsive-modal";

import Modal from "../Modal/Modal";
import MeniList from "../Meni/MeniList";
import "./Stolovi.scss";
import { addOrder, getTableOrders } from "../../store/actions/tableOrderActions";
import OrdersList from "../Orders/OrdersList";

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
    const currentTable = orders.tableOrders.filter(order => order.table === tableNumber);
    let status;
    console.log(currentTable);
    if (!currentTable.length) {
      status = "no orders";
    } else {
      const mealOrdered = currentTable[0].meals.filter(meal => meal.status.toLowerCase() === "ordered");
      const mealStarted = currentTable[0].meals.filter(meal => meal.status.toLowerCase() === "started");
      const mealDone = currentTable[0].meals.filter(meal => meal.status.toLowerCase() === "done");
      console.log(tableNumber, mealOrdered, mealStarted, mealDone);
      if (mealOrdered.length) status = "ordered";
      if (mealStarted.length >= 1) status = "started";
      if (mealDone.length === currentTable[0].meals.length) status = "done";
    }
    return status;
  };

  const getOrder = tableNumber => {
    const currentTableOrder = orders.tableOrders.filter(order => order.table === tableNumber);
    if (currentTableOrder.length) {
      setOrder(currentTableOrder);
    } else { setOrder({}); }
  };

  return (
    <div className="all-tables">
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(1) === "no orders",
        "green": getStatus(1) === "done",
        "red": getStatus(1) === "ordered",
        "yellow": getStatus(1) === "started",
      })}
      >
        <span>1</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(1);
            setShowModal(true);
            getOrder(1);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(2) === "no orders",
        "green": getStatus(2) === "done",
        "red": getStatus(2) === "ordered",
        "yellow": getStatus(2) === "started",
      })}>
        <span>2</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(2);
            setShowModal(true);
            getOrder(2);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(3) === "no orders",
        "green": getStatus(3) === "done",
        "red": getStatus(3) === "ordered",
        "yellow": getStatus(3) === "started",
      })}>
        <span>3</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(3);
            setShowModal(true);
            getOrder(3);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(4) === "no orders",
        "green": getStatus(4) === "done",
        "red": getStatus(4) === "ordered",
        "yellow": getStatus(4) === "started",
      })}>
        <span>4</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(4);
            setShowModal(true);
            getOrder(4);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(5) === "no orders",
        "green": getStatus(5) === "done",
        "red": getStatus(5) === "ordered",
        "yellow": getStatus(5) === "started",
      })}>
        <span>5</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(5);
            setShowModal(true);
            getOrder(5);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(6) === "no orders",
        "green": getStatus(6) === "done",
        "red": getStatus(6) === "ordered",
        "yellow": getStatus(6) === "started",
      })}>
        <span>6</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(6);
            setShowModal(true);
            getOrder(6);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(7) === "no orders",
        "green": getStatus(7) === "done",
        "red": getStatus(7) === "ordered",
        "yellow": getStatus(7) === "started",
      })}>
        <span>7</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(7);
            setShowModal(true);
            getOrder(7);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(8) === "no orders",
        "green": getStatus(8) === "done",
        "red": getStatus(8) === "ordered",
        "yellow": getStatus(8) === "started",
      })}>
        <span>8</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(8);
            setShowModal(true);
            getOrder(8);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(9) === "no orders",
        "green": getStatus(9) === "done",
        "red": getStatus(9) === "ordered",
        "yellow": getStatus(9) === "started",
      })}>
        <span>9</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(9);
            setShowModal(true);
            getOrder(9);
          }}
        />
      </div>
      <div className={classNames({
        "all-tables__order-table": true,
        "black": getStatus(10) === "no orders",
        "green": getStatus(10) === "done",
        "red": getStatus(10) === "ordered",
        "yellow": getStatus(10) === "started",
      })}>
        <span>10</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(10);
            setShowModal(true);
            getOrder(10);
          }}
        />
      </div>
      {showModal ?
        <Modal showModal={showModal} closeModal={() => closeModal}>
          <div className="table-card container-xl-1" id="fadein">
            <div className="table-card__close-icon">
              <IconButton id="close" onClick={() => closeModal()}>
                <CloseIcon id="closeIcon" style={{ color: "#219ebc" }} />
              </IconButton>
            </div>
            {order.length ?
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
                  </div>
                  {
                    order.map(order =>
                      <div className="row p-2 mt-2 mealRow" key={order.table}>
                        <div className="col-1">{order.table}</div>
                        <div className="col">
                          {order.meals.map(meal =>
                            <div className="row orders-meal-row" key={meal.name}>
                              <div className="col">{meal.name}</div>
                              <div className="col">{meal.quantity}</div>
                              <div className="col">{meal.quantity * meal.price} HRK</div>
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
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              :
              <form
                onSubmit={e => {
                  e.preventDefault();
                  dispatch(addOrder(props.user, table, meals, totalPrice));
                  setShowModal(false);
                }}
              >

                <MeniList
                  addMeal={addMeal}
                  removeMeal={removeMeal}
                  table={table}
                  tableSelect
                />
                <div className="row mt-3">
                  <div className="col-3" id="potvrdi-container">
                    <Button id="potvrdi" type="submit" variant="outlined">
                      Potvrdi
                    </Button>
                    {console.log(order)}
                  </div>
                </div>
              </form>

            }


          </div>
        </Modal>
        : null
      }
    </div >
  );
}
export default Stolovi;
