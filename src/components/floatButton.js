import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import Icon2 from "react-native-vector-icons/FontAwesome5"
import color from '../../config/colors'
export default function FloatButton (props){
    return(
        <TouchableOpacity style={[styles.btn,color.buttonColor]} onPress={props.add}>
            <Icon2 name={"plus"} size={20} color={"white"}></Icon2>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    btn:{
        position:"absolute",
        width:53,
        height:53,
        
        bottom:10,
        right:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30
    },
    plus:{
        color:"white",
        fontSize:30
    }
})