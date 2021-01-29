import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import Modal from "../Modal/Modal";
import {
  getUsers,
  removeUser,
  updateUser,
  registerUser,
} from "../../store/actions/userActions";
import "./Zaposlenici.scss";
import Header from "../Header/Header";

function Zaposlenici(props) {
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
    <div>
      <div className="container-fluid zaposlenici">
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
        {users && users.length ?
          users.map(user =>
            <div className="card shadow zaposlenici__card" key={user.id}>
              <div className="col zaposlenici__card__fname">{user.fname}</div>
              <div className="col zaposlenici__card__lname">{user.lname}</div>
              <div className="col zaposlenici__card__email">{user.email}</div>
              <div className="col zaposlenici__card__role">{user.role}</div>
              {user.id !== props.user.id ?
                <div className="col-1 zaposlenici__card__button-container">
                  <IconButton
                    aria-label="delete"
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
                    <DeleteIcon style={{ color: "#3d405b" }} />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setShowModal(true);
                      setEditedUser(user);
                    }}
                  >
                    <EditTwoToneIcon style={{ color: "#3d405b" }} />
                  </IconButton>
                </div>
                :
                <div className="col-1" />
              }
            </div>
          )
          :
          <div className="no-users">TRENUTNO NEMA KORISNIKA</div>
        }
      </div>
      {editedUser && showModal &&
        <Modal showModal={showModal} closeModal={closeModal}>
          <div className="edit-modal animated--grow-in delay-2s">
            <form
              className="edit-modal__form"
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
              <div className="edit-modal__form__fname">
                <p className="edit-modal__form__fname__label">
                  Ime
                </p>
                <textarea
                  className="edit-modal__form__fname__input"
                  defaultValue={!addUser ? editedUser.fname : ""}
                  onChange={e => setEditedUserData("fname", e.target.value)}
                />
              </div>
              <div className="edit-modal__form__lname">
                <p className="edit-modal__form__lname__label">
                  Prezime
                </p>
                <textarea
                  className="edit-modal__form__lname__input"
                  defaultValue={!addUser ? editedUser.lname : ""}
                  onChange={e => setEditedUserData("lname", e.target.value)}
                />
              </div>
              <div className="edit-modal__form__email">
                <p className="edit-modal__form__email__label">
                  E-mail
                </p>
                <textarea
                  className="edit-modal__form__email__input"
                  defaultValue={!addUser ? editedUser.email : ""}
                  onChange={e => setEditedUserData("email", e.target.value)}
                />
              </div>
              <div
                className="edit-modal__form__password"
                hidden={!addUser}
              >
                <p className="edit-modal__form__password__label">
                  Lozinka
                </p>
                <textarea
                  className="edit-modal__form__password__input"
                  onChange={e => setEditedUserData("password", e.target.value)}
                />
              </div>
              <div className="edit-modal__form__role">
                <p className="edit-modal__form__role__label">
                  Uloga
                </p>
                <select
                  className="edit-modal__form__role__input"
                  value={editedUser.role}
                  onChange={e => setEditedUserData("role", e.target.value)}
                  id="select"
                >
                  {roles.map(option =>
                    <option
                      className="edit-modal__form__role__input__option"
                      key={option.value}
                      value={option.value}
                    >
                      {option.value}
                    </option>
                  )}
                </select>
              </div>
              <div className="edit-modal__button-container">
                <button
                  type="submit"
                  className="edit-modal__button-container__confirm-button"
                >
                  Potvrdi
                </button>
                <button
                  className="edit-modal__button-container__decline-button"
                  onClick={() => closeModal()}
                >
                  Odustani
                </button>
              </div>
            </form>
          </div>
        </Modal>
      }
    </div>
  );
}

export default Zaposlenici;
