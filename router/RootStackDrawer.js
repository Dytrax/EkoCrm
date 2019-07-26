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
import SolicitudScreen from "../src/containers/solicitudScreen";
import CrmScreen from "../src/containers/crmScreen";
import Logo from "../assets/Logo.png"
import CalendarScreen from '../src/containers/calendarScreen';
import TabsCrm from './RootStackTab';
import RootStackSolicitud from './RootStackSolicitud';
import SideMenu from '../src/containers/SideMenu';
import RootStackCrm from './RootStackCrm'
import RootStackCalendar from "./RootStackCalendar"
import RootStackProfile from './RootStackProfile';
import sideMenuPrueba from '../src/components/sideMenuPrueba'
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
const MyDrawer = createDrawerNavigator({
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
  contentComponent:SideMenu,
  useNativeAnimations:true
}
);

export default MyDrawer;