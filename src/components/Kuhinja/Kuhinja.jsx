import React , { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { getTableOrders, changeStatus } from "../../store/actions/tableOrderActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Kuhinja.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    let status = meal.status ===  "ordered" ? "started" : "done";
    dispatch(changeStatus(status, table, index, user, tableIndex));
  };
  return (
    <div>
      <Container>
        <Table  striped bordered hover>
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
              <tr key={item.table} onClick={() => {setTable(item); setTableIndex(i);}}>
                <td>
                  <p>{item.table}</p>
                </td>
                <td>
                  {tableOrders[0].meals.map((item, i) => <p key={i}>{item.name}</p>)}
                </td>
                <td>
                  {tableOrders[0].meals.map((item, i) => <p key={i}>{item.quantity}</p>)}
                </td>
                <td>
                </td>
                <td>
                  {tableOrders[0].meals.map((item, i) => <React.Fragment key={i}>  
                    <Row>
                      <Col xs={2}>
                        <p>{item.status}</p>
                      </Col>
                      <Col xs={4}>
                        <Button variant="info" size="sm" onClick={() => {setShow(true); setIndex(i); setMeal(item);}}>Change status</Button>
                      </Col>

                    </Row>
                  </React.Fragment>)}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
              <Button variant="success" onClick={() => { setShow(false); changeMealStatus();}}>Da</Button>
              <Button variant="danger" onClick={() => setShow(false)}>Ne</Button> 
            </p>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Kuhinja;