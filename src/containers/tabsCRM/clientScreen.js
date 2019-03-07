import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button
} from 'react-native';
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import CONFIG from "../../../config/config"
import ClientList from '../../components/crmClients/clientList';
import FloatButton from '../../components/floatButton';
import { withNavigation, StackActions,NavigationActions } from "react-navigation";

const URL = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/clients`
const URL_DOCUMENTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/documents`
const URL_CONTACTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts/`
const URL_TYPE_CLIENTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_IMAGE}/${CONFIG.VERSION_API_IMAGE}/companies/types_clients`
//const URL_COUNTRIES = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries`
//const URL_PICKERS = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries/`

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab2' })],
  });

export default class ClientScreen extends Component{
    
    constructor(){
        super()
        this.state={
            editContactData:[],
            
            loadingData:true,
            dataClientList:[],
            copyDataClientList:[],
            searchBar:false,
            showModal:false,
            showEditModal:false,
            
            typeDocument:[],
            contactsList:[],
            userDocumentId:"",
    
            documentTypeId:"",

            idContactToEdit:"",

            

            //AddClient
            contactChecked:[],
            documentId:"",
            contactNumberDocument:"",
            contactName:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
            searchBarContacts:false,
            type_clients:""
        }
    }
    removeDuplicates = ( arr, prop ) => {
        var obj = {};
        for ( var i = 0, len = arr.length; i < len; i++ ){
          if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
        }
        var newArr = [];
        for ( var key in obj ) newArr.push(obj[key]);
        return newArr;
      }

    initialState = () => {
        
        this.setState({
            contactChecked:[],
            documentId:"",
            contactNumberDocument:"",
            contactName:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
            
           
            
        })
    }

    

    async componentDidMount(){
        const token = await DB.getData("token");
        //console.log(token);
        let answer = await API.getDataBackEnd(token,URL)
        /* answer = this.removeDuplicates(answer,'id') */
        console.log("answer backend")
        console.log(answer)

        /* let country =  await API.getDataBackEnd(token,URL_COUNTRIES)
            country = country["countries"].map(s=>{
                return {
                    value:s.name,
                    code:s.code
                }
            }) */
            //console.log(country)

            let type_clients = await API.getDataBackEnd(token,URL_TYPE_CLIENTS)
            console.log("type_clients")
            console.log(type_clients.types)
            type_clients = type_clients.types.map(s=>{
                return {
                    value:s.name,
                    code:s.id
                }
            })
            console.log("type_clients")
            console.log(type_clients)
            let documents = await API.getDataBackEnd(token,URL_DOCUMENTS)
            documents = documents.map(s=>{
                return {
                    value:s.name,
                    code:s.id
                }
            })

            let contacts = await API.getDataBackEnd(token,URL_CONTACTS)
            contacts = contacts.map(s=>{
                return {
                    
                    id:s.id,
                    name:s.name,
                    email:s.email
                }
            }).sort((a,b)=> {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              } )
            
        
        if(answer!=false){
            
            let dataClientList = answer.map(data=>{
                return{
                    id:data.id,
                    name:data.name,
                    phone:data.phone,
                    email:data.email,
                    //townId:data.town.id,
                    //townName:data.town.name,
                    //countryName:data.town.department.country.name,
                    //countryCode:data.town.department.country.code,
                    //departmentName:data.town.department.name,
                    //departmentCode:data.town.department.code,
                    ciuu:data.ciuu,
                    description:data.description,
                    type:data.type,
                    documentTypeId:parseInt(data.documentTypeId),
                    document_number:data.document_number,
                    observations:data.observations,
                    address:data.address,
                    crm_contacts_assign:data.crm_contacts.map(value => value.id)
                }
            }).sort((a,b)=> {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              } )
            console.log("dataClientList")
            console.log(dataClientList)

            this.setState({
                
                loadingData:false,
                dataClientList:dataClientList,
                copyDataClientList:dataClientList,
                //countryList:country,
                typeDocument:documents,
                contactsList:contacts,
                copyDataContactsList:contacts,
                type_clients:type_clients
            })
        }else{
            this.setState({
                contactsList:contacts,
                typeDocument:documents,
                loadingData:false
            })
        }
        
    }

    


    stateChange = (stateToChange, value) => {

        this.state[stateToChange] = value;
       
        console.log("this.state.stateChange")
        console.log(this.state)
      }; 
    
    searchMethods = (text) =>{
        let barText = text

        
        let datos = this.state.copyDataClientList.filter(
            
            s=>{
                return s.name.toUpperCase().search(text.toUpperCase()) != -1
            }
            
        )
        
        if (barText.length>0){
            this.setState({
                searchBar:true,
                dataClientList:datos
            })
        }else{

            this.setState({
                searchBar:false,
                dataClientList:datos
            })
        }
        
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

    addClient = () => {
        this.setState({
            showModal:true
        })
    }

    goBackModalAction = () => {
        this.setState({
            showModal:false,
            showEditModal:false
        })
    }

    /* editClient = async (item) => {
        //console.log("item Selected")
        //console.log(item)
        
        let filtroData = this.state.dataClientList.filter(n=>n.id===item.id)
        console.log(filtroData)
        const token = await DB.getData("token");
        let departments =  await API.getDataBackEnd(token,URL_PICKERS+filtroData[0].countryCode+"/departments")
        departments=departments.map(s=>{
            return {
                value:s.name,
                code:s.code
            }
        })
        console.log(departments)
        let towns =  await API.getDataBackEnd(token,URL_PICKERS+"departments/"+filtroData[0].departmentCode+"/towns")
        towns = towns.map(s=>{
            return{
                value:s.name,
                code:s.code,
                id:s.id
            }
        })
        
        console.log(towns)
        console.log(towns[0])
        console.log(this.state.typeDocument)
        let userDocumentId=0
        if (filtroData[0].documentTypeId===1){
             userDocumentId = this.state.typeDocument[0].value
        }else{
             userDocumentId = this.state.typeDocument[1].value
        }
        console.log(userDocumentId)
        console.log("documentTypeId")
        console.log(filtroData[0].documentTypeId)
        this.setState({
            contactChecked:item.crm_contacts_assign,
            showEditModal:true,
            editContactData:filtroData[0],
            departmentsList:departments,
            townsList:towns,
            userDocumentId:userDocumentId,
            townId:filtroData[0].townId,
            townName:filtroData[0].townName,
            departmentName:filtroData[0].departmentName,
            documentTypeId:filtroData[0].documentTypeId,
            idContactToEdit:filtroData[0].id
        })
    } */

    modalOff = () => {
        this.setState({
            showModal:false,
            showEditModal:false
        })
        this.props.navigation.dispatch(resetAction)
    }

    
    addClientV2 = () => {
        data = {
            typeDocument : this.state.typeDocument,
            contactsList : this.state.contactsList,
            type_clients: this.state.type_clients
        }
        this.props.navigation.navigate('CreateClient', {
            data: data
          });
    }

    editClientV2 = (item) => { 
        let filtroData = this.state.dataClientList.filter(n=>n.id===item.id)
        console.log(filtroData)
        let userDocumentId=0

        if (filtroData[0].documentTypeId===1){
             userDocumentId = this.state.typeDocument[0].value
        }else{
             userDocumentId = this.state.typeDocument[1].value
        }
        data = {
            contactChecked:item.crm_contacts_assign,
            editContactData:filtroData[0],
            userDocumentId:userDocumentId,
            documentTypeId:filtroData[0].documentTypeId,
            typeDocument:this.state.typeDocument,
            contactsList : this.state.contactsList,
            type_clients: this.state.type_clients,
            
        }
        this.props.navigation.navigate('EditClient', {
            data: data
          });
    }
    



    render(){
        return(
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    selected={false}
                    titulo={"Clientes"} 
                    name={"menu"} 
                    actionIcon={()=>this.props.navigation.openDrawer()}
                    state={this.state.searchBar}
                    actionSearchBar={this.searchMethods}

                    />

                    
                    
                </View>

                <View style={styles.subcontainer}>
                <View style={[styles.bodyContainer]}>
                    {this.state.loadingData ? (
                        
                        <View style={[styles.body,styles.indicator]}>
                            <ActivityIndicator size="large" color="#ff0050" />
                        </View>
                        ) : (
                        
                        <View style={styles.body}>
                            
                            <ClientList clientList={this.state.dataClientList}  editClient={this.editClientV2}/>
                            <FloatButton add={this.addClientV2}/>
                            
                            
                            
                        </View>
                        
                        
                        )}   

                        
                </View>
                    
                </View>
                
            </View>
        )
    }
}
