import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
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
const URL_ADD_CLIENTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/clients`
import Icon2 from "react-native-vector-icons/MaterialIcons";
import AssignContacts from "./assignClientScreen"


import { withNavigation, StackActions,NavigationActions } from "react-navigation";

const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: "TabCRM",
        action: NavigationActions.navigate({
          routeName: "Tab2",
        })
      }),
    ]
});
export default class EditClientV2 extends Component{
    constructor(){
        super()
        this.state = {
            contactName:"",
            contactNumberDocument:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
            contactChecked:"",
            ciuu:"",
            description:"",
            showModal:false,
            searchBarContacts:false,
            idContactToEdit:""
        }
    }
    componentDidMount = () => {
        this.setState({
            documentId:data.documentTypeId,
            contactChecked:data.contactChecked,
            copyDataContactsList:data.contactsList,
            contactsList:data.contactsList,
            idContactToEdit:data.editContactData.id
        })
    }
    stateChange = (stateToChange, value) => {
        this.state[stateToChange] = value;
    };

    typeDocumentSelected = (data) => {  
        this.setState({documentId:data.code})
    }

    contactsAssign = (data) => {
        this.setState({contactChecked:data})
    }

    goBackModalAction = () => {
        this.setState({showModal:false})
    }

    assignContacts = () => {
        this.setState({
            showModal:true
        })
    }

    searchContactList = (text) =>{
        let barText = text  
        let datos = this.state.copyDataContactsList.filter(
            s=>{
                return s.name.toUpperCase().search(text.toUpperCase()) != -1
            }
        )
        if (barText.length>0){
            this.setState({
                searchBarContacts:true,
                contactsList:datos
            })
        }else{
            this.setState({
                searchBarContacts:false,
                contactsList:datos
            })
        }
    }

    editClient = async () => {
        if (this.state.ciuu.length>7){
            {
                Alert.alert(
                    'El campo CIUU máximo permite 7 digitos'
                 )

            }
        }
    
        if (!this.state.contactDir || !this.state.documentId || 
            !this.state.contactNumberDocument ||
            !this.state.contactEmail || !this.state.contactName || 
            !this.state.contactObs || !this.state.contactPhone){
                Alert.alert(
                    'Todos los campos deben ser completados'
                 )

            }
        else{
            let bodyJson = {
            

                address:this.state.contactDir,
                assignmentId: null,
                categoryId: null,
                ciuu: this.state.ciuu,
                contacts:this.state.contactChecked,
                description: this.state.description,
                documentTypeId:this.state.documentTypeId,
                document_number:this.state.contactNumberDocument,
                email:this.state.contactEmail,
                latitude:0,
                longitude:0,
                name:this.state.contactName,
                observations:this.state.contactObs,
                phone:this.state.contactPhone,
                townId: null,
                type: null
                /* townId:this.state.townId, */
            }
    
            const token = await DB.getData("token");
            console.log("URL")
            console.log(URL_ADD_CLIENTS+"/"+this.state.idContactToEdit)
            let answer = await API.PutData(token,URL_ADD_CLIENTS+"/"+this.state.idContactToEdit,bodyJson)
            console.log(answer)
            this.props.navigation.dispatch(actionToDispatch)

        }
        

        
      }
     
    printState = () => {
        console.log(this.state)
    }  
          
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam('data', 'false');
        return(

            <View  style={styles.container}>  
            <AssignContacts
                searchBarContacts={this.state.searchBarContacts}
                searchContactList={this.searchContactList}
                show={this.state.showModal}
                goBack={this.goBackModalAction}
                data={[this.state.contactsList,this.state.contactChecked
                ]}
                chageState={this.contactsAssign}
            />
            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        selected={false}
                        titulo={"Editar Cliente"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.navigation.goBack()}}
                       

                        />
                        
                    </View>
                
                    
                    <ScrollView keyboardShouldPersistTaps="handled"
                        keyboardDismissMode='on-drag' style={[styles.bodyContainer]}>
                        
                            
                        
                        
                        <View style={{width:"95%",alignSelf:"center",}}>
                            
                            <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>
                            <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Nombre"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactName"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={data.editContactData.name}
                                            iconType={"font-awesome"}
                                            iconName={"industry"}
                                            iconSize={20}
                                            
                                            />
                            </View>

                            <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            
                                <MyDropDown size={"90%"}
                                            title={"Tipo de documento *"}
                                            data={data.typeDocument}
                                            selectedAction={this.typeDocumentSelected}
                                            value={data.userDocumentId}
                                        />
                                <View style={{marginBottom:15}}/>
                            
                            
                            <InputComponent 
                                                
                                            width={"100%"}
                                            texto={"No Documento *"} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"contactNumberDocument"}
                                            stateChange={this.stateChange}
                                            type={"phone-pad"}
                                            value={data.editContactData.document_number}
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
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={data.editContactData.address}
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
                                            stateChange={this.stateChange}
                                            type={"email-address"}
                                            value={data.editContactData.email}
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
                                            stateChange={this.stateChange}
                                            type={"phone-pad"}
                                            value={data.editContactData.phone}
                                            iconType={"MaterialIcons"}
                                            iconName={"phone"}
                                            iconSize={25}
                                            
                                            />
                        </View>
                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            <InputComponent 
                                            ciuu={true}
                                            width={"100%"}
                                            texto={"Codigo CIIU "} 
                                            mensajeError={"Error máximo 7 numeros"} 
                                            state={"ciuu"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={String(data.editContactData.ciuu)}
                                            iconType={"MaterialIcons"}
                                            iconName={"confirmation-number"}
                                            iconSize={25}
                                            
                                            />
                        </View>
                        <View style={{justifyContent: "center",
                            alignItems:"center",marginBottom:20}}>
                            <InputComponent 
                                            
                                            width={"100%"}
                                            texto={"Descripción codigo CIIU "} 
                                            mensajeError={"Campo Requerido"} 
                                            state={"description"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={data.editContactData.description}
                                            iconType={"FontAwesome5"}
                                            iconName={"comment"}
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
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={data.editContactData.observations}
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
                                        <Text style={{fontSize:22}}>{this.state.contactChecked.length}</Text>
                                    </View>
                            </View>
                        </View>
                           
                           <View style={{marginTop:10,marginBottom:30}}>
                                <ButtonCircle text={"Editar"} size={"50%"} action={this.editClient}></ButtonCircle>
                                <ButtonCircle text={"Editar"} size={"50%"} action={this.printState}></ButtonCircle>
                           </View>
                        </View>
                           

                    </ScrollView>
                    
                
                
                </View>
                </KeyboardAvoidingView>
            </View>
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