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
import InputComponent from '../../components/InputComponent';
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
      error:false
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
        townId:data.id
    })
  }

  addContact = async () => {
    let bodyJson = {
        address:this.state.contactDir,
        email:this.state.contactEmail,
        latitude:0,
        longitude:0,
        name:this.state.contactName,
        observations:this.state.contactObs,
        phone:this.state.contactPhone,
        townId:this.state.townId,
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

  render() {
    
    return (
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.show}
          onRequestClose={() => {
            this.props.back()
          }}>
          <View style={styles.container}>
               
                <View style={styles.headerContainer}>
                    <Header 
                    //showSearch={true}
                    selected={false}
                    titulo={"Añadir contacto"} 
                    name={"keyboard-backspace"} 
                    actionIcon={()=>{this.props.back()}} 
                    //state={this.state.searchBar}
                    //actionSearchBar={this.actionBar}
                        
                    />
                    
                </View>
                <View style={{alignSelf:"center",width:"90%"}}>
                    <MyDropDown size={"100%"} label={"Pais*"} datos={this.props.data} getData={this.countrySelectedAndGetDepartments}></MyDropDown>
                    <MyDropDown size={"100%"} label={"Departamento*"} datos={this.state.departments} getData={this.departmentSelectedAndGetTown}></MyDropDown>
                    <MyDropDown size={"100%"} label={"Ciudad*"} datos={this.state.towns} getData={this.townSelected}></MyDropDown>


                </View>
                
                <InputComponent 
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
                />
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <MyDropDown size={80} label={"Pais*"} datos={this.props.data} getData={this.countrySelectedAndGetDepartments}></MyDropDown>
                    <MyDropDown size={130} label={"Departamento*"} datos={this.state.departments} getData={this.departmentSelectedAndGetTown}></MyDropDown>
                    <MyDropDown size={110} label={"Ciudad*"} datos={this.state.towns} getData={this.townSelected}></MyDropDown>
                </View>
                <ButtonCircle text={"Añadir"} size={100} action={this.addContact}></ButtonCircle>
                {/* <View style={styles.subcontainer}>
                <View style={[styles.bodyContainer]}>
                    
                        
                </View>
                    
                </View> */}
                
            </View>
          
          
        </Modal>

        
    
    );
  }
}
