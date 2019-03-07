import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Picker,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styleCRM";
import Header from "../../components/headerComponent";
import { CheckBox } from "react-native-elements";
import ProductAssignFlatList from "../../components/crmOportunity/productsAssignFlatList";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
export default class CalendarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress(day) {
    this.props.stateChange("showModalCalendar", false);
    this.setState({
      
      selected: day.dateString
      //dateSelected: new Date(day.dateString).toISOString()
    });
    var today = new Date();
    var hours = today.getHours();
    console.log(day);
    this.props.stateChange("dateSelectedCalendarToShow", day.dateString);
    this.props.stateChange(
      "dateSelectedCalendar",
      new Date(day.year, day.month - 1, day.day, 5)
    );
  }

  render() {
    console.log("minDate")
    console.log(this.props.minDate)
    /* console.log((("01/01/") + this.props.minDate.substr(this.props.minDate.length-4,this.props.minDate.length))) */
    return (
      <Modal
        visible={this.props.show}
        animationType="none"
        onRequestClose={() => { this.props.stateChange("showModalCalendar", false); } }
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.bodyContainer}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Header
                //selected={false}
                titulo={"Seleccionar fecha"}
                name={"keyboard-backspace"}
                actionIcon={() => {
                  this.props.stateChange("showModalCalendar", false);
                }}
              />
            </View>

            <View style={[styles.bodyContainer]}>
              <Calendar
                onDayPress={this.onDayPress}
                style={stylesCalendar.calendar}
                //hideExtraDays
                //this.props.minDate.slice(6,10)
                current={(this.state.selected) ? this.state.selected : ((this.props.minDate === "12/32/2018") ? ("01/01/" + (parseInt(this.props.minDate.substr(this.props.minDate.length-4,this.props.minDate.length))+1)) : this.props.minDate)}
                minDate={(this.props.minDate === "12/32/2018") ? ("01/01/" + (parseInt(this.props.minDate.substr(this.props.minDate.length-4,this.props.minDate.length))+1)) : this.props.minDate}
                markedDates={{
                  [this.state.selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange"
                  }
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const stylesCalendar = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 350
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee"
  },
  container: {
    flex: 1,
    backgroundColor: "gray"
  }
});
