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
import Header from "../Header/Header";

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
  const user = useSelector(state => state.users.user);
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
      traffic.reduce(
        (previousScore, currentScore) =>
          previousScore + currentScore.total_price,
        0
      )
    );
  };

  return (
    <div>
      <div className="container-fluid traffic">
        <Header label="Promet" user={user} />
        <div className="traffic__topbar">
          <div className="traffic__topbar__range">
            <div className="traffic__topbar__range__label">
              Promet za razdoblje:{" "}
            </div>
            <div className="traffic__topbar__range__datepicker-container">
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
          <div className="traffic__topbar__info">
            <div className="traffic__topbar__info__total">
              <p className="traffic__topbar__info__total__label">
                Ukupno u odabranom razdoblju:
              </p>
              <p className="traffic__topbar__info__total__value">
                {" "}
                {totalTraffic} HRK
              </p>
            </div>
            <div className="traffic__topbar__info__button-container">
              {download ? 
                <PDFDownloadLink
                  document={pdfFile(
                    allTraffic,
                    startDate,
                    endDate,
                    totalTraffic
                  )}
                  className="save-button reporting-details__footer__link text-decoration-none traffic__topbar__info__button-container__export__link"
                  fileName={`traffic-${startDate} - ${endDate}.pdf`}
                >
                  {({ loading }) => loading ? "Učitavanje" : "Preuzmi"}
                </PDFDownloadLink>
                : 
                <button
                  className="traffic__topbar__info__button-container__export"
                  onClick={() => setDownload(true)}
                  disabled={disabled}
                >
                  {disabled ? "Priprema..." : "Generiraj izvješće"}
                </button>
              }
              <button
                className="traffic__topbar__info__button-container__print"
                onClick={() => setPrint(true)}
                disabled={disabled}
              >
                {disabled ? "Priprema..." : "Ispiši"}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="row p-2 font-weight-bold mt-3 listInfoRow">
        <div className="col-9">
          <div className="row">
            <div className="col">NAZIV</div>
            <div className="col">CIJENA</div>
            <div className="col">KOLIČINA</div>
            <div className="col">UKUPNA CIJENA</div>
          </div>
        </div>
        <div className="col">DATUM</div>
      </div> */}
        {allTraffic && allTraffic.length ? 
          allTraffic.map((receipt, index) => 
            <div className="card shadow traffic__card" key={index}>
              <div className="col-1 traffic__card__list__time">
                {moment(receipt.finished_timestamp).format("DD.MM.YYYY. hh:mm")}
              </div>
              <div className="col traffic__card__list">
                {receipt.meals.map(meal => {
                  const mealPrice =
                    meal.price -
                    meal.price * (meal.discount / 100) +
                    (meal.price - meal.price * (meal.discount / 100)) *
                      (meal.pdv / 100);
                  return (
                    <div className="traffic__card__list__meal" key={meal.name}>
                      <div className="col traffic__card__list__meal__name">
                        {meal.name}
                      </div>
                      <div className="col traffic__card__list__meal__price">
                        {mealPrice.toFixed(2)} HRK{" "}
                      </div>
                      <div className="col traffic__card__list__meal__quantity">
                        {meal.quantity} kom
                      </div>
                      <div className="col traffic__card__list__meal__total">
                        {(meal.quantity * mealPrice).toFixed(2)} HRK
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-1 traffic__card__list__price">
                {receipt.total_price.toFixed(2)} HRK
              </div>
            </div>
          )
          : 
          <div className="no-traffic">NEMA PROMETA U ODABRANOM RASPONU</div>
        }
      </div>
      {print && 
        <Modal showModal={print} closeModal={() => setPrint(false)}>
          <div className="print-modal">
            <PDFViewer width="100%" height="100%">
              {pdfFile(allTraffic, startDate, endDate, totalTraffic)}
            </PDFViewer>
            <div className="print-modal__close-icon">
              <IconButton id="close" onClick={() => setPrint(false)}>
                <CloseIcon
                  id="closeIcon"
                  fontSize="large"
                  style={{
                    color: "#3d405b",
                    borderRadius: "25px",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
}

export default Traffic;
