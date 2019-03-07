import React, {Component} from 'react';
import {Modal,
     Text, 
     TouchableHighlight, 
     View, 
     Alert,
    StyleSheet
} from 'react-native';

import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
//import InputComponent from '../../components/InputComponent';
import InputComponent from "../../components/inputComponentV2"
import MyDropDown from '../../components/dropDown';
import CONFIG from "../../../config/config"
import ButtonCircle from '../../components/buttonCircle';
import {withNavigation,StackActions,NavigationActions} from "react-navigation"
const URL_PICKERS = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries/`
const URL_ADD_CONTACTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts`
export default class ModalExample extends Component {
/*     <TouchableHighlight
                onPress={this.props.modalOff}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
  */

  /* componentDidMount(){
    console.log(this.props.data)
  } */
  constructor(props) {
    super(props);
    
    this.state = {
      contactName:"",
      contactDir:"",
      contactEmail:"",
      contactPhone:"",
      contactObs:"",
      country:"",
      departments:[],
      towns:[],
      townId:0,
      error:false,
      flag:false
    };
  }
  
  countrySelectedAndGetDepartments = async (data) =>{
    console.log("Country Selected")
    console.log(data)
    console.log(data.code)
    console.log(URL_PICKERS+data.code)
    let code = data.code
    const token = await DB.getData("token");
    let departments =  await API.getDataBackEnd(token,URL_PICKERS+code+"/departments")
    departments=departments.map(s=>{
        return {
            value:s.name,
            code:s.code
        }
    })

    this.setState({
        departments:departments
    }) 
    console.log("Respuesta after filter")
    console.log(this.state.departments)
  }

  departmentSelectedAndGetTown = async (data) =>{
    console.log("Department Selected")
    console.log(data)
    let code = data.code
    console.log(code)
    //console.log(URL_PICKERS+"departments/"+code+"/towns")
    const token = await DB.getData("token");
    
    let towns =  await API.getDataBackEnd(token,URL_PICKERS+"departments/"+code+"/towns")
    console.log("towns")
    console.log(towns)
    towns = towns.map(s=>{
        return{
            value:s.name,
            code:s.code,
            id:s.id
        }
    })
    
     this.setState({
        towns:towns
    }) 
    //console.log(towns)
    
  }

  townSelected = (data) => {
    
    console.log("Town Selected")
    console.log(data.id)
    this.setState({
        townId:data.id,
        flag:true
    })
  }


  addContact = async () => {
    let townId=""
    if(this.state.flag){
        townId = this.state.townId
    }else{
        townId = this.props.dataForm.townId
    }
    console.log("townId")
    console.log(townId)
    console.log("this.state")
    console.log(this.state)
      
    let bodyJson = {
        address:this.props.states.contactDir,
        email:this.props.states.contactEmail,
        latitude:0,
        longitude:0,
        name:this.props.states.contactName,
        observations:this.props.states.contactObs,
        phone:this.props.states.contactPhone,
        //townId:townId
    }
    
    const token = await DB.getData("token");
    //idContactToEdit
    let answer = await API.PutData(token,URL_ADD_CONTACTS+"/"+this.props.idContactToEdit,bodyJson)
    console.log(answer)
    this.setState({
        flag:false
    })
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

  /* countryValue = () => {
    console.log("Component Dropdown Country")
    console.log(this.props.data)
    console.log(this.props.dataForm)
    let data = this.props.data
    let filtroData = data
  } */

  render() {
    
    return (
        
        <Modal
          animationType="none"
          transparent={false}
          visible={this.props.show}
          onRequestClose={() => {
            this.props.back()
            this.props.initialState()
          }}>
          <View style={styles.container}>
               
                <View style={styles.headerContainer}>
                    <Header 
                    //showSearch={true}
                    selected={false}
                    titulo={"Editar Contacto"} 
                    name={"keyboard-backspace"} 
                    actionIcon={()=>{this.props.back()
                        this.props.initialState()}} 
                    //state={this.state.searchBar}
                    //actionSearchBar={this.actionBar}
                        
                    />
                    
                </View>
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
                {/* <InputComponent 
                texto={"Nombre"} 
                mensajeError={"Campo Requerido"} 
                state={"contactName"}
                stateChange={this.stateChange}
                type={"default"}
                value={this.props.dataForm.name}
                
                /> */}
                {/* <InputComponent 
                texto={"Dirección"} 
                mensajeError={"Campo Requerido"} 
                state={"contactDir"}
                stateChange={this.stateChange}
                type={"default"}
                value={this.props.dataForm.address}
                />
                <InputComponent 
                texto={"Email"} 
                mensajeError={"Campo Requerido"} 
                state={"contactEmail"}
                stateChange={this.stateChange}
                type={"email-address"}
                value={this.props.dataForm.email}
                />
                <InputComponent 
                texto={"Teléfono"} 
                mensajeError={"Campo Requerido"} 
                state={"contactPhone"}
                stateChange={this.stateChange}
                type={"numeric"}
                value={this.props.dataForm.phone}
                />
                <InputComponent 
                texto={"Observación"} 
                mensajeError={"Campo Requerido"} 
                state={"contactObs"}
                stateChange={this.stateChange}
                type={"default"}
                value={this.props.dataForm.observations}
                /> */}
                {/* <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <MyDropDown size={80} label={"Pais*"} datos={this.props.data} getData={this.countrySelectedAndGetDepartments} ></MyDropDown>
                    <MyDropDown size={130} label={"Departamento*"} datos={this.state.departments} getData={this.departmentSelectedAndGetTown}></MyDropDown>
                    <MyDropDown size={110} label={"Ciudad*"} datos={this.state.towns} getData={this.townSelected}></MyDropDown>
                </View> */}
                <View style={{marginTop:10,marginBottom:30}}>
                <ButtonCircle text={"Editar"} size={"50%"} action={this.addContact}></ButtonCircle>
                </View>
                </View>
                {/* <View style={styles.subcontainer}>
                <View style={[styles.bodyContainer]}>
                    
                        
                </View>
                    
                </View> */}
                
            </View>
          
          
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
