import React , { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { getTableOrders } from "../../store/actions/tableOrderActions";
import { useDispatch, useSelector } from "react-redux";


const Kuhinja = () => {
  const tableOrders = useSelector(state => state.tableOrder.tableOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTableOrders());
  }, []);

  return (
    <div>
      <Container>
        <Table striped bordered hover>
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

          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Kuhinja;