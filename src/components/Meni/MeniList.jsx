/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
    <div className="container-fluid mt-4 menu">
      <input
        className="form-control menu__search"
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
          className="menu__add"
          onClick={() => setShowMealModal(true)}
        >
          DODAJ JELO
        </button>
      }
      <div className="row p-2 font-weight-bold mt-3 listInfoRow">
        <div className="col">IME</div>
        <div className="col">OPIS</div>
        <div className="col">VRSTA</div>
        <div className="col">CIJENA</div>
        <div className="col">PDV</div>
        <div className="col">POPUST</div>
        <div className="col">UKUPNA CIJENA</div>
        {props.tableSelect || props.user.role === "Admin" ?
          <div className="col"></div>
          : null}
      </div>
      {(searchResults ? searchResults : allMeals).length ? (searchResults ? searchResults : allMeals).map((meal, index) =>
        <div className="row p-2 mt-2 mealRow" key={meal.id}>
          <div className="col">{meal.name}</div>
          <div className="col">{meal.description}</div>
          <div className="col">{meal.type}</div>
          <div className="col">{Number(meal.price).toFixed(2)} HRK</div>
          <div className="col">{meal.pdv}%</div>
          <div
            className="col"
            style={{ color: meal.discount ? "#7abd73" : "black" }}
          >
            {meal.discount}%
          </div>
          <div className="col">
            {(
              meal.price -
              meal.price * (meal.discount / 100) +
              (meal.price - meal.price * (meal.discount / 100)) *
                (meal.pdv / 100)
            ).toFixed(2)}{" "}
            HRK
          </div>
          {props.tableSelect &&
            <div className="col" id="mealRow-picker">
              <QuantityPicker
                min={0}
                max={10}
                meal={meal}
                index={index}
                updateQuantity={updateQuantity}
                defaultValue={0}
              />
              <button
                visibility={meal.quantity === 0 ? "hidden" : "visible"}
                type="button"
                className="mealRow__addToOrder"
                style={{
                  background: "none",
                  border: "none",
                  verticalAlign: "middle",
                  minWidth: "32px",
                  color: "black",
                  visibility: meal.quantity === 0 ? "hidden" : "visible",
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
                  <CheckCircleOutlineIcon style={{ color: "#555555" }} />
                  :
                  <HighlightOffIcon style={{ color: "#555555" }} />
                }
              </button>
            </div>
          }
          {props.user && props.user.role === "Admin" &&
            <>
              <div className="col">
                <div className="button-container">
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Jeste li sigurni da želite obrisati ovo jelo?"
                        )
                      ) {
                        dispatch(removeMeal(props.user, meal.id));
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
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
                    <EditTwoToneIcon style={{ color: "#219ebc" }} />
                  </IconButton>
                </div>
              </div>
            </>
          }
        </div>
      ) : <div className="no-meals">TRENUTNO NEMA JELA NA MENIU</div>}
      {showMealModal && editedMeal ?
        <Modal showModal={showMealModal} closeModal={() => closeModal}>
          <div className="detail-card container-xl-1" id="fadein">
            <div className="detail-card__close-icon">
              <IconButton id="close" onClick={() => closeModal()}>
                <CloseIcon id="closeIcon" style={{ color: "#219ebc" }} />
              </IconButton>
            </div>
            <form
              className="detail-card__form"
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
                  <div className="col-9">
                    <TextField
                      id="standard-required"
                      label="Naziv"
                      defaultValue={edit ? editedMeal.name : ""}
                      onChange={e => {
                        setNewMealData("name", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-required"
                      label="Opis"
                      defaultValue={edit ? editedMeal.description : ""}
                      onChange={e => {
                        setNewMealData("description", e.target.value);
                      }}
                      multiline={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-number"
                      type="number"
                      inputProps={{
                        step: 0.01,
                        min: 0.01,
                      }}
                      label="Cijena (HRK)"
                      defaultValue={edit ? editedMeal.price : 0}
                      onChange={e => {
                        setNewMealData("price", e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-select-native"
                      select
                      label="Vrsta jela"
                      value={editedMeal.type}
                      onChange={e => setNewMealData("type", e.target.value)}
                      SelectProps={{ native: true }}
                    >
                      {mealTypes.map(option =>
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      )}
                    </TextField>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-number"
                      type="number"
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 100,
                      }}
                      label="PDV (%)"
                      defaultValue={edit ? editedMeal.pdv : 0}
                      onChange={e => {
                        setNewMealData("pdv", e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-number"
                      type="number"
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 100,
                      }}
                      label="Popust (%)"
                      defaultValue={edit ? editedMeal.discount : 0}
                      onChange={e => {
                        setNewMealData("discount", e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-3" id="potvrdi-container">
                    <Button id="potvrdi" type="submit" variant="outlined">
                      Potvrdi
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        : null}
    </div>
  );
}

export default MeniList;
