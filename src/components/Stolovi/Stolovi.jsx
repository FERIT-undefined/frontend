import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import { getAllMeals } from "../../store/actions/menuActions";
import MeniList from "../Meni/MeniList";
import "./Stolovi.scss";

function Stolovi(props) {
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState([]);
  const [table, setTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const addMeal = meal => {
    setTotalPrice(totalPrice + meal.price * meal.quantity);
    setMeals([...meals, meal ]);
  };

  const removeMeal = meal => {
    setTotalPrice(totalPrice - meal.price * meal.quantity);
    setMeals(meals.filter(meals => meals.id !== meal.id));
  };

  return (
    <>
      <div className="all-tables">
        <div className="all-tables__order-table black">
          <button
            className="table-button"
            onClick={() => {
              setTable(1);
              setShowModal(true);
            }}
          >
            1
          </button>
        </div>
        <div className="all-tables__order-table green">
          <button
            className="table-button"
            onClick={() => {
              setTable(2);
              setShowModal(true);
            }}
          >
            2
          </button>
        </div>
        <div className="all-tables__order-table red">
          <button
            className="table-button"
            onClick={() => {
              setTable(3);
              setShowModal(true);
            }}
          >
            3
          </button>
        </div>
        <div className="all-tables__order-table yellow">
          <button
            className="table-button"
            onClick={() => {
              setTable(4);
              setShowModal(true);
            }}
          >
            4
          </button>
        </div>
      </div>
      {showModal &&
        <Modal center open={showModal} onClose={() => setShowModal(false)}>
          <div className="container-xl-1" id="fadein">
            <form
              onSubmit={e => {
                e.preventDefault();

                setShowModal(false);
              }}
            >
              <MeniList addMeal={addMeal} removeMeal={removeMeal} tableSelect />
            </form>
          </div>
        </Modal>
      }
    </>
  );
}

export default Stolovi;
