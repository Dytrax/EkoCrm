import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class EnProcesoScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Solicitudes En proceso</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})