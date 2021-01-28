import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import moment from "moment";
import "moment/locale/hr";
import styles from "./styles";

moment.locale("hr");
var localLocale = moment();

const renderTimeEntries = meals =>
  meals.map(meal => {
    return (
      <View style={styles.traffic_entries} key={meal.id}>
        <Text style={styles.meal_name}>{meal.name}</Text>
        <Text style={styles.meal_description}>{meal.description}</Text>
        <Text style={styles.meal_details}>
          {`PDV: ${meal.pdv}%, Količina: ${meal.quantity}, Cijena: ${meal.price} HRK`}
        </Text>
        <Text style={styles.meal_type}>{meal.type}</Text>
      </View>
    );
  });
const PDFExport = props => 
  <Document>
    <Page size="A4" style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.date_created}>
          {localLocale.utc().format("LL")}
        </Text>
        <Text style={styles.company_name_header}>Brza Klopa</Text>
      </View>
      <View style={styles.document_title}>
        <Text style={styles.company_name}>
          Brza Klopa Detaljan Ispis Prometa
        </Text>
        <Text style={styles.company_name_date_range}>
          {localLocale.utc(props.chosenStartDate).format("LL")}
          {" - "}
          {localLocale.utc(props.chosenEndDate).format("LL")}
        </Text>
        <View style={styles.main_page_traffic}>
          <Text style={styles.main_page_total_traffic}>
            {props.totalTraffic} HRK
          </Text>
          <Text>Prometa</Text>
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.date_created}>
          {localLocale.utc().format("LL")}
        </Text>
      </View>
      <View style={styles.traffic_entries}>
        <Text style={styles.meal_name}>Naziv</Text>
        <Text style={styles.meal_description}>Opis</Text>
        <Text style={styles.meal_details}></Text>
        <Text style={styles.meal_type}>Tip</Text>
      </View>
      {props.traffic &&
        props.traffic.map(meals => 
          <View style={styles.receipt} key={meals.billId} wrap={false}>
            {meals.meals && renderTimeEntries(meals.meals)}
            <View style={styles.receipt_footer}>
              <Text>Total Price: {meals.total_price} HRK</Text>
              <Text>
                {moment(meals.finished_timestamp).format("DD.MM.YYYY. hh:mm")}
              </Text>
            </View>
          </View>
        )}
    </Page>
  </Document>
;
export default PDFExport;
