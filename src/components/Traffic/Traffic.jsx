import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTraffic } from "../../store/actions/trafficActions";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Traffic.scss";

function Traffic() {
  const [startDate, setStartDate] = useState(
    moment().utc().startOf("month").toDate()
  );
  const [endDate, setEndDate] = useState(moment().utc().toDate());
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [allTraffic, setAllTraffic] = useState([]);

  const traffic = useSelector(state => state.traffic.traffic);

  const dispatch = useDispatch();

  useEffect(() => {
    setAllTraffic(traffic);
  }, [traffic]);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(getTraffic(startDate, endDate));
    }
  }, [startDate, endDate]);

  return (
    <div className="container-fluid mt-4 menu">
      <div className="datepicker-select">
        <DatePicker
          dateFormat="d.M.y"
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <DatePicker
          dateFormat="d.M.y"
          selected={endDate}
          onChange={date => {
            date.setHours(23, 59, 59, 999);
            setEndDate(date);
          }}
        />
      </div>
      <div className="row p-2 font-weight-bold mt-3 listInfoRow">
        <div className="col-9">
          <div className="row">
            <div className="col">NAZIV</div>
            <div className="col">CIJENA</div>
            <div className="col">KOLIČINA</div>
            <div className="col">UKUPNA CIJENA</div>
          </div>
        </div>
        <div className="col">DATUM</div>
      </div>
      {allTraffic.length ? allTraffic.map((receipt, index) =>
        <div className="row p-2 mt-2 mealRow" key={index}>
          <div className="col-9">
            {receipt.meals.map(meal =>
              <div className="row" key={meal.name}>
                <div className="col">{meal.name}</div>
                <div className="col">{meal.price}</div>
                <div className="col">{meal.quantity}</div>
                <div className="col">{meal.price * meal.quantity} HRK</div>
              </div>
            )}
          </div>
          <div className="col">
            {moment()
              .utc(receipt.finished_timestamp)
              .format("DD.MM.YYYY. hh:mm")}
          </div>
        </div>
      ) : <div className="no-traffic">NEMA PROMETA U ODABRANOM RASPONU</div>}
    </div>
  );
}

export default Traffic;
