/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,TouchableHighlight,
  StatusBar
} from "react-native";
import HeaderLogin from "../components/login/header"
import BodyLogin from "../components/login/body"
import FooterLogin from "../components/login/footer"
import Logo from "../../assets/Logo.png";
import API from "../../api/Api"
import DB from "../../storeData/storeData"
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class LoginScreen extends Component {
  constructor() {
    super();
    
    
    this.state = {
        email: "",
        password: "",
        errors: [],
        token: "",
        key: "",
        
    }
}
callAPI = async () => {
  //API.imprimirAlgo(this.state.email)
  const answer = await API.loginAuthentication(this.state.email,this.state.password)
  console.log(answer)
  await DB.store("email",this.state.email)
  await DB.store("token",answer.token)
  const token = await DB.getData("token")
  console.log(token)

  
}
//this.onLoginPressed.bind(this)
stateChange = (stateToChange,value) => {
  console.log(stateToChange)
  console.log(value)
  this.state[stateToChange]=value
}

//Connecting with the Backend
async onLoginPressed() {
  console.log("State")
  console.log(this.state.email)
    try {
        let response = await
            fetch('http://138.197.160.240:3000/v1/login', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer',
                },
                body: JSON.stringify({
                    email: this.state.email,//'ejecutivo@leadis.co',
                    password: this.state.password,//'Hola@321',

                })
            });

        // Waiting the answer of the Backend
        let res = await response.json();
        console.log("Answer");
        console.log(res);
        console.log("Status");
        console.log(response.status);
        
        this.setState({ status: response.status });
        console.log("Type variable of status");
        console.log(typeof (this.state.status));
        //status = 200 the user can login
        if (response.status == 200) {
          this.setState({
            key:"ok"
          })
            //console.log(JSON.stringify(res, 0, 2));
            /* const goHome = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
              });
              this.props.navigation.dispatch(goHome) */
            //this.props.navigation.navigate('Main');
            
            
            let accessToken = res.token;
            console.log("Token Object");
            console.log(res.token);
            

            

        } else {
            let errors = res;
            console.log("Errors");
            console.log(errors);
            throw errors;


        }

    } catch (errors) {
        console.log("catch errors: " + errors.Text());
        //errors are in JSON form so we must parse them first.
        let formErrors = JSON.parse(errors);
        //We will store all the errors in the array.
        let errorsArray = [];
        for (var key in formErrors) {
            //If array is bigger than one we need to split it.
            if (formErrors[key].length > 1) {
                formErrors[key].map(
                    error => errorsArray.push(`${key} ${error}`));
            } else {
                errorsArray.push(`${key} ${formErrors[key]}`);
            }
        }


    }
}


  render() {
    if (this.state.key==="ok"){
      return (
        <View style={uiCrm.container}>
        <View style={uiCrm.header}>
          <Text>Header</Text>
        </View>
        <View style={uiCrm.body}>
          <Text>Body</Text>
        </View>
        <View style={uiCrm.footer}>
          <Text>Footer</Text>
        </View>
      </View>

        
      );

    }
    else{
      return(
        <View style={styles.container}>
          <StatusBar
            backgroundColor="rgb(144,184,54)"
            barStyle="light-content"
          />
          <HeaderLogin/>
          
          <BodyLogin change={this.stateChange} />
          <FooterLogin actionLogin={this.callAPI}/>
          
        </View>
      )
      
      
    }
    
  }
  
}
const uiCrm = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    flex:1,
    backgroundColor:"rgb(255,60,60)"
  },
  body:{
    flex:3,
    backgroundColor:"rgb(3,100,30)"
  },
  footer:{
    flex:1,
    backgroundColor:"rgb(255,200,60)"
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

});
