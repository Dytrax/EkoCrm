import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Picker,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
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
const  data = [{
    value: 'Banana', 
  }, {
    value: 'Mango',
  }, {
    value: 'Pear',
  }];

   const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'TabCRM' })],
  });  
  
 class AddContact extends Component{
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
      componentWillMount(){
        let _country = this.props.navigation.getParam("country");
        console.log(_country)
        _country = _country["countries"].map(s=>{
            return {
                value:s.name,
                code:s.code
            }
        })
        console.log("_country")
        console.log(_country)
        //this.state.var=_country
         this.setState({
            
            country:_country,
            
        }) 
       
        console.log("country Add contact")
        console.log(_country)
        console.log("estado")
        console.log(this.state.country)
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
        //let answer = await API.PostData(token,URL_ADD_CONTACTS,bodyJson)
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

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                    <Header 
                    showSearch={false}
                    titulo={"Añadir Contacto"} 
                    name={"keyboard-backspace"}  
                    actionIcon={()=>{this.props.navigation.goBack(null)}} 
                    
                    />
                    
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.subcontainer}>
            <View style={styles.subcontainer}>
                
            <View style={styles.body}>
                <MyDropDown size={80} label={"Pais*"} datos={this.state.country} getData={this.countrySelectedAndGetDepartments}></MyDropDown>
                <MyDropDown size={130} label={"Departamento*"} datos={this.state.departments} getData={this.departmentSelectedAndGetTown}></MyDropDown>
                <MyDropDown size={110} label={"Ciudad*"} datos={this.state.towns} getData={this.townSelected}></MyDropDown>

                <InputComponent 
                texto={"Nombre"} 
                mensajeError={"Campo Requerido"} 
                state={"contactName"}
                stateChange={this.stateChange}
                type={"default"}
                
                />
                <InputComponent 
                texto={"Dirección"} 
                mensajeError={"Campo Requerido"} 
                state={"contactDir"}
                stateChange={this.stateChange}
                type={"default"}
                />
                <InputComponent 
                texto={"Email"} 
                mensajeError={"Campo Requerido"} 
                state={"contactEmail"}
                stateChange={this.stateChange}
                type={"email-address"}
                />
                <InputComponent 
                texto={"Teléfono"} 
                mensajeError={"Campo Requerido"} 
                state={"contactPhone"}
                stateChange={this.stateChange}
                type={"numeric"}
                />
                <InputComponent 
                texto={"Observación"} 
                mensajeError={"Campo Requerido"} 
                state={"contactObs"}
                stateChange={this.stateChange}
                type={"default"}
                />
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <MyDropDown size={80} label={"Pais*"} datos={this.state.country} getData={this.countrySelectedAndGetDepartments}></MyDropDown>
                    <MyDropDown size={130} label={"Departamento*"} datos={this.state.departments} getData={this.departmentSelectedAndGetTown}></MyDropDown>
                    <MyDropDown size={110} label={"Ciudad*"} datos={this.state.towns} getData={this.townSelected}></MyDropDown>
                </View>
                <ButtonCircle text={"Añadir"} size={100} action={this.addContact}></ButtonCircle>
                
             
              
            
            
            </View>
                 

           
            </View>
            </KeyboardAvoidingView>
            
            
            </View> 
        )
    }
}

export default withNavigation(AddContact)