import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'

import Logo from '../../../assets/Logo.png'

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function header(props){
    return(
        <View style={styles.headerContainer}>
                <Image source={Logo} style={styles.logo} />
        </View>
    )
}

const styles =  StyleSheet.create({
    headerContainer:{
        flex:3,
        alignItems: "center",
        justifyContent: "flex-end",
        
    },
    logo:{
        width: WIDTH - 60,
        height: 85,
        marginBottom: 15,
        resizeMode:"contain"
    }
})

export default header;