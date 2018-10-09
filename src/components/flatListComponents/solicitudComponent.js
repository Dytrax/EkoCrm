import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default function SolicitudComponent(props){
    return(
        <View style={styles.container}>
            <View style={style.titleAndDate}>
                <Text>Titulo</Text>
                <Text>Fecha</Text>
            </View>
            <Text>Company Name</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    titleAndDate:{
        justifyContent:"space-between"
    }
})