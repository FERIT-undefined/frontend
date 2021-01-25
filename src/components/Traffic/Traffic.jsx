import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTraffic } from "../../store/actions/trafficActions";
import moment from "moment";
import DatePicker from "react-datepicker";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CloseIcon from "@material-ui/icons/Close";

import Modal from "../Modal/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "./Traffic.scss";
import PDFExport from "./PDFExport/PDFExport";
import { IconButton } from "@material-ui/core";

const pdfFile = (traffic, chosenStartDate, chosenEndDate, totalTraffic) =>
  <PDFExport
    traffic={traffic}
    totalTraffic={totalTraffic}
    chosenStartDate={chosenStartDate}
    chosenEndDate={chosenEndDate}
  />
;
function Traffic() {
  const [startDate, setStartDate] = useState(
    moment().utc().startOf("month").toDate()
  );
  const [endDate, setEndDate] = useState(moment().utc().toDate());
  const [allTraffic, setAllTraffic] = useState([]);
  const [download, setDownload] = useState(false);
  const [print, setPrint] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [totalTraffic, setTotalTraffic] = useState(0);

  const traffic = useSelector(state => state.traffic.traffic);

  const dispatch = useDispatch();

  useEffect(() => {
    setAllTraffic(traffic);
    enableButtons();
    calculateTraffic();
  }, [traffic]);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(getTraffic(startDate, endDate));
    }
  }, [startDate, endDate]);

  const enableButtons = () => {
    setDisabled(false);
  };

  const calculateTraffic = () => {
    setTotalTraffic(
      allTraffic.reduce(
        (previousScore, currentScore) =>
          previousScore + currentScore.total_price,
        0
      )
    );
  };

  return (
    <div className="container-fluid mt-4 menu">
      <div className="range">
        <div className="range__label">Promet za razdoblje: </div>
        <div className="datepicker-select">
          <DatePicker
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            onChange={date => setStartDate(date)}
            maxDate={endDate}
          />
          <DatePicker
            dateFormat="dd.MM.yyyy"
            selected={endDate}
            onChange={date => {
              date.setHours(23, 59, 59, 999);
              setEndDate(date);
            }}
            maxDate={moment.utc().toDate()}
          />
        </div>
      </div>
      <div>Ukupno u odabranom razdoblju: {totalTraffic} HRK</div>
      <div>
        {download ?
          <PDFDownloadLink
            document={pdfFile(allTraffic, startDate, endDate, totalTraffic)}
            className="save-button reporting-details__footer__link text-decoration-none"
            fileName={`traffic-${startDate} - ${endDate}.pdf`}
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download now"
            }
          </PDFDownloadLink>
          :
          <button onClick={() => setDownload(true)} disabled={disabled}>
            {disabled ? "Preparing..." : "Export"}
          </button>
        }
        <button onClick={() => setPrint(true)} disabled={disabled}>
          {disabled ? "Preparing..." : "print"}
        </button>
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
      {allTraffic && allTraffic.length ?
        allTraffic.map((receipt, index) =>
          <div className="row p-2 mt-2 mealRow" key={index}>
            <div className="col-9">
              {receipt.meals.map(meal => {
                const mealPrice =
                  meal.price -
                  meal.price * (meal.discount / 100) +
                  (meal.price - meal.price * (meal.discount / 100)) *
                    (meal.pdv / 100);
                return (
                  <div className="row traffic-meal-row" key={meal.name}>
                    <div className="col">{meal.name}</div>
                    <div className="col">{mealPrice.toFixed(2)} HRK </div>
                    <div className="col">{meal.quantity}</div>
                    <div className="col">
                      {(meal.quantity * mealPrice).toFixed(2)} HRK
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {moment(receipt.finished_timestamp).format("DD.MM.YYYY. hh:mm")}
            </div>
          </div>
        )
        :
        <div className="no-traffic">NEMA PROMETA U ODABRANOM RASPONU</div>
      }
      {print &&
        <Modal
          showModal={print}
          closeModal={() => setPrint(false)}
          style={{
            height: "100%",
            width: "75%",
            margin: "auto",
          }}
        >
          <>
            <div className="print-close-icon">
              <IconButton id="close" onClick={() => setPrint(false)}>
                <CloseIcon id="closeIcon" style={{ color: "#219ebc" }} />
              </IconButton>
            </div>
            <PDFViewer width="100%" height="100%">
              {pdfFile(allTraffic, startDate, endDate, totalTraffic)}
            </PDFViewer>
          </>
        </Modal>
      }
    </div>
  );
}

export default Traffic;
