/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-responsive-modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../Modal/Modal";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
}));
import "./MenuList.scss";
import {
  addNewMeal,
  getAllMeals,
  removeMeal,
  updateMeal,
} from "../../store/actions/menuActions";

function MeniList(props) {
  const classes = useStyles();
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

  const closeModal = () => {
    setShowMealModal(false);
    setEdit(false);
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

  const mealTypes = [
    { value: "Appetizer" },
    { value: "Main Course" },
    { value: "Dessert" },
    { value: "Grill" },
  ];
  return (
    <div className="container-fluid mt-4 menu">
      <input
        className="form-control menu__search"
        type="text"
        placeholder="Pretraži..."
        aria-label="Search"
        onChange={e => {
          setSearchResults(
            allMeals.filter(
              meal =>
                (meal.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  meal.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  meal.type.toLowerCase().includes(e.target.value.toLowerCase())) &&
                meal
            )
          );
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
        <div className="col">TIP</div>
        <div className="col">CIJENA</div>
        <div className="col">PDV</div>
        <div className="col">POPUST</div>
        <div className="col">UKUPNA CIJENA</div>
        <div className="col"></div>
      </div>
      {(searchResults ? searchResults : allMeals).map(meal =>
        <div className="row p-2 mt-2 mealRow" key={meal.id}>
          <div className="col">{meal.name}</div>
          <div className="col">{meal.description}</div>
          <div className="col">{meal.type}</div>
          <div className="col">{Number(meal.price).toFixed(2)} HRK</div>
          <div className="col">{meal.pdv}%</div>
          <div className="col">{meal.discount}%</div>
          <div className="col">{(meal.price + (meal.price * (meal.pdv / 100) - meal.price * (meal.discount / 100))).toFixed(2)} HRK</div>
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
      )}
      {showMealModal && editedMeal ?
        <Modal
          showModal={showMealModal}
          closeModal={() => closeModal}
        >
          <div className="detail-card container-xl-1" id="fadein">
            <div className="detail-card__close-icon">
              <IconButton
                id="close"
                onClick={() => {
                  setShowMealModal(false);
                  setEdit(false);
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
                }}>
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
                    <Button id="potvrdi" type="submit" variant="outlined">Potvrdi</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        : null
      }
    </div>
  );
}

export default MeniList;
