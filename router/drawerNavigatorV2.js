import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from 'react-native'
const WIDTH = Dimensions.get("window").width;
import { createDrawerNavigator,DrawerItems } from "react-navigation";

import RootStackSolicitud from './RootStackSolicitud';

import RootStackCrm from './RootStackCrm'
import RootStackCalendar from "./RootStackCalendar"
import RootStackProfile from './RootStackProfile';
import RootStackCrearSolicitud from './RootStackCrearSolicitud';

/* const CustomDrawerComponent = (props) => {
  return(
  <View style={{flex:1}}>
    <View style={{backgroundColor:"black",height:150,justifyContent:"center"}}>
      <Image source={require("../assets/Logo.png")} style={{height:200,width:200,resizeMode:"contain",alignSelf:'center'}}/>
      
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </View>
  )
} */
const DrawerV2 = createDrawerNavigator({
  Calendar:{
    screen:RootStackCalendar
  },
  Crm:{
    screen: RootStackCrm
  },
  Solicitud: {
    screen: RootStackSolicitud,
    
  },
  Profile: {
    screen: RootStackProfile,
    
  },
  CrearSolicitud: {
    screen: RootStackCrearSolicitud
  }
  
},{
  //contentComponent:SideMenu,
  //useNativeAnimations:true
}
);

export default DrawerV2;