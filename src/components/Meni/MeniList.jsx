import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import classNames from "classnames";

import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import "./MenuList.scss";
import {
  addNewMeal,
  getAllMeals,
  removeMeal,
  updateMeal,
} from "../../store/actions/menuActions";
import QuantityPicker from "./QuantityPicker";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
}));

function MeniList(props) {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [searching, setSearching] = useState(false);
  const [newMeal, setNewMeal] = useState({
    pdv: 0,
    price: 0,
    type: "Predjelo",
    discount: 0,
  });
  const [editedMeal, setEditedMeal] = useState({
    pdv: 0,
    price: 0,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [meal, setMeal] = useState();

  const dispatch = useDispatch();
  const meals = useSelector(state => state.menu.allMeals);

  useEffect(() => {
    dispatch(getAllMeals());
  }, []);

  useEffect(() => {
    setAllMeals(meals);
  }, [meals]);

  useEffect(() => {
    setAllMeals(
      meals.filter(meal => {
        meal.quantity = 0;
        meal.added = false;
        return meal;
      })
    );
  }, [props.tableSelect]);

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
      type: "Predjelo",
      discount: 0,
    });
  };

  const updateQuantity = (index, meal, quantity) => {
    let newArr = [...allMeals];
    if (searching) {
      let newArr2 = [...searchResults];
      newArr2[index] = { ...meal, quantity: quantity };
      let index2 = newArr.findIndex(meals => meals.id === meal.id);
      newArr[index2] = { ...meal, quantity: quantity };
      setSearchResults(newArr2);
      setAllMeals(newArr);
    } else {
      newArr[index] = { ...meal, quantity: quantity };
      setAllMeals(newArr);
    }
  };

  const updateAdded = (index, meal, added) => {
    let newArr = [...allMeals];
    if (searching) {
      let newArr2 = [...searchResults];
      newArr2[index] = { ...meal, added: added };
      let index2 = newArr.findIndex(meals => meals.id === meal.id);
      newArr[index2] = { ...meal, added: added };
      setSearchResults(newArr2);
      setAllMeals(newArr);
    } else {
      newArr[index] = { ...meal, added: added };
      setAllMeals(newArr);
    }
  };

  const closeModal = () => {
    setShowMealModal(false);
    setEdit(false);
    resetMeals();
  };
  const mealTypes = [
    { value: "Predjelo" },
    { value: "Glavno jelo" },
    { value: "Desert" },
    { value: "Grill" },
  ];

  return (
    <div
      className={classNames({
        "container-fluid menu": !props.fromTables,
        "tables__orders-modal__menu__list": props.fromTables,
      })}
    >
      {!props.hideHeader && <Header label="Menu" user={props.user} />}
      <div
        className={classNames({
          "menu__topbar": !props.fromTables,
          "tables__orders-modal__menu__list__topbar": props.fromTables,
        })}
      >
        <input
          className={classNames({
            "form-control menu__topbar__search": !props.fromTables,
            "tables__orders-modal__menu__list__topbar__search": props.fromTables,
            admin: props.user && props.user.role.toLowerCase() === "admin",
          })}
          type="text"
          placeholder="Pretraži..."
          aria-label="Pretraži"
          onChange={e => {
            if (e.target.value === "") {
              setSearching(false);
              setSearchResults(null);
            } else {
              setSearching(true);
              setSearchResults(
                allMeals.filter(
                  meal =>
                    (meal.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) ||
                      meal.description
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      meal.type
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())) &&
                    meal
                )
              );
            }
          }}
        />
        {props.user && props.user.role === "Admin" && 
          <button
            type="button"
            className="menu__topbar__add"
            onClick={() => setShowMealModal(true)}
          >
            DODAJ NOVO JELO
          </button>
        }
      </div>
      {(searchResults ? searchResults : allMeals) &&
      (searchResults ? searchResults : allMeals).length ? 
        (searchResults ? searchResults : allMeals).map((meal, index) => 
          <div
            className={classNames({
              "card shadow tables__orders-modal__menu__list__card":
                props.fromTables,
              "card shadow menu__card": !props.fromTables,
            })}
            key={meal.id}
          >
            <div className="col-2 menu__card__name">{meal.name}</div>
            <div className="col-3 menu__card__description">
              {meal.description}
            </div>
            <div className="col menu__card__type">{meal.type}</div>
            <div className="col menu__card__price">
              {Number(meal.price).toFixed(2)} HRK
            </div>
            <div className="col menu__card__pdv">{meal.pdv}%</div>
            <div
              className="col menu__card__discount"
              style={{ color: meal.discount ? "#81b29a" : "" }}
            >
              {meal.discount}%
            </div>
            <div className="col menu__card__total-price">
              {(
                meal.price -
                meal.price * (meal.discount / 100) +
                (meal.price - meal.price * (meal.discount / 100)) *
                  (meal.pdv / 100)
              ).toFixed(2)}{" "}
              HRK
            </div>
            {props.tableSelect && 
              <div className="col-1  tables__orders-modal__menu__list__card__picker" id="mealRow-picker">
                <QuantityPicker
                  min={0}
                  max={10}
                  meal={meal}
                  index={index}
                  updateQuantity={updateQuantity}
                  defaultValue={0}
                />
                <button
                  type="button"
                  className="tables__orders-modal__menu__list__card__picker__addToOrder"
                  style={{
                    background: "none",
                    border: "none",
                    minWidth: "32px",
                    color: "black",
                    visibility: !meal.quantity ? "hidden" : "visible",
                  }}
                  onClick={() => {
                    if (!meal.added) {
                      props.addMeal({
                        ...meal,
                        status: "Ordered",
                      });
                      updateAdded(index, meal, true);
                    } else {
                      props.removeMeal({
                        ...meal,
                      });
                      updateAdded(index, meal, false);
                    }
                  }}
                >
                  {!meal.added ? 
                    <CheckCircleOutlineIcon style={{ color: " #ddbea9", fontSize:"30px" }} />
                    : 
                    <HighlightOffIcon style={{color: " #ddbea9", fontSize:"30px" }} />
                  }
                </button>
              </div>
            }
            {props.user && props.user.role === "Admin" && 
              <div className="col-1 menu__card__button-container">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setMeal(meal);
                    setShowDeleteModal(true);
                  }}
                >
                  <DeleteIcon style={{ color: "#3d405b" }} />
                </IconButton>
                <IconButton
                  aria-label="edit"
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
                  <EditTwoToneIcon style={{ color: "#3d405b" }} />
                </IconButton>
              </div>
            }
          </div>
        )
        : 
        <div className="no-meals">TRENUTNO NEMA JELA NA MENU-u</div>
      }
      {showMealModal && editedMeal ? 
        <Modal showModal={showMealModal} closeModal={() => closeModal}>
          <div className="menu__edit-modal animated--grow-in" id="fadeup">
            <form
              className="menu__edit-modal__form"
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
              <div className="menu__edit-modal__form__name">
                <p className="menu__edit-modal__form__name__label">Naziv</p>
                <textarea
                  className="menu__edit-modal__form__name__input"
                  defaultValue={edit ? editedMeal.name : ""}
                  onChange={e => {
                    setNewMealData("name", e.target.value);
                  }}
                />
              </div>
              <div className="menu__edit-modal__form__description">
                <p className="menu__edit-modal__form__description__label">
                  Opis
                </p>
                <textarea
                  className="menu__edit-modal__form__description__input"
                  defaultValue={edit ? editedMeal.description : ""}
                  onChange={e => {
                    setNewMealData("description", e.target.value);
                  }}
                />
              </div>
              <div className="menu__edit-modal__form__price">
                <p className="menu__edit-modal__form__price__label">
                  Cijena (HRK)
                </p>
                <input
                  className="menu__edit-modal__form__price__input"
                  type="number"
                  defaultValue={edit ? editedMeal.price : 0}
                  onChange={e => {
                    setNewMealData("price", e.target.valueAsNumber);
                  }}
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="menu__edit-modal__form__type">
                <p className="menu__edit-modal__form__type__label">
                  Vrsta jela
                </p>
                <select
                  className="menu__edit-modal__form__type__input"
                  value={editedMeal.type}
                  onChange={e => setNewMealData("type", e.target.value)}
                  id="select"
                >
                  {mealTypes.map(option => 
                    <option
                      className="menu__edit-modal__form__type__input__option"
                      key={option.value}
                      value={option.value}
                    >
                      {option.value}
                    </option>
                  )}
                </select>
              </div>
              <div className="menu__edit-modal__form__pdv">
                <p className="menu__edit-modal__form__pdv__label">PDV (%)</p>
                <input
                  className="menu__edit-modal__form__pdv__input"
                  defaultValue={edit ? editedMeal.pdv : 0}
                  onChange={e => {
                    setNewMealData("pdv", e.target.valueAsNumber);
                  }}
                  step="1"
                  max="100"
                  min="0"
                  type="number"
                />
              </div>
              <div className="menu__edit-modal__form__discount">
                <p className="menu__edit-modal__form__discount__label">
                  Popust (%)
                </p>
                <input
                  className="menu__edit-modal__form__discount__input"
                  type="number"
                  defaultValue={edit ? editedMeal.discount : 0}
                  onChange={e => {
                    setNewMealData("discount", e.target.valueAsNumber);
                  }}
                  step="1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="menu__edit-modal__button-container">
                <button
                  type="submit"
                  className="menu__edit-modal__button-container__confirm-button"
                >
                  Potvrdi
                </button>
                <button
                  className="menu__edit-modal__button-container__decline-button"
                  onClick={() => closeModal()}
                >
                  Odustani
                </button>
              </div>
            </form>
          </div>
        </Modal>
        : null}
      {showDeleteModal && 
        <Modal
          show={showDeleteModal}
          closeModal={() => setShowDeleteModal(false)}
        >
          <div className="menu__delete-modal animated--grow-in delay-2s">
            <p className="menu__delete-modal__text">
              Jeste li sigurni da želite obrisati ovo jelo?
            </p>
            <div className="menu__delete-modal__button-container">
              <button
                className="menu__delete-modal__button-container__confirm-button"
                onClick={() => {
                  dispatch(removeMeal(props.user, meal.id));
                  setShowDeleteModal(false);
                }}
              >
                Da
              </button>
              <button
                className="menu__delete-modal__button-container__decline-button"
                onClick={() => setShowDeleteModal(false)}
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

export default MeniList;
