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
export default class Calendar extends Component{
     static navigationOptions = {
        drawerLabel: 'Calendario',
        drawerIcon: <Icon name="calendar-check" size={16} color="rgb(184,184,184)"  />
      }; 
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Text>Icon</Text>
                    </View>
                    
                    <View style={{flex:1}}>
                        <Text >Title</Text>
                    </View>
                    
                </View>
                <View style={styles.body}>
                    <Text>Body</Text>
                    <Text>Body</Text>
                </View>
                <View style={styles.footer}>
                    <Text>Footer</Text>
                </View>
                
            </View>
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