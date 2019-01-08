import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Picker,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    TextInput
} from 'react-native'
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
import MyDropDown from './dropDownPrueba';
import InputComponent from './inputPrueba';
import ButtonCircle from "../../components/buttonCircle"
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import CONFIG from "../../../config/config"
const URL_PICKERS = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries/`
const URL_ADD_CLIENTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/clients`
import Icon2 from "react-native-vector-icons/MaterialIcons";
import AssignContacts from "./assignClientScreen"
import { Input } from 'react-native-elements';
import IconGmail from "../../../assets/gmail.png"

export default class EditClientModal extends Component{
     constructor(props){
        super(props)
        
        this.state = {
            
            contactChecked:[],
            showModal:false,
            townsList:[],
            //countryList:props.data[0],
            //departmentName:props.departmentName,
            //townName:props.townName,
            //departmentsList:props.departmentsList,
            //townsList:props.townsList,
            //townId:props.townId,
            //documentTypeId:props.documentTypeId,
            contactNumberDocument:"",
            contactName:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
            

        }
    } 

    componentWillReceiveProps(nextProps) {
        console.log("OLLEEEEEEE")
        console.log(nextProps)
        if (nextProps.townsList !== this.state.townsList) {
          this.setState({ 
              townsList: nextProps.townsList

        
        });
        }
        if (nextProps.departmentsList !== this.state.departmentsList) {
            this.setState({ 
                departmentsList: nextProps.departmentsList,
            });
          }
        if (nextProps.countryList !== this.state.countryList) {
            this.setState({ countryList: nextProps.countryList});
          }
        if (nextProps.townId !== this.state.townId) {
            this.setState({ townId: nextProps.townId});
          }
        if (nextProps.townName !== this.state.townName) {
            this.setState({ townName: nextProps.townName});
          }
        if (nextProps.departmentName !== this.state.departmentName) {
            this.setState({ departmentName: nextProps.departmentName});
          }

        if (nextProps.documentTypeId !== this.state.documentTypeId) {
            this.setState({ documentTypeId: nextProps.documentTypeId});
          }
            
      }
    
     stateChange = (stateToChange, value) => {
        //console.log(this.state.var)
        //console.log(this.state.contactName)
        //console.log(stateToChange);
        //console.log(this.state)
        //console.log(value);
        this.state[stateToChange] = value;
       
        console.log("this.state.stateChange")
        console.log(this.state)
      }; 



    countrySelectedAndGetDepartments = async (data) =>{
        let code = data.code
        const token = await DB.getData("token");
        let departments =  await API.getDataBackEnd(token,URL_PICKERS+code+"/departments")
        //console.log(departments)
        departments=departments.map(s=>{
            return {
                value:s.name,
                code:s.code
            }
        })
        /* this.props.stateChange("departmentsList",departments) */
        
        this.setState({
            departmentsList:departments,
            departmentName:""
        }) 
        //console.log("this.state.departments")
        //console.log(this.state.departments)
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
        console.log("towns seleccionnnn ome")
        console.log(towns)
        /* this.props.stateChange("townsList",towns) */
         this.setState({
            
            townsList:towns,
            townName:""
        }) 
        console.log(this.state.townsList)
        
      }

      townSelected = (data) => {
        console.log("dataaaaaaaaaa")
        console.log(data)
        console.log("Town Selected")
        console.log(data.id)
        this.setState({
            townId:data.id,
            townName:data.value
        })
      }

      typeDocumentSelected = (data) => {
            this.setState({
                documentTypeId:data.code
            })
          console.log(data.code)
      }

      contactsAssign = (data) => {
        console.log(data)
        this.setState({
            contactChecked:data
        })
      }

        assignContacts = () => {
            this.setState({
                showModal:true
            })
        }

        goBackModalAction = () => {
            this.setState({
                showModal:false,
                
            })
        }
        
        editClient = async () => {
            

            let bodyJson = {
                

                address:this.state.contactDir,
                contacts:this.state.contactChecked,
                documentTypeId:this.state.documentTypeId,
                document_number:this.state.contactNumberDocument,
                email:this.state.contactEmail,
                latitude:0,
                longitude:0,
                name:this.state.contactName,
                observations:this.state.contactObs,
                phone:this.state.contactPhone,
                townId:this.state.townId,
            }
            
            console.log(bodyJson)
            const token = await DB.getData("token");
            let answer = await API.PutData(token,URL_ADD_CLIENTS+"/"+this.props.idContactToEdit,bodyJson)
            console.log("answer")
            console.log(answer)
            //Falta hacer las validaciones
            //this.props.navigation.dispatch(resetAction)
            
            //this.props.navigation.navigate('Tab1')
            //console.log(answer)
            this.props.modalOff()
          }

          
    render(){
        console.log("aquin--------andres")
        console.log(this.props)
        
        return(

            <Modal
            visible={this.props.show}
            animationType='slide'
            onRequestClose={() => { this.props.goBack() } }
            >  
            <AssignContacts
                show={this.state.showModal}
                goBack={this.goBackModalAction}
                data={[this.props.data[2],this.state.contactChecked]}
                chageState={this.contactsAssign}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        selected={false}
                        titulo={"Editar Cliente"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.goBack()}} 
                       
                        />
                        
                    </View>
                
                    
                    <ScrollView keyboardShouldPersistTaps="handled"
                keyboardDismissMode='on-drag' style={[styles.bodyContainer]}>
                        
                            
                        
                        
                        <View style={{width:"80%",alignSelf:"center",}}>
                        <View style={{marginBottom:20}}>

                            
                                <MyDropDown size={"100%"}
                                    title={"Pais"}
                                    data={this.state.countryList}
                                    selectedAction={this.countrySelectedAndGetDepartments}
                                    value={this.props.data[3].countryName}
                                />
                                <MyDropDown size={"100%"}
                                    title={"Departamento"}
                                    data={this.state.departmentsList}
                                    selectedAction={this.departmentSelectedAndGetTown}
                                    
                                    
                                    value={this.state.departmentName}
                                />
                                
                                <MyDropDown size={"100%"}
                                    title={"Ciudad"}
                                    data={this.props.townsList}
                                    selectedAction={this.townSelected}
                                    value={this.state.townName}
                                    
                                />
                                
                                <MyDropDown size={"100%"}
                                        title={"Tipo de documento"}
                                        data={this.props.data[1]}
                                        selectedAction={this.typeDocumentSelected}
                                        value={this.props.userDocumentId}
                                    />
                            </View>
                            

                            
                            <View style={{marginBottom:20}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"No Documento"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"contactNumberDocument"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={this.props.data[3].document_number}
                                        iconType={"font-awesome"}
                                        iconName={"id-card"}
                                        iconSize={25}
                                        />
                            </View>
                            
                        <View style={{marginBottom:20}}>
                        <InputComponent 
                                    width={"100%"}
                                    texto={"Nombre"} 
                                    mensajeError={"Campo Requerido"} 
                                    state={"contactName"}
                                    stateChange={this.stateChange}
                                    type={"default"}
                                    value={this.props.data[3].name}
                                    iconType={"font-awesome"}
                                    iconName={"industry"}
                                    iconSize={20}
                                    
                                    />
                                    </View>
                            
                            
                           <View style={{marginBottom:20}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Dirección"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"contactDir"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={this.props.data[3].address}
                                        iconType={"material-icons"}
                                        iconName={"add-location"}
                                        iconSize={25}
                                        
                                        />
                           </View>
                           <View style={{marginBottom:20}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Email"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"contactEmail"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={this.props.data[3].email}
                                        iconType={"MaterialIcons"}
                                        iconName={"email"}
                                        iconSize={25}
                                        
                                        />
                           </View>
                           <View style={{marginBottom:20}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Telefono"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"contactPhone"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={this.props.data[3].phone}
                                        iconType={"MaterialIcons"}
                                        iconName={"phone"}
                                        iconSize={25}
                                        
                                        />
                           </View>
                           <View >
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Observación"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"contactObs"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={this.props.data[3].observations}
                                        iconType={"Foundation"}
                                        iconName={"comment"}
                                        iconSize={25}
                                        
                                        />
                           </View>

                           <View style={{width:"75%",flexDirection:"row",marginTop:30,justifyContent:"center",alignItems:"center"}}>
                               
                               <View style={{marginRight:40}}>
                                   <Text>Asignar Contactos</Text>
                               </View>
                               <View style={{justifyContent:"flex-end"}}>
                                   <Icon2 name={"add-circle"} size={40} onPress={this.assignContacts}/>
                               </View>
                           </View>
                           {/* <Input
                                autoGrow = {false}
                                style={{height:10,maxHeight:1}}
                                placeholder='INPUT WITH ICON'
                                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                /> */}
                            

                            {/* <InputComponent 
                                        width={"100%"}
                                        texto={"Observación"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"contactObs"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={this.props.data[3].observations}
                                        iconType={"Foundation"}
                                        iconName={"comment"}
                                        iconSize={25}
                                        
                                        /> */}

                           
                           <View style={{marginTop:30,marginBottom:30}}>
                                <ButtonCircle text={"Añadir"} size={"100%"} action={this.editClient}></ButtonCircle>
                           </View>
                        </View>
                           
                           
                           
                            
                        
                            
                            
                            
                            
                            

                            
                    </ScrollView>
                    
                
                
                </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}