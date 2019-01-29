import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native'
import splashImage from '../../assets/splashImage.jpg'
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default class Splash extends Component{
    render(){
        return(
            <View>
                <Image source={splashImage} style={styles.splashStyle}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    splashStyle:{
        height:HEIGHT,
        width:WIDTH,
        resizeMode:'contain'
    }
})