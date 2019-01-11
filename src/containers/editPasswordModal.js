import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Dimensions,
  TextInput
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Cancel from "react-native-vector-icons/MaterialIcons";
import InputComponent from '../components/inputComponentV2'
const WIDTH = Dimensions.get("window").width;
const EditPassword = props => {
  const {
    loading,
    ...attributes
  } = props;

  
return (
    <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}>
        <View style={styles.modalBackground}>

            <View style={{backgroundColor:"white",borderRadius: 10,padding:10}}>

                <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20,width:WIDTH-60}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Ingrese la contraseña actual *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"actualPassword"}
                                            stateChange={props.stateChange}
                                            type={"default"}
                                            //value={this.state.name}
                                            iconType={"foundation"}
                                            iconName={"asterisk"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20}}>
                        <InputComponent 
                                            passwordValidate={true}
                                            secureText={false}
                                            //width={"100%"}
                                            texto={"Contraseña nueva *"} 
                                            mensajeError=
                                            {`- Minimo 8 caracteres y maximo 15. \n- Al menos una letra mayúscula. \n- Al menos una letra minucula. \n- Al menos un dígito. \n- No espacios en blanco. \n- Al menos 1 caracter especial.`} 
                                            state={"password"}
                                            stateChange={props.stateChange}
                                            type={"default"}
                                            //value={this.state.name}
                                            iconType={"foundation"}
                                            iconName={"asterisk"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20}}>
                        <InputComponent 
                                            passwordValidate={true}
                                            //width={"100%"}
                                            secureText={false}
                                            texto={"Confirmar contraseña nueva *"} 
                                            validate={true}
                                            pastPassword={props.states.password}
                                            equalPassword = {(props.states.confirmationPassword===props.states.password?true:false)}
                                            mensajeError={"Las contraseñas deben coincidir"} 
                                            state={"confirmationPassword"}
                                            stateChange={props.stateChange}
                                            type={"default"}
                                            //value={this.state.name}
                                            iconType={"foundation"}
                                            iconName={"asterisk"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    
                <View style={{flexDirection:"row",marginTop:20}}>
                    <View style={{flex:1,alignItems:"center"}}>
                        <Cancel name="cancel" size={40} color="red" onPress={()=> props.stateChange("editPassword",false)}/>
                        
                    </View>
                    <View style={{flex:1,alignItems:"center"}}>
                        <Icon name="check" size={40} color="green" onPress={()=> props.changePassword()}/>
                        
                    </View>

                </View>
            </View>


            {/* <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={loading} />
                 <Text style={{position:"absolute",bottom:10,color:"grey"}}>Cargando</Text> 
            </View> */}
            

        </View>
    </Modal>
    )
}
const styles2 =  StyleSheet.create({
    
    inputBar: {
        flexDirection: "row",
        alignSelf:"center",
        marginTop:20
    },
    txtInput: {
        paddingLeft:8,
        width:300,
        height:40,
        borderBottomColor: "rgb(184,184,184)",
        borderBottomWidth: 1,
        marginBottom:10,
        fontSize:20
        //backgroundColor:"black"
    },
})
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      //display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
export default EditPassword;