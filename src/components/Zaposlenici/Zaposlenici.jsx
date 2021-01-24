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
import {
  getUsers,
  removeUser,
  updateUser,
  registerUser,
} from "../../store/actions/userActions";
import "./Zaposlenici.scss";
import Header from "../Header/Header";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Zaposlenici(props) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [addUser, setAddUser] = useState(false);
  const users = useSelector(state => state.users.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(props.user));
  }, []);

  const setEditedUserData = (name, value) => {
    setEditedUser({ ...editedUser, [name]: value });
  };

  const roles = [{ value: "Admin" }, { value: "Kuhar" }, { value: "Konobar" }];

  const closeModal = () => {
    setShowModal(false);
    setAddUser(false);
  };

  return (
    <div className="zaposlenici">
      <Header label="Zaposlenici" user={props.user} />
      <button
        className="zaposlenici__add"
        onClick={() => {
          setShowModal(true);
          setAddUser(true);
        }}
      >
        DODAJ ZAPOSLENIKA
      </button>
      <div className="container-fluid mt-4">
        <div className="row p-2 font-weight-bold listInfoRow">
          <div className="col">IME</div>
          <div className="col">PREZIME</div>
          <div className="col">EMAIL</div>
          <div className="col">ULOGA</div>
          <div className="col">AKCIJE</div>
        </div>
        {users && users.length ? 
          users.map(user => 
            <div className="row p-2 mt-2 userRow" key={user.id}>
              <div className="col">{user.fname}</div>
              <div className="col">{user.lname}</div>
              <div className="col">{user.email}</div>
              <div className="col">{user.role}</div>
              <div className="col">
                {user.id !== props.user.id && 
                  <div
                    className="zaposlenici__btns"
                    id="action-button-container"
                  >
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Jeste li sigurni da želite obrisati ovog korisnika?"
                          )
                        ) {
                          dispatch(removeUser(props.user, user.id));
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      className={classes.margin}
                      onClick={() => {
                        setShowModal(true);
                        setEditedUser(user);
                      }}
                    >
                      <EditTwoToneIcon style={{ color: "#219ebc" }} />
                    </IconButton>
                  </div>
                }
              </div>
            </div>
          )
          : 
          <div className="no-users">TRENUTNO NEMA KORISNIKA</div>
        }
      </div>
      {editedUser && showModal ? 
        <Modal showModal={showModal} closeModal={() => closeModal}>
          <div className="detail-card container-xl-1 animated--grow-in delay-2s">
            <button
              className="detail-card__close-icon"
              onClick={() => {
                setShowModal(false);
                setAddUser(false);
              }}
            >
              <CloseIcon style={{ color: "#219ebc" }} />
            </button>
            <form
              className="detail-card__form"
              onSubmit={e => {
                e.preventDefault();
                if (addUser) {
                  dispatch(registerUser(editedUser));
                } else {
                  dispatch(updateUser(props.user, editedUser));
                }
                setShowModal(false);
              }}
            >
              <div className="col">
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-required"
                      label="Ime"
                      defaultValue={!addUser ? editedUser.fname : ""}
                      onChange={e => setEditedUserData("fname", e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-required"
                      label="Prezime"
                      defaultValue={!addUser ? editedUser.lname : ""}
                      onChange={e => setEditedUserData("lname", e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-required"
                      label="Email"
                      defaultValue={!addUser ? editedUser.email : ""}
                      onChange={e => setEditedUserData("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="row" hidden={!addUser}>
                  <div className="col-9">
                    <TextField
                      id="standard-required"
                      label="Password"
                      onChange={e =>
                        setEditedUserData("password", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <TextField
                      id="standard-select-native"
                      select
                      label="Uloga"
                      value={editedUser.role}
                      onChange={e => setEditedUserData("role", e.target.value)}
                      SelectProps={{
                        native: true,
                      }}
                      helperText="Odaberite ulogu zaposlenika"
                    >
                      {roles.map(option => 
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      )}
                    </TextField>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-3" id="potvrdi-container">
                    <Button variant="outlined" type="submit">
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

export default Zaposlenici;
