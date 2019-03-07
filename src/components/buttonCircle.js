import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    
} from "react-native"


export default function ButtonCircle (props){

    return(
        <TouchableHighlight
                onPress={props.action}
                underlayColor="white"
                style={[styles.forgetButton,{width:props.size}]}
                >
            
                    <Text style={styles.buttonText}>{props.text}</Text>
            
                </TouchableHighlight>
    )
    
}

const styles = StyleSheet.create({
    
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        
      },
      forgetButton:{
        margin:10,
        justifyContent:"center",
        height:35,
        alignSelf:"center",
       //width: {},
        backgroundColor: "rgb(144,184,54)",
        borderRadius: 20,
        //overflow: "hidden",
      },
})