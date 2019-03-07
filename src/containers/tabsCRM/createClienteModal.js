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
    Alert
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
export default class CreateClientModal extends Component{
     constructor(){
        super()
        this.state = {
            contactChecked:[],
            showModal:false,
            departmentsList:[],
            townsList:[],
            townId:"",
            documentId:"",
            contactNumberDocument:"",
            contactName:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
            

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
        
        this.setState({
            departmentsList:departments
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
        
         this.setState({
            townsList:towns
        }) 
        console.log(this.state.townsList)
        
      }

      townSelected = (data) => {
        
        console.log("Town Selected")
        console.log(data.id)
        this.setState({
            townId:data.id
        })
      }

      typeDocumentSelected = (data) => {
        this.props.stateChange("documentId",data.code)
            /* this.setState({
                documentId:data.code
            })
          console.log(data.code) */
      }

      contactsAssign = (data) => {
        console.log(data)
        this.props.stateChange("contactChecked",data)
        /* this.setState({
            contactChecked:data
        }) */
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
        
        addClient = async () => {
            if (!this.props.states.contactDir || !this.props.states.contactChecked || 
                !this.props.states.documentId || !this.props.states.contactNumberDocument ||
                !this.props.states.contactEmail || !this.props.states.contactName || !this.props.states.contactObs ||
                !this.props.states.contactPhone){
                    Alert.alert(
                        'Todos los campos deben ser completados'
                     )
    
                }
            else{

                let bodyJson = {
                    address:this.props.states.contactDir,
                    contacts:this.props.states.contactChecked,
                    documentTypeId:this.props.states.documentId,
                    document_number:this.props.states.contactNumberDocument,
                    email:this.props.states.contactEmail,
                    latitude:0,
                    longitude:0,
                    name:this.props.states.contactName,
                    observations:this.props.states.contactObs,
                    phone:this.props.states.contactPhone,
                    //townId:this.state.townId,
                }
                
                const token = await DB.getData("token");
                let answer = await API.PostData(token,URL_ADD_CLIENTS,bodyJson)
                console.log(answer)
                //Falta hacer las validaciones
                //this.props.navigation.dispatch(resetAction)
                
                //this.props.navigation.navigate('Tab1')
                console.log(answer)
                this.props.modalOff()

            }
            
          }
    render(){
        return(

            <Modal
            visible={this.props.show}
            animationType="slide"
            onRequestClose={() => { this.props.goBack()
                this.props.initialState() } }
            >  
            <AssignContacts
                searchBarContacts={this.props.states.searchBarContacts}
                searchContactList={this.props.searchContactList}
                show={this.state.showModal}
                goBack={this.goBackModalAction}
                data={[this.props.data[2],this.props.states.contactChecked]}
                chageState={this.contactsAssign}
            />
            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        selected={false}
                        titulo={"Añadir Cliente"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.goBack()
                        this.props.initialState()}} 

                        />
                        
                    </View>
                
                    
                    <ScrollView keyboardShouldPersistTaps={"always"} style={[styles.bodyContainer]}>
                        
                            
                        
                        
                        <View style={{width:"95%",alignSelf:"center",}}>

                        <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>

                        <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Nombre"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactName"}
                                            stateChange={this.props.stateChange}
                                            type={"default"}
                                            value={""}
                                            iconType={"font-awesome"}
                                            iconName={"industry"}
                                            iconSize={20}
                                            
                                            />
                        </View>


                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            
                                <MyDropDown size={"90%"}
                                            title={"Tipo de documento *"}
                                            data={this.props.data[1]}
                                            selectedAction={this.typeDocumentSelected}
                                        />
                                <View style={{marginBottom:15}}/>
                            
                            
                            <InputComponent 
                                                
                                            width={"100%"}
                                            texto={"No Documento *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactNumberDocument"}
                                            stateChange={this.props.stateChange}
                                            type={"phone-pad"}
                                            value={""}
                                            iconType={"font-awesome"}
                                            iconName={"id-card"}
                                            iconSize={25}
                                                
                                                />
                        
                        </View>

                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Dirección *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactDir"}
                                            stateChange={this.props.stateChange}
                                            type={"default"}
                                            value={""}
                                            iconType={"material-icons"}
                                            iconName={"add-location"}
                                            iconSize={25}
                                            
                                            />
                        </View>
                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Email *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactEmail"}
                                            stateChange={this.props.stateChange}
                                            type={"email-address"}
                                            value={""}
                                            iconType={"MaterialIcons"}
                                            iconName={"email"}
                                            iconSize={25}
                                            
                                            
                                            />
                        </View>
                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Telefono *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactPhone"}
                                            stateChange={this.props.stateChange}
                                            type={"phone-pad"}
                                            value={""}
                                            iconType={"MaterialIcons"}
                                            iconName={"phone"}
                                            iconSize={25}
                                            
                                            
                                            />
                        </View>
                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Observación *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactObs"}
                                            stateChange={this.props.stateChange}
                                            type={"default"}
                                            value={""}
                                            iconType={"Foundation"}
                                            iconName={"comment"}
                                            iconSize={25}
                                            
                                            />
                        </View>
                        </View>
                        
                    

                           <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>
                            
                            <View style={{flexDirection:"row",}}>
                                    <View style={{marginRight:40,paddingTop:10}}>
                                        <Text>Asignar Contactos</Text>
                                    </View>
                                    <View style={{justifyContent:"flex-end"}}>
                                        <Icon2 name={"add-circle"} color={"#a3c51a"} size={40} onPress={()=>{this.assignContacts()}}/>
                                    </View>
                                    <View style={{alignSelf:"center",paddingLeft:30}}>
                                        <Text style={{fontSize:22}}>{this.props.states.contactChecked.length}</Text>
                                    </View>
                            </View>
                        </View>

                       

                           
                           <View style={{marginTop:30,marginBottom:30}}>
                           
                                <ButtonCircle text={"Añadir"} size={"50%"} action={this.addClient}></ButtonCircle>
                           </View>
                        </View>
                           
                           
                           
                            
                        
                            
                            
                            
                            
                            

                            
                    </ScrollView>
                    
                
                
                </View>
                </KeyboardAvoidingView>
            </Modal>
        )
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