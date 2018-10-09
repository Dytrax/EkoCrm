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
import { createBottomTabNavigator } from "react-navigation";
import ClientScreen from '../src/containers/tabsCRM/clientScreen';
import ContactScreen from '../src/containers/tabsCRM/contactsScreen';
import OportunityScreen from '../src/containers/tabsCRM/oportunityScreen';





const TabsCrm = createBottomTabNavigator({
    Contactos:{ screen: ContactScreen},
    Clientes:{ screen: ClientScreen},
    Oportunidades:{ screen: OportunityScreen}

  
},{
    //order:['Contactos','Clientes','Oportunidades'],
    animationEnabled:true,
    
}   
);

export default TabsCrm;