import React from 'react';
import {
    
    View,
    Text,
    StyleSheet,
} from 'react-native';

function HorizontalSeparator (props){
    return(
        <View style={styles.separator}
        
        ></View>

    );
}

const styles = StyleSheet.create({
    separator:{
        flex: 1,
        marginHorizontal: 5,
        backgroundColor:"black"
    
    }
})
export default HorizontalSeparator;