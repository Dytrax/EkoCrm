import { createBottomTabNavigator } from "react-navigation";
import AbiertasScreen from "../src/containers/tabsSolicitud/abiertasScreen";
import CerradasScreen from "../src/containers/tabsSolicitud/cerradasScreen";
import EnProcesoScreen from "../src/containers/tabsSolicitud/enProcesoScreen";
import React from "react"
//createBottomTabNavigator
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const TabsSolicitud = createBottomTabNavigator({
    Abiertas:{ screen: AbiertasScreen,
        
        navigationOptions: () => ({
            tabBarLabel:'Abiertas',
            tabBarOptions: {
                showLabel: true, // hide labels
                activeTintColor: "rgb(54,176,88)", // active icon color
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
                    name="folder-open"
                    color={tintColor}
                    size={20}
                    />
                   
                
                
            )
        })
    },
    EnProceso:{ screen: EnProcesoScreen,
        navigationOptions: () => ({
            tabBarLabel:'En Proceso',
            tabBarOptions: {
                showLabel: true, // hide labels
                activeTintColor: "rgb(252,140,1)", // active icon color
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
                    name="clock-end"
                    color={tintColor}
                    size={20}
                    />
                   
                
                
            )
        })
    
    },
    Cerradas:{ screen: CerradasScreen,
        navigationOptions: () => ({
            tabBarLabel:'Cerradas',
            tabBarOptions: {
                showLabel: true, // hide labels
                activeTintColor: "rgb(226,65,55)", // active icon color
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
                    name="folder"
                    color={tintColor}
                    size={20}
                    />
                   
                
                
            )
        })
    }

  
},{
    //order:['Abiertas','EnProceso','Cerradas'],
    animationEnabled:true,
    lazy: false
    /* tabBarOptions: {
        showLabel: true, // hide labels
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: '#586589',  // inactive icon color
        style: {
            //backgroundColor: '#171F33' // TabBar background
            backgroundColor:"rgb(2,87,23)"
        }
    } */
    
}   
);


/* tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: '#F8F8F8', // active icon color
    inactiveTintColor: '#586589',  // inactive icon color
    style: {
        //backgroundColor: '#171F33' // TabBar background
        backgroundColor:"rgb(2,87,23)"
    }
} */
export default TabsSolicitud;