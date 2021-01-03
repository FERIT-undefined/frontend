import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./MenuList.scss";
import {
  addNewMeal,
  getAllMeals,
  removeMeal,
  updateMeal,
} from "../../store/actions/menuActions";
import QuantityPicker from "./QuantityPicker";

function MeniList(props) {
  const [searchResults, setSearchResults] = useState(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    pdv: 0,
    price: 0,
    type: "Appetizer",
    discount: 0,
  });
  const [editedMeal, setEditedMeal] = useState({
    pdv: 0,
    price: 0,
  });
  const [edit, setEdit] = useState(false);

  const allMeals = useSelector(state => state.menu.allMeals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMeals());
  }, []);

  const setNewMealData = (name, value) => {
    if (edit) {
      setEditedMeal({ ...editedMeal, [name]: value });
    } else {
      setNewMeal({ ...newMeal, [name]: value });
    }
  };

  const resetMeals = () => {
    setEditedMeal({
      pdv: 0,
      price: 0,
    });
    setNewMeal({
      pdv: 0,
      price: 0,
      type: "Appetizer",
      discount: 0,
    });
  };

  return (
    <div className="container-fluid mt-4">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => {
          setSearchResults(
            allMeals.filter(
              meal =>
                (meal.name.includes(e.target.value) ||
                  meal.description.includes(e.target.value) ||
                  meal.type.includes(e.target.value)) &&
                meal
            )
          );
        }}
      />
      <div className="row p-2 font-weight-bold mt-3 listInfoRow">
        <div className="col">IME</div>
        <div className="col">OPIS</div>
        <div className="col">CIJENA</div>
        <div className="col">TIP</div>
        {props.user && props.user.role === "Admin" && 
          <>
            <div className="col">POPUST</div>
            <div className="col"></div>
          </>
        }
      </div>
      {(searchResults ? searchResults : allMeals).map(meal => 
        <div className="row p-2 mt-2 mealRow" key={meal.id}>
          <div className="col">{meal.name}</div>
          <div className="col">{meal.description}</div>
          <div className="col">{Number(meal.price).toFixed(2)}</div>
          <div className="col">{meal.type}</div>
          {props.tableSelect && <QuantityPicker min={0} max={4} />}
          {props.user && props.user.role === "Admin" && 
            <>
              <div className="col">{meal.discount}</div>
              <div className="col">
                <div id="action-button-container">
                  <button
                    id="remove-action-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Jeste li sigurni da želite obrisati ovog korisnika?"
                        )
                      ) {
                        dispatch(removeMeal(props.user, meal.id));
                      }
                    }}
                  >
                    REMOVE
                  </button>
                  <button
                    id="update-action-button"
                    onClick={() => {
                      setEditedMeal(meal);
                      setEdit(true);
                      setEditedMeal({
                        ...meal,
                        price: Number(meal.price).toFixed(2),
                      });
                      setShowMealModal(true);
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </>
          }
        </div>
      )}
      {props.user && props.user.role === "Admin" && 
        <button
          type="button"
          className="btn-lg btn-dark mt-3 float-right"
          id="menuAddButton"
          onClick={() => setShowMealModal(true)}
        >
          DODAJ
        </button>
      }
      {showMealModal && 
        <Modal
          center
          open={showMealModal}
          onClose={() => {
            setShowMealModal(false);
            setEdit(false);
            resetMeals();
          }}
        >
          <div className="container-xl-1" id="fadein">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (edit) {
                  dispatch(updateMeal(props.user, editedMeal));
                } else {
                  dispatch(addNewMeal(props.user, newMeal));
                }
                setShowMealModal(false);
                setEdit(false);
                resetMeals();
              }}
            >
              <div className="col">
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="name">Ime</label>
                  </div>
                  <div className="col-9">
                    <input
                      required
                      type="text"
                      name="name"
                      value={
                        edit
                          ? editedMeal.name
                            ? editedMeal.name
                            : ""
                          : newMeal.name
                            ? newMeal.name
                            : ""
                      }
                      onChange={e => {
                        setNewMealData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="description">Opis</label>
                  </div>
                  <div className="col-9">
                    <input
                      required
                      type="text"
                      name="description"
                      value={
                        edit
                          ? editedMeal.description
                            ? editedMeal.description
                            : ""
                          : newMeal.description
                            ? newMeal.description
                            : ""
                      }
                      onChange={e => {
                        setNewMealData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="price">Cijena</label>
                  </div>
                  <div className="col-9">
                    <input
                      required
                      type="number"
                      name="price"
                      step=".01"
                      min="0.01"
                      value={
                        edit
                          ? editedMeal.price
                            ? editedMeal.price
                            : 0
                          : newMeal.price
                            ? newMeal.price
                            : 0
                      }
                      onChange={e => {
                        setNewMealData(e.target.name, e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="type">Tip</label>
                  </div>
                  <div className="col-9">
                    <select
                      required
                      name="type"
                      id="type"
                      defaultValue={
                        edit
                          ? editedMeal.type
                            ? editedMeal.type
                            : ""
                          : newMeal.type
                            ? newMeal.type
                            : ""
                      }
                      onClick={e => {
                        setNewMealData(e.target.name, e.target.value);
                      }}
                    >
                      <option name="role" value="Appetizer">
                        Appetizer
                      </option>
                      <option name="role" value="Main course">
                        Main course
                      </option>
                      <option name="role" value="Desert">
                        Desert
                      </option>
                      <option name="role" value="Grill">
                        Grill
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="pdv">PDV %</label>
                  </div>
                  <div className="col-9">
                    <input
                      required
                      type="number"
                      name="pdv"
                      min="0"
                      max="100"
                      value={
                        edit
                          ? editedMeal.pdv
                            ? editedMeal.pdv
                            : 0
                          : newMeal.pdv
                            ? newMeal.pdv
                            : 0
                      }
                      onChange={e => {
                        setNewMealData(e.target.name, e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="discount">Popust %</label>
                  </div>
                  <div className="col-9">
                    <input
                      required
                      type="number"
                      name="discount"
                      min="0"
                      max="100"
                      value={
                        edit
                          ? editedMeal.discount
                            ? editedMeal.discount
                            : 0
                          : newMeal.discount
                            ? newMeal.discount
                            : 0
                      }
                      onChange={e => {
                        setNewMealData(e.target.name, e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-3">
                    <input type="submit" value="Potvrdi" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      }
    </div>
  );
}

export default MeniList;
