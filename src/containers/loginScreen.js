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
import DropdownAlert from 'react-native-dropdownalert';
import Loader from "../components/loader"
//connect ECONNREFUSED 23.96.102.56:3306

export default class LoginScreen extends Component {
  async componentWillMount(){
    //Verify If the token still living, if its true login user automatically
     const token = await DB.getData("token");
    if (token){
      this.props.navigation.navigate("Drawer");
    }if (!token){
      this.props.navigation.navigate("Home");
    }  
  }

  constructor() {
    super();

    this.state = {
      loading:false,
      email: "",
      password: "",
      errors: [],
      status: 0,
      message: ""
    };
  }

  //Function called by button login
  callAPI = async () => {
    this.setState({
      loading:true
    })
    //answer is the answer of the try/catch authentication
    //answer[0] status, answer[1] Json data
    let answer = await API.loginAuthentication(
      this.state.email,//this.state.email,ejecutivo2@leadis.co
      this.state.password//this.state.passwordHola@321
    );
    console.log(answer)
    //console.log(answer[1].user.companyId)
    console.log("jejejee")
    //answer status=200 Can Login
    if (answer[0] === 200) {
      
      this.setState({
        status:answer[0],
      });
      //Saving the user Data with AsyncStorage
      await DB.store("email", answer[1].user.email);
      await DB.store("token", answer[1].token);
      await DB.store("companyId", answer[1].user.companyId.toString());
      await DB.store("name", answer[1].user.name);
      await DB.store("phone", answer[1].user.phone);
      await DB.store("id", answer[1].user.id.toString());
      
      //RN Navigation action
      /* setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 2500); */
      this.setState({
        loading: false,
      });
      this.props.navigation.navigate("Drawer");
    } else {
      //answer status!=200 Cant Login
      //answer[0] status, answer[1] message from backend
      console.log(answer[0]);
      console.log(answer[1].message);
      if (answer[1].message==="connect ECONNREFUSED 23.96.102.56:3306"){
          this.dropdown.alertWithType('error', 'Error', "Lo sentimos por el momento no tenemos servicio, intenta más tarde");
      }
          
      this.setState({
        status:answer[0],
        message:answer[1].message,
        loading: false,
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
   goToForget = ()=>{
    this.props.navigation.navigate("Forget")
  } 
  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <HeaderLogin />

        <BodyLogin change={this.stateChange} />
        {this.state.status === 401 ? (
          <Text style={{color:"red"}}>{this.state.message}</Text>
        ) : (
          <Text></Text>
        )}
        <FooterLogin actionLogin={this.callAPI} actionForget={this.goToForget} />
        <DropdownAlert ref={ref => this.dropdown = ref} />
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
