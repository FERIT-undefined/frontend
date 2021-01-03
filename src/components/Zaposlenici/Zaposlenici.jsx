import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import {
  getUsers,
  removeUser,
  updateUser,
} from "../../store/actions/userActions";
import "./Zaposlenici.scss";

function Zaposlenici(props) {
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const users = useSelector(state => state.users.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(props.user));
  }, []);

  const setEditedUserData = (name, value) => {
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row p-2 font-weight-bold listInfoRow">
        <div className="col">IME</div>
        <div className="col">PREZIME</div>
        <div className="col">ULOGA</div>
        <div className="col">AKCIJE</div>
      </div>
      {users &&
        users.map(user =>
          <div className="row p-2 mt-2 userRow" key={user.id}>
            <div className="col">{user.fname}</div>
            <div className="col">{user.lname}</div>
            <div className="col">{user.role}</div>
            <div className="col">
              {user.id !== props.user.id &&
                <div id="action-button-container">
                  <button
                    id="remove-action-button"
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
                    REMOVE
                  </button>
                  <button
                    id="update-action-button"
                    onClick={() => {
                      setShowModal(true);
                      setEditedUser(user);
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              }
            </div>
          </div>
        )}
      {editedUser && showModal &&
        <Modal
          open={showModal}
          center
          onClose={() => setShowModal(false)}
        >
          <div className="container-xl-1" id="fadein">
            <form
              onSubmit={e => {
                e.preventDefault();
                dispatch(updateUser(props.user, editedUser));
                setShowModal(false);
              }}
            >
              <div className="col">
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="fname">Ime</label>
                  </div>
                  <div className="col-9">
                    <input
                      type="text"
                      name="fname"
                      value={editedUser.fname}
                      onChange={e => {
                        setEditedUserData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="lname">Prezime</label>
                  </div>
                  <div className="col-9">
                    <input
                      type="text"
                      name="lname"
                      value={editedUser.lname}
                      onChange={e => {
                        setEditedUserData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="role">Role</label>
                  </div>
                  <div className="col-9">
                    <select
                      name="role"
                      id="role"
                      defaultValue={editedUser.role}
                      onClick={e => {
                        setEditedUserData(e.target.name, e.target.value);
                      }}
                    >
                      <option name="role" value="Admin">
                        Admin
                      </option>
                      <option name="role" value="Kuhar">
                        Kuhar
                      </option>
                      <option name="role" value="Konobar">
                        Konobar
                      </option>
                    </select>
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

export default Zaposlenici;
