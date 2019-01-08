import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native'
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import ButtonLogin from '../../components/buttonCircle'
export default function Footer(props){
    return(
        <View style={styles.container}>
            <ButtonLogin text="Iniciar Sesión" size={WIDTH-60} action={props.actionLogin}/>
            {/* <TouchableHighlight
            onPress={props.actionLogin}
            underlayColor="white"
          >
            
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            
          </TouchableHighlight> */}
          <TouchableHighlight
          onPress={props.actionForget}
          underlayColor="transparent"
          >
            <Text style={styles.colorForgetButton} >Olvidaste tu contraseña</Text>
          </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:3,
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:30,
    },
    buttonText: {
        textAlign: "center",
        width: WIDTH - 60,
        backgroundColor: "rgb(144,184,54)",
        paddingVertical: 4,
        paddingHorizontal: 10,
        color: "white",
        fontSize: 20,
        borderRadius: 20,
        overflow: "hidden",
        marginTop:20,
        marginBottom:20,
      },
      colorForgetButton: {
        color: "rgb(103,167,61)"
      }
})