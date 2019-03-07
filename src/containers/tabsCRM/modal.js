import React, {Component} from 'react';
import {Modal,
     Text, 
     TouchableHighlight, 
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
import InputComponent from "../../components/inputComponentV2"
//import MyDropDown from '../../components/dropDown';
import MyDropDown from './dropDownPrueba'
import CONFIG from "../../../config/config"
import ButtonCircle from '../../components/buttonCircle';
import {withNavigation,StackActions,NavigationActions} from "react-navigation"
const URL_PICKERS = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries/`
const URL_ADD_CONTACTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts`
import { Dropdown } from 'react-native-material-dropdown';
export default class ModalExample extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
  
      country:"",

      townId:0,
      error:false,
      townName:"ALCALA",
      //departmentName:""
    };
  }
  
 
  townSelected = (data) => {
        
    console.log("Town Selected")
    console.log(data.id)
    this.setState({
        townId:data.id
    })
  }

  addContact = async () => {
    let bodyJson = {
        address:this.props.states.contactDir,
        email:this.props.states.contactEmail,
        latitude:0,
        longitude:0,
        name:this.props.states.contactName,
        observations:this.props.states.contactObs,
        phone:this.props.states.contactPhone,
        //townId:this.state.townId,
    }
    
    const token = await DB.getData("token");
    let answer = await API.PostData(token,URL_ADD_CONTACTS,bodyJson)
    console.log(answer)
    this.props.modalOff()
    //this.props.navigation.dispatch(resetAction)
    
    //this.props.navigation.navigate('Tab1')
    //console.log(answer)
  }

  stateChange = (stateToChange, value) => {
    console.log(this.state.var)
    //console.log(this.state.contactName)
    console.log(stateToChange);
    //console.log(this.state)
    //console.log(value);
    this.state[stateToChange] = value;
   
    console.log("this.state.stateChange")
    console.log(this.state)
  };

  /* componentWillReceiveProps(nextProps) {
    console.log("hskknkasnksnksa")
    if (nextProps.departmentName !== this.state.departmentName) {
        this.setState({ departmentName: nextProps.departmentName});
      }

    
        
  } */

  componentWillReceiveProps(nextProps){
    if(nextProps.departmentName!==this.props.departmentName){
      //Perform some operation
      this.props.stateChange("departmentName",nextProps.departmentName)
      //this.setState({someState: someValue });
      //this.classMethod();
    }
  }

  render() {
    
    return (
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.show}
          onRequestClose={() => {
            this.props.back()
            this.props.initialState()
          }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
          <View style={styles.container}>
               
                <View style={styles.headerContainer}>
                    <Header 
                    //showSearch={true}
                    selected={false}
                    titulo={"Añadir contacto"} 
                    name={"keyboard-backspace"} 
                    actionIcon={()=>{this.props.back()
                    this.props.initialState()}} 
                    //state={this.state.searchBar}
                    //actionSearchBar={this.actionBar}
                        
                    />
                    
                </View>
                <ScrollView style={[styles.bodyContainer]}>
                <View style={{alignSelf:"center",width:"95%"}}>

                    <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>

                    <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20,marginBottom:20}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Nombre *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactName"}
                                            stateChange={this.props.stateChange}
                                            type={"default"}
                                            value={this.props.states.contactName}
                                            iconType={"material-icons"}
                                            iconName={"person"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20,}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Dirección *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactDir"}
                                            stateChange={this.props.stateChange}
                                            type={"default"}
                                            value={this.props.states.contactDir}
                                            iconType={"material-icons"}
                                            iconName={"add-location"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Correo *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactEmail"}
                                            stateChange={this.props.stateChange}
                                            type={"email-address"}
                                            value={this.props.states.contactEmail}
                                            iconType={"material-icons"}
                                            iconName={"email"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Telefono *"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactPhone"}
                                            stateChange={this.props.stateChange}
                                            type={"phone-pad"}
                                            value={this.props.states.contactPhone}
                                            iconType={"material-icons"}
                                            iconName={"phone"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Observación"} 
                                            mensajeError={"Campo Requerido "} 
                                            state={"contactObs"}
                                            stateChange={this.props.stateChange}
                                            type={"default"}
                                            value={this.props.states.contactObs}
                                            iconType={"material-icons"}
                                            iconName={"short-text"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    </View>
                
                    {/* <MyDropDown size={"100%"} 
                    title={"Pais*"} 
                    data={this.props.data} 
                    selectedAction={this.props.countrySelectedAndGetDepartments}
                    ></MyDropDown>
                    
                    


                    <MyDropDown size={"100%"} 
                    title={"Departamento*"} 
                    data={this.props.states.departments} 
                    selectedAction={this.props.departmentSelectedAndGetTown}
                    value={this.props.departmentName}
                    ></MyDropDown>

                    <MyDropDown 
                    size={"100%"} 
                    title={"Ciudad*"} 
                    data={this.props.states.towns} 
                    selectedAction={this.townSelected}
                    value={this.state.townName}></MyDropDown> */}
                    <View style={{marginTop:10,marginBottom:30}}>
                    <ButtonCircle text={"Añadir"} size={"50%"} action={this.addContact}></ButtonCircle>
                    </View>

                </View>
                
                
                {/* <InputComponent 
                texto={"Nombre"} 
                mensajeError={"Campo Requerido"} 
                state={"contactName"}
                stateChange={this.stateChange}
                type={"default"}
                value={""}
                />
                <InputComponent 
                texto={"Dirección"} 
                mensajeError={"Campo Requerido"} 
                state={"contactDir"}
                stateChange={this.stateChange}
                type={"default"}
                value={""}
                />
                <InputComponent 
                texto={"Email"} 
                mensajeError={"Campo Requerido"} 
                state={"contactEmail"}
                stateChange={this.stateChange}
                type={"email-address"}
                value={""}
                />
                <InputComponent 
                texto={"Teléfono"} 
                mensajeError={"Campo Requerido"} 
                state={"contactPhone"}
                stateChange={this.stateChange}
                type={"numeric"}
                value={""}
                />
                <InputComponent 
                texto={"Observación"} 
                mensajeError={"Campo Requerido"} 
                state={"contactObs"}
                stateChange={this.stateChange}
                type={"default"}
                value={""}
                /> */}
                {/* <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <MyDropDown size={80} label={"Pais*"} datos={this.props.data} getData={this.countrySelectedAndGetDepartments}></MyDropDown>
                    <MyDropDown size={130} label={"Departamento*"} datos={this.state.departments} getData={this.departmentSelectedAndGetTown}></MyDropDown>
                    <MyDropDown size={110} label={"Ciudad*"} datos={this.state.towns} getData={this.townSelected}></MyDropDown>
                </View> */}
                
                </ScrollView>
                {/* <View style={styles.subcontainer}>
                <View style={[styles.bodyContainer]}>
                    
                        
                </View>
                    
                </View> */}
                
            </View>
            </KeyboardAvoidingView>
          
        </Modal>

        
    
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
