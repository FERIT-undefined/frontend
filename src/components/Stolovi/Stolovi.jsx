import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
// import { Modal } from "react-responsive-modal";

import Modal from "../Modal/Modal";
import { getAllMeals } from "../../store/actions/menuActions";
import MeniList from "../Meni/MeniList";
import "./Stolovi.scss";
import { addOrder } from "../../store/actions/tableOrderActions";

function Stolovi(props) {
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState([]);
  const [table, setTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

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

  return (
    <div className="all-tables">
      <div className="all-tables__order-table black">
        <span>1</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(1);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table green">
        <span>2</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(2);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table red">
        <span>3</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(3);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table yellow">
        <span>4</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(4);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table yellow">
        <span>5</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(5);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table orange">
        <span>6</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(6);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table green">
        <span>7</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(7);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table black">
        <span>8</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(8);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table black">
        <span>9</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(9);
            setShowModal(true);
          }}
        />
      </div>
      <div className="all-tables__order-table red">
        <span>10</span>
        <button
          className="table-button"
          onClick={() => {
            setTable(10);
            setShowModal(true);
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
                </div>
              </div>
            </form>
          </div>
        </Modal>
        : null}
    </div>
  );
}
export default Stolovi;
