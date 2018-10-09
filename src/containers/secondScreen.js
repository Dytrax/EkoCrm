import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class SecondScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Solicitudes</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white"
    }
})