import React, {Component} from 'react';
import {
     View, 
     Alert,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
import InputComponent from './inputPrueba';
import CONFIG from "../../../config/config"
import ButtonCircle from '../../components/buttonCircle';
import {withNavigation,StackActions,NavigationActions} from "react-navigation"
const URL_ADD_CONTACTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts`

const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: "TabCRM",
        action: NavigationActions.navigate({
          routeName: "Tab1",
        })
      }),
    ]
});
export default class CreateContactV2 extends Component {

  constructor(props) {
    super(props);
    
    this.state = {

    };
  }
  
 

  addContact = async () => {

    if (!this.state.contactDir ||
        !this.state.contactEmail || !this.state.contactName || 
        !this.state.contactPhone ){
            Alert.alert(
                'Todos los campos deben ser completados'
             )

        }
    else{
        let bodyJson = {
            address:this.state.contactDir,
            email:this.state.contactEmail,
            latitude:0,
            longitude:0,
            name:this.state.contactName,
            observations:this.state.contactObs,
            phone:this.state.contactPhone,
    
        }
        
        const token = await DB.getData("token");
        let answer = await API.PostData(token,URL_ADD_CONTACTS,bodyJson)
        console.log(answer)
        this.props.navigation.dispatch(actionToDispatch)

    }
    
    
 
  }

  stateChange = (stateToChange, value) => {
    this.state[stateToChange] = value;
   
  };

  

  render() {
    
    return (
        
        <View  style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
          <View style={styles.container}>
               
                <View style={styles.headerContainer}>
                    <Header 
        
                    selected={false}
                    titulo={"Añadir contacto"} 
                    name={"keyboard-backspace"} 
                    actionIcon={()=>{this.props.navigation.goBack()}}
                    
                        
                    />
                    
                </View>
                <ScrollView style={[styles.bodyContainer]}>
                <View style={{alignSelf:"center",width:"95%"}}>

                    <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>

                    <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20,marginBottom:20}}>
                        <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Nombre *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactName"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={""}
                                            iconType={"material-icons"}
                                            iconName={"person"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20,}}>
                        <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Dirección *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactDir"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={this.state.contactDir}
                                            iconType={"material-icons"}
                                            iconName={"add-location"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                        <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Correo *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactEmail"}
                                            stateChange={this.stateChange}
                                            type={"email-address"}
                                            value={this.state.contactEmail}
                                            iconType={"material-icons"}
                                            iconName={"email"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                        <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Telefono *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactPhone"}
                                            stateChange={this.stateChange}
                                            type={"phone-pad"}
                                            value={this.state.contactPhone}
                                            iconType={"material-icons"}
                                            iconName={"phone"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                        <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Observación"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactObs"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={this.state.contactObs}
                                            iconType={"material-icons"}
                                            iconName={"short-text"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    </View>
                
                   
                    <View style={{marginTop:10,marginBottom:30}}>
                    <ButtonCircle text={"Añadir"} size={"50%"} action={this.addContact}></ButtonCircle>
                    </View>

                </View>
                
                
                
                </ScrollView>
                
                
            </View>
            </KeyboardAvoidingView>
          
        </View>

        
    
    );
  }
}

const styleCreateOpportunity = StyleSheet.create({
    card:{
        borderRadius: 5,
        
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        backgroundColor: '#fff', 
        elevation: 5,
        paddingLeft:5
    }
})
