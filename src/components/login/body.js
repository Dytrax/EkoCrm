import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'

import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function body(props){
    return(
        <View styles={styles.container}>
            <View style={styles.inputBar}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems:"center",
                  height:40,
                  
                }}
              > 
                <Icon name="email" size={18} color="rgb(184,184,184)"  />
                {/* <Image source={emailIcon} style={styles.icon} /> */}
              </View>
                <TextInput
                  //this.setState({ email: val })
                  onChangeText={(val) => props.change("email",val)}
                  placeholder="E-mail"
                  placeholderTextColor={"rgb(184,184,184)"}
                  style={styles.txtInput}
                />
            </View>
            
            <View style={styles.inputBar}>
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  height:40,
                }}
              >
                <Icon name="lock" size={18} color="rgb(184,184,184)" />
              </View>
  
              <TextInput
                onChangeText={(val) => props.change("password",val)}
                placeholder="Password"
                placeholderTextColor={"rgb(184,184,184)"}
                style={styles.txtInput}
                secureTextEntry
              />
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    container:{
        flex:2,
        height: 80,
        width: WIDTH - 60,
        alignItems: "center",
        justifyContent: "center",
        
        backgroundColor:"red"
    },
    inputBar: {
        flexDirection: "row",
        
    },
    txtInput: {
      
        paddingLeft:8,
        width:300,
        height:40,
        borderBottomColor: "rgb(184,184,184)",
        borderBottomWidth: 1,
        marginBottom:10,
        fontSize:17,
        
        //backgroundColor:"black"
    },
})

export default body;