import React from 'react';
import { Text, View, Button } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationEvents,
  StackActions,
  NavigationActions
} from 'react-navigation';
import PruebaScreen from "../src/containers/pruebaScreen";
import AbiertasScreen from '../src/containers/tabsSolicitud/abiertasScreen';
import EnProcesoScreen from '../src/containers/tabsSolicitud/enProcesoScreen';
import CerradasScreen from '../src/containers/tabsSolicitud/cerradasScreen';
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

/* const stackchat = createStackNavigator({
    PruebaScreen:{ screen: PruebaScreen}
  },{
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false

      })
  }); */

const stack1 = createStackNavigator({
    Tab1:{ screen: AbiertasScreen},
  },{
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false

      })
  });

const stack2 = createStackNavigator({
    Tab2:{ screen: EnProcesoScreen },
    
  },{
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false

      })
  });

const stack3 = createStackNavigator({
    Tab3:{ screen: CerradasScreen },
  },{
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false

      })
  });


  export default TabsSolicitud2 = createBottomTabNavigator(
    {
      'Stack1': {
        screen: stack1,
        navigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            defaultHandler();
  
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Tab1' })],
            });
            navigation.dispatch(resetAction);
          },
          tabBarLabel:'Abiertas',
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
                    name="folder-open"
                    color={tintColor}
                    size={20}
                    />
                   
                
                
            )
        },
      },
      'Stack2': {
        screen: stack2,
        navigationOptions: {
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              defaultHandler();
    
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Tab2' })],
              });
              navigation.dispatch(resetAction);
            },
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
          }
      },
      'Stack3': {
        screen: stack3,
        navigationOptions: {
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              defaultHandler();
    
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Tab3' })],
              });
              navigation.dispatch(resetAction);
            },
            tabBarLabel:'Cerradas',
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
                    name="folder"
                    color={tintColor}
                    size={20}
                    />
                   
                
                
            )
          }
      },
      
    },
    {
      //lazy: false,
    }
  );
  