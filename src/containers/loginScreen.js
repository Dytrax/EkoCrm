/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  StatusBar
} from "react-native";
import HeaderLogin from "../components/login/header";
import BodyLogin from "../components/login/body";
import FooterLogin from "../components/login/footer";
import API from "../../api/Api";
import DB from "../../storeData/storeData";


export default class LoginScreen extends Component {
  async componentWillMount(){
    /* const token = await DB.getData("token");
    if (token){
      this.props.navigation.navigate("Drawer");
    }if (!token){
      this.props.navigation.navigate("Home");
    }  */
  }

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: [],
      status: 0,
      message: ""
    };
  }

  //Function called by button login
  callAPI = async () => {
    //answer is the answer of the try/catch authentication
    //answer[0] status, answer[1] Json data
    const answer = await API.loginAuthentication(
      "ejecutivo2@leadis.co",//this.state.email,
      "Hola@321"//this.state.password
    );
    //console.log(answer)
    
    //answer status=200 Can Login
    if (answer[0] === 200) {
      this.setState({
        status:answer[0],
      });
      //Saving the user Data with AsyncStorage
      await DB.store("email", this.state.email);
      await DB.store("token", answer[1].token);
      const token = await DB.getData("token");
      //console.log(token);
      //RN Navigation action
      this.props.navigation.navigate("Drawer");
    } else {
      //answer status!=200 Cant Login
      //answer[0] status, answer[1] message from backend
      console.log(answer[0]);
      console.log(answer[1].message);
      this.setState({
        status:answer[0],
        message:answer[1].message
      });
    }
  };
  //this.onLoginPressed.bind(this)

  //Function to change the states values
  stateChange = (stateToChange, value) => {
    console.log(stateToChange);
    console.log(value);
    this.state[stateToChange] = value;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(144,184,54)" barStyle="light-content" />
        <HeaderLogin />

        <BodyLogin change={this.stateChange} />
        {this.state.status === 401 ? (
          <Text style={{color:"red"}}>{this.state.message}</Text>
        ) : (
          <Text></Text>
        )}
        <FooterLogin actionLogin={this.callAPI} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white"
  }
});
