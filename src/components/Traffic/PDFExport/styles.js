import { StyleSheet, Font } from "@react-pdf/renderer";

import SofiaProRegularFont from "../../../styles/assets/fonts/SofiaProRegular.ttf";
import SofiaProLightFont from "../../../styles/assets/fonts/SofiaProLight.ttf";
import NunitoBold from "../../../styles/assets/fonts/Nunito-Bold.ttf";
import NunitoLight from "../../../styles/assets/fonts/Nunito-Light.ttf";

Font.register(
  {
    family: "Sofia Pro",
    fonts: [
      { src: SofiaProRegularFont, fontWeight: "regular" },
      { src: SofiaProLightFont, fontWeight: "light" },
    ],
  },
);
Font.register(
  {
    family: "Nunito",
    fonts: [
      { src: NunitoBold, fontWeight: "bold" },
      { src: NunitoLight, fontWeight: "light" },
    ],
  },
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Sofia Pro",
    fontWeight: "light",
  },
  date_created: {
    fontSize: 9,
  },
  company_name_header: {
    fontSize: 9,
    textAlign: "center",
    marginRight: "20%",
  },
  company_name: {
    fontFamily: "Nunito",
    fontSize: 35,
    textAlign: "left",
    fontWeight: "bold",
  },
  comapny_name_date_range: {
    fontSize: 15,
    marginTop: 10,
  },
  document_title: {
    marginTop: 20,
  },
  main_page_traffic: {
    marginTop: 60,
    flexDirection: "row",
    fontSize: 25,
  },
  main_page_total_traffic: {
    fontFamily: "Nunito",
    marginRight: 15,
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "2 solid black",
    paddingBottom: 5,
  },
  traffic_entries: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
  },
  receipt: {
    borderTop: "1 solid grey",
    borderBottom: "1 solid grey",
  },
  receipt_footer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15
  },
  meal_name: {
    fontSize: 10,
    width: "20%",
    height: "auto",
    fontFamily: "Nunito",
    float: "left",
    fontWeight: "bold",
  },
  meal_description: {
    fontSize: 10,
    width: "17%",
    marginLeft: 15,
    display: "relative",
  },
  meal_details: {
    display: "relative",
    textAlign: "center",
    width: "40%",
    fontSize: 10,
  },
  meal_type: {
    marginLeft: 25,
    width: "20%",
    textAlign: "left",
    display: "absolute",
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginRight: "25%",
  },
});

export default styles;
