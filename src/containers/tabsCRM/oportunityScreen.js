import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import CONFIG from "../../../config/config"
import ClientList from '../../components/crmClients/clientList';
import FloatButton from '../../components/floatButton';
import CreateClientModal from './createClienteModal';
import { withNavigation, StackActions,NavigationActions } from "react-navigation";
import EditClientModal from './editClientModal';
import OpportunityList from '../../components/crmOportunity/oportunityList';
import OpportunityModal from './createOpportunityModa';
const URL_CLIENTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/clients`
const URL_OPPORTUNITIES= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/oportunities`
const URL_PRODUCTS= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/products`
const URL_CONTACTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts/`
const URL_COUNTRIES = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries`
const URL_PICKERS = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries/`

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab3' })],
  });


  const stateName = {
    0:"Desactivado",
    1:"Activo",
    2:"Exitosa",
    3:"No exitosa"
}
export default class OpportunityScreen extends Component{
    
    constructor(){
        super()
        
        this.state={

            crmClientId:"",
            dataOpportunitiesList:[],
            copyDataOpportunitiesList:[],
            loadingData:true,
            searchBar:false,
            title:"",
            observations:"",
            dataClientList:[],
            productsChecked:[],
            description:"",
            showModalAssignProduct:false,
            showModalAddOpportunity:false,
            showModalCalendar:false,
            dataProductsList:[],
            editContactData:[],
            dateSelectedCalendar:"",
            dateSelectedCalendarToShow:"",
            //-----------------
            copyDataClientList:[],
            searchBar:false,
            
            showEditModal:false,
            countryList:[],
            departmentsList:[],
            townsList:[],
            typeDocument:[],
            contactsList:[],
            userDocumentId:"",
            townId:"",
            townName:"",
            departmentName:"",
            documentTypeId:"",

            idContactToEdit:""
        }
    }

    async componentDidMount(){
        const token = await DB.getData("token");
        
        const clients = await API.getDataBackEnd(token,URL_CLIENTS)
        const opportunities = await API.getDataBackEnd(token,URL_OPPORTUNITIES)
        const products = await API.getDataBackEnd(token,URL_PRODUCTS)
        console.log(products)
        
        if (opportunities!=false && products!=false && clients!=false){

            
            let dataOpportunitiesList = opportunities.map(data=>{
                return{
                    id:data.id,
                    title:data.title,
                    dateInit:data.dateInit,
                    crm_products:data.crm_products.length,
                    client:clients.filter(n=>n.id===data.crmClientId)[0].name,
                    opportunityState:stateName[data.state]
                }
            })
            //console.log(dataOpportunitiesList)

            let dataClientList = clients.map(s=>{
                return {
                    value:s.name,
                    code:s.id
                }
            })
            //console.log(dataClientList)
            let dataProductsList = products.map(s=>{
                return{
                    id:s.id,
                    name:s.name
                }
            })
            console.log("dataProductsList")
            console.log(dataProductsList)

            this.setState({
                loadingData:false,
                dataOpportunitiesList:dataOpportunitiesList,
                copyDataOpportunitiesList:dataOpportunitiesList,
                dataClientList:dataClientList,
                dataProductsList:dataProductsList
            })
           

        }
        
        
    }


    stateChange = (stateToChange, value) => {
        
        //this.state[stateToChange] = value;

        var  tmp = {}
        tmp[stateToChange] = value
        this.setState(tmp)
        
        //console.log("this.state.stateChange")
        //console.log(this.state)
      }; 
    
    searchMethods = (text) =>{
        let barText = text
        let datos = this.state.copyDataOpportunitiesList.filter(
            s=>{
                return s.title.toUpperCase().search(text.toUpperCase()) != -1
            }
        )
        if (barText.length>0){
            this.setState({
                searchBar:true,
                dataOpportunitiesList:datos
            })
        }else{
            this.setState({
                searchBar:false,
                dataOpportunitiesList:datos
            })
        }
        
    }

    
    //var date = new Date().toISOString()
    goAddOpportunity = () =>{
        this.setState({
            showModalAddOpportunity:true
        })
    }

    goBackModalAction = () => {
        this.setState({
            showModalAddOpportunity:false,
            //showEditModal:false
        })
    }

    addOpportunity = async () => {
        let bodyJson = {
            crmClientId: this.state.crmClientId,
            dateInit: new Date().toISOString(),
            dateInitActivity: this.state.dateSelectedCalendar,
            descriptions:this.state.description,
            observations:this.state.observations,
            products:this.state.productsChecked,
            title:this.state.title

        }
        console.log(bodyJson)
        const token = await DB.getData("token");
        let answer = await API.PostData(token,URL_OPPORTUNITIES,bodyJson)
        console.log(answer)
        //Falta hacer las validaciones
        this.props.navigation.dispatch(resetAction)
        
        //this.props.navigation.navigate('Tab1')
        //console.log(answer)
        //this.props.modalOff()
      }
    clientSelected =  (data) =>{

        console.log(data)
        console.log(data.code)
        this.stateChange("crmClientId",data.code)
        
       
      }

      deleteOpportunity = async (id) =>{
        const token = await DB.getData("token");
        let answer = await API.Delete(token,URL_OPPORTUNITIES+"/"+id)
        console.log("answer")
        console.log(answer)
        if (answer.status==204){
            this.props.navigation.dispatch(resetAction)
        }else{  
            console.log("No fue posible borrar")
            this.props.navigation.dispatch(resetAction)
        }
        
        
    }

      editOpportunity = (item) => {
        console.log(item)
      }

      askAgain = (id) =>{
        
        Alert.alert(
            '¿Quieres eliminar esta oportunidad?',
            'Este paso no se puede revertir',
            [
              
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Aceptar', onPress: () => this.deleteOpportunity(id)},
            ],
            { cancelable: false }
          )
        //this.props.navigation.dispatch(resetAction)
            
        
    }
      onLongPressOpportunity = (item) =>{
        
        Alert.alert(
            'Oportunidad Seleccionada',
            item.title,
            [
              {text: 'Editar', onPress: () => this.editOpportunity(item)},
              {text: 'Eliminar', onPress: ()=> this.askAgain(item.id)},
              {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
      
       }

      

    

    render(){
        console.log(this.state)
        return(
            <View style={styles.container}>
                <OpportunityModal states={this.state} goBack={this.goBackModalAction}
                    stateChange={this.stateChange} clientSelected={this.clientSelected}
                    addOpportunity={this.addOpportunity}
                    
                />
                
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    titulo={"Oportunidades"} 
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
                            
                            <OpportunityList OpportunityList={this.state.dataOpportunitiesList}
                             onLongPressOpportunity={this.onLongPressOpportunity}
                                
                            />
                            <FloatButton add={this.goAddOpportunity}/>
                            
                            
                            
                            
                        </View>
                        
                        
                        )}   

                        
                </View>
                    
                </View>
                
            </View>
        )
    }
}
