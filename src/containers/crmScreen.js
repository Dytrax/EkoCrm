import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TabsCrm from "../../router/RootStackTab"
export default class CrmScreen extends Component{
     static navigationOptions = {
        drawerLabel: 'CRM',
        drawerIcon: <Icon name="folder-search" size={16} color="rgb(184,184,184)"  />
      }; 
    render(){
        return(
            <TabsCrm/>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white"
    },
    header:{
        flex:1,
        backgroundColor:"white",
        
        width:WIDTH,    
    },
    body:{
        flex:10,
        backgroundColor:"green",
        width:WIDTH,
        alignItems:"center",
        justifyContent:"center",
    },
    footer:{
        flex:1,
        backgroundColor:"white",
        width:WIDTH,
        alignItems:"center",
        justifyContent:"center",
    }
})