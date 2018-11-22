import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
export default class CalendarScreen extends Component{
     static navigationOptions = {
        drawerLabel: 'Calendario',
        drawerIcon: <Icon name="calendar-check" size={16} color="rgb(184,184,184)"  />
      }; 
      constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
      }
    
      render() {
        console.log(this.state)
        return (
          <ScrollView style={styles.container}>
            <Text style={styles.text}>Calendar with selectable date and arrows</Text>
            <Calendar
              onDayPress={this.onDayPress}
              style={styles.calendar}
              hideExtraDays
              minDate={Date()}
              markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
            />
            
            
          </ScrollView>
        );
      }
    
      onDayPress(day) {
        this.setState({
          selected: day.dateString,
          dateSelected: new Date(day.dateString).toISOString()
        });
      }
    }
    
    const styles = StyleSheet.create({
      calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350
      },
      text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee'
      },
      container: {
        flex: 1,
        backgroundColor: 'gray'
      }
    });