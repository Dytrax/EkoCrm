import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from "react-native-flash-message";
//import firebase from 'firebase'
import Login from './src/containers/loginScreen'
import RootStack from './router/RootStack'
export default class App extends Component {
/*     constructor(){
      super();
        this.state={
        currentScreen:'Splash'
      }
    }
    /* setTimeout(() => {
            this.setState({
                currentScreen: 'Login',
            })
        }, 2500) */

    initializeFirebase() {
            const firebase = require("firebase");
          
            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyBUSC6vxO3RySIwY4RIj92mrAewcCg0Xm4",
                authDomain: "ekosave-e5079.firebaseapp.com",
                databaseURL: "https://ekosave-e5079.firebaseio.com",
                projectId: "ekosave-e5079",
                storageBucket: "ekosave-e5079.appspot.com",
                messagingSenderId: "207426050363"
            };
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
                 //inicializando o firestore
                const firestore = require("firebase/firestore");
                db = firebase.firestore();
            }
            
          
           
            
    }
    
    componentDidMount() {
        this.initializeFirebase();
        /* var config = {
            apiKey: "AIzaSyBUSC6vxO3RySIwY4RIj92mrAewcCg0Xm4",
            authDomain: "ekosave-e5079.firebaseapp.com",
            databaseURL: "https://ekosave-e5079.firebaseio.com",
            projectId: "ekosave-e5079",
            storageBucket: "ekosave-e5079.appspot.com",
            messagingSenderId: "207426050363"
          };
          firebase.initializeApp(config); */
        SplashScreen.hide()
    } 
    
             /*  {this.state.currentScreen==='Splash' ? <Splash/> : <Login/>} */
           
    render(){
        return(
            <View style={{ flex: 1 }}>
            <RootStack/>
            <FlashMessage position="top" />
            </View>                
        );
    }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
  }
})