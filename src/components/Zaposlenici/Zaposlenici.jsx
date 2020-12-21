import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { getUsers, removeUser } from "../../store/actions/userActions";
import "./Modal.scss";
function Zaposlenici(props) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(props.user));
  }, []);
  console.log(user);
  return (
    <div className="container-fluid mt-4">
      <div className="row p-2 font-weight-bold">
        <div className="col">IME</div>
        <div className="col">PREZIME</div>
        <div className="col">ULOGA</div>
        <div className="col">AKCIJE</div>
      </div>
      {users &&
        users.map(user =>
          <div className="row p-2" key={user.id}>
            <div className="col">{user.fname}</div>
            <div className="col">{user.lname}</div>
            <div className="col">{user.role}</div>
            <div className="col">
              {user.id !== props.user.id &&
                <div>
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
                      setUser(user);
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              }
            </div>
          </div>
        )}
      {user && showModal &&
        <Modal
          open={showModal}
          closeIconId="user-details-close-icon"
          closeOnOverlayClick
          closeOnEsc
          onOverlayClick={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
          styles={{
            overlay: {
              background: "rgba(97, 98, 98, 0.75)",
              display: "flex",
              alignItems: "flex-start",
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "1.2rem",
            },
          }}
        >
          <div className="detail-card container-xl-1" id="fadein">
            Test modal
          </div>
        </Modal>
      }
    </div>
  );
}

export default Zaposlenici;
