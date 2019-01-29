import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from "react-native-flash-message";

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
    componentDidMount() {
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