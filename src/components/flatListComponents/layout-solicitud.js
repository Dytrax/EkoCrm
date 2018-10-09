import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

function SolicitudLayout(props) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </View>

    )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        flex: 1,
    },
    title:{
        color: '#212121',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 8,
    }
})
export default SolicitudLayout;