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
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import Icon3 from "react-native-vector-icons/FontAwesome5"
import Icon4 from "react-native-vector-icons/Entypo"




const TabsCrm = createBottomTabNavigator({
    Contactos:{ screen: ContactScreen,
                navigationOptions: {
                    tabBarLabel:'Contactos',
                    tabBarOptions: {
                        showLabel: true, // hide labels
                        activeTintColor: "rgb(139,179,75)", // active icon color
                        inactiveTintColor: '#586589',  // inactive icon color
                        style: {
                            //backgroundColor: '#171F33' // TabBar background
                            backgroundColor:"rgb(243,243,243)",
                            shadowColor: 'rgba(0,0,0, .4)', // IOS
                            shadowOffset: { height: 1, width: 1 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius:6, //IOS
                        }
                    },
            
                    tabBarIcon: ({tintColor}) => (
                        
                            <Icon2
                            name="contacts"
                            color={tintColor}
                            size={20}
                            />

                            )
                }
            
            },
    Clientes:{ screen: ClientScreen,
        navigationOptions: {
            tabBarLabel:'Clientes',
            tabBarOptions: {
                showLabel: true, // hide labels
                activeTintColor: "rgb(139,179,75)", // active icon color
                inactiveTintColor: '#586589',  // inactive icon color
                style: {
                    //backgroundColor: '#171F33' // TabBar background
                    backgroundColor:"rgb(243,243,243)",
                    shadowColor: 'rgba(0,0,0, .4)', // IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius:6, //IOS
                }
            },
    
            tabBarIcon: ({tintColor}) => (
                
                    <Icon3
                    name="users"
                    color={tintColor}
                    size={20}
                    />

                    )
        }    
    },
    Oportunidades:{ screen: OportunityScreen,
        navigationOptions: {
            tabBarLabel:'Oportunidades',
            tabBarOptions: {
                showLabel: true, // hide labels
                activeTintColor: "rgb(139,179,75)", // active icon color
                inactiveTintColor: '#586589',  // inactive icon color
                style: {
                    //backgroundColor: '#171F33' // TabBar background
                    backgroundColor:"rgb(243,243,243)",
                    shadowColor: 'rgba(0,0,0, .4)', // IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius:6, //IOS
                }
            },
    
            tabBarIcon: ({tintColor}) => (
                
                    <Icon4
                    name="thumbs-up"
                    color={tintColor}
                    size={20}
                    />

                    )
        }
    
    }

  
},{
    //order:['Contactos','Clientes','Oportunidades'],
    animationEnabled:true,
    
}   
);

export default TabsCrm;