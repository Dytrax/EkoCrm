import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class CerradasScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Solicitudes Cerradas</Text>
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