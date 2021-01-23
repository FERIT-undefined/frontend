/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { getTableOrders, changeStatus } from "../../store/actions/tableOrderActions";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Kuhinja.scss";
import Header from "../Header/Header";

const Kuhinja = () => {
  const tableOrders = useSelector(state => state.tableOrder.tableOrders);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(null);
  const [table, setTable] = useState(null);
  const [meal, setMeal] = useState(null);
  const [tableIndex, setTableIndex] = useState(null);
  useEffect(() => {
    dispatch(getTableOrders());
  }, []);

  const changeMealStatus = () => {
    console.log("changeMeal", meal);
    let status;
    if (meal.status.toLowerCase() === "ordered") status = "started";
    if (meal.status.toLowerCase() === "started") status = "done";
    // dispatch(changeStatus(status, table, index, user, tableIndex));
    dispatch(changeStatus(status, table, meal, user));
  };
  return (
    <div className="container-fluid mt-4 kitchen">
      <Header label="Narudžbe" user={user} />
      <div className="row p-2 font-weight-bold mt-3 listKitchenRow">
        <div className="col-1">STOL</div>
        <div className="col">
          <div className="row">
            <div className="col">NARUDŽBA</div>
            <div className="col">KOLIČINA</div>
            <div className="col">STATUS</div>
            <div className="col">PROMJENA</div>
          </div>
        </div>
      </div>
      {
        tableOrders.length ?
          tableOrders.map((order, i) =>
            !order.done
              ?
              <div className="row p-2 mt-2 mealRow" key={order.table} onClick={() => { setTable(order); setTableIndex(i); }}>
                <div className="col-1">{order.table}</div>
                <div className="col">
                  {
                    order.meals.map(meal =>
                      <div className="row kitchen-meal-row" key={meal.name}>
                        <div className="col">{meal.name}</div>
                        <div className="col">{meal.quantity}</div>
                        <div className={classNames({
                          col: true,
                          done: meal.status.toLowerCase() === "done",
                          started: meal.status.toLowerCase() === "started",
                          ordered: meal.status.toLowerCase() === "ordered"
                        })}>
                          {meal.status.toLowerCase() === "done" && "Spremno za posluživanje"}
                          {meal.status.toLowerCase() === "started" && "U pripremi"}
                          {meal.status.toLowerCase() === "ordered" && "Naručeno"}
                        </div>
                        <>
                          <div className="col">
                            <button
                              className="button-container__change"
                              onClick={() => { setShow(true); setIndex(i); setMeal(meal); }}
                            >
                              Promijeni status
                                </button>
                          </div>
                        </>
                      </div>
                    )
                  }
                </div>
              </div>

              : null
          )
          : <div className="no-orders">TRENUTNO NEMA NARUDŽBI</div>
      }
      <Container>
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>Stol</th>
              <th>Narudžba</th>
              <th>Količina</th>
              <th>Vrijeme</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableOrders.map((item, i) =>
              item.done === false ?
                <tr key={item.table} onClick={() => { setTable(item); setTableIndex(i); }}>
                  <td>
                    <p>{item.table}</p>
                  </td>
                  <td>
                    {tableOrders[i].meals.map((item, i) => <p key={i}>{item.name}</p>)}
                  </td>
                  <td>
                    {tableOrders[i].meals.map((item, i) => <p key={i}>{item.quantity}</p>)}
                  </td>
                  <td>
                  </td>
                  <td>
                    {tableOrders[i].meals.map((item, i) => <React.Fragment key={i}>
                      <Row>
                        <Col xs={2}>
                          <p>{item.status}</p>
                        </Col>
                        <Col xs={4}>
                          <Button variant="info" size="sm" onClick={() => { setShow(true); setIndex(i); setMeal(item); }}>Change status</Button>
                        </Col>

                      </Row>
                    </React.Fragment>)}
                  </td>
                </tr>
                : null
            )}
          </tbody>
        </Table> */}
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <p>
              Sljedeći korak?
              <button type="button" className="btn btn-default" aria-label="Left Align">
                <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
              </button>
              <Button variant="success" onClick={() => { setShow(false); changeMealStatus(); }}>Da</Button>
              <Button variant="danger" onClick={() => setShow(false)}>Ne</Button>
            </p>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Kuhinja;
