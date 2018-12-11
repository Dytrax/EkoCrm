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
import EditOpportunityModal from './editOpportunituModal';

const URL_CLIENTS = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/clients`
const URL_OPPORTUNITIES= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/oportunities`
const URL_PRODUCTS= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/products`
const URL_ACTIVITIES = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/activities`
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
        //this.state = this.initialState()
        this.state={
            fromCalendar:false,
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
            minDate: new Date(),
            
            //--------Edit Opportunities---------
            showModalEditOpportunity:false,
            itemToEdit:"",
            description_next_activity:"",
            copyminDate:"",
            drop:false
            
        }
    }
    initialState = () => {
        console.log("Aqui se incia su mamaa")
        console.log(this.state)
        this.setState({
            productsChecked:[],
            crmClientId:"",
            title:"",
            observations:"",
            description:"",
            dateSelectedCalendar:"",
            dateSelectedCalendarToShow:"",
            minDate: new Date(),
            
            //--------Edit Opportunities---------
            showModalEditOpportunity:false,
            itemToEdit:"",
            description_next_activity:"",
            copyminDate:""
            
        })
    }

     
      

    async componentDidMount(){
        const token = await DB.getData("token");
        
        const clients = await API.getDataBackEnd(token,URL_CLIENTS)
        const opportunities = await API.getDataBackEnd(token,URL_OPPORTUNITIES)
        const products = await API.getDataBackEnd(token,URL_PRODUCTS)
        console.log(products)
        
        if (opportunities!=false || products!=false || clients!=false){

            
            let dataOpportunitiesList = opportunities.map(data=>{
                return{
                    id:data.id,
                    title:data.title,
                    dateInit:data.dateInit,
                    crm_products:data.crm_products.length,
                    client:clients.filter(n=>n.id===data.crmClientId)[0].name,
                    opportunityState:stateName[data.state],
                    crm_activities:data.crm_activities
                    
                }
            })
            console.log("dataOpportunitiesList")
            console.log(dataOpportunitiesList)
            
            
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
                dataProductsList:dataProductsList,
                //crm_finish_activities:crm_finish_activities,
                //crm_inProcess_activities:crm_inProcess_activities,
                //minDateEditOpportunity
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

    onPressOpportunity = (item) => {
        console.log("item")
        console.log(item)
        let opportunityState = false
        if (item.opportunityState === "Exitosa"){
            opportunityState = true
        }
        let crm_finish_activities = item.crm_activities.filter(n=>n.state===0)
        console.log("crm_finish_activities")
        console.log(crm_finish_activities)
        let crm_inProcess_activities = item.crm_activities.filter(n=>n.state===1)
        console.log("crm_inProcess_activities")
        console.log(crm_inProcess_activities)
        console.log(crm_inProcess_activities.length)
        let descriptionOpportunity = ""
        let date = ""
        let crmOpportunityId = ""
        let activityId = ""
        if (crm_inProcess_activities.length != 0){
            
            descriptionOpportunity = crm_inProcess_activities[0].observations
            date = new Date(crm_inProcess_activities[0].dateInit);
            date = (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' +  date.getFullYear()
            crmOpportunityId = item.id
            activityId = crm_inProcess_activities[0].id
        }else{
            descriptionOpportunity = ""
            date = ""
            crmOpportunityId = ""
            activityId = ""
        }
        //console.log(crm_inProcess_activities[0].observations)
        //console.log(crm_inProcess_activities[0].dateInit)
        console.log("-------------------------------------")
        console.log(descriptionOpportunity)
        console.log(date)
        console.log(crmOpportunityId)
        console.log(activityId)
        this.stateChange("showModalEditOpportunity",true)
        this.stateChange("itemToEdit",item)
        this.setState({
            crm_finish_activities:crm_finish_activities,
            crm_inProcess_activities:crm_inProcess_activities,
            descriptionOpportunity:descriptionOpportunity,
            copyminDate:date,
            crmOpportunityId:crmOpportunityId,
            activityId:activityId,
            dateEnd: new Date().toISOString(),
            opportunityState: opportunityState,
        })
    }
      onLongPressOpportunity = (item) =>{
        
        Alert.alert(
            'Oportunidad Seleccionada',
            item.title,
            [
              
              {text: 'Eliminar', onPress: ()=> this.askAgain(item.id)},
              {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
      
       }

    successfulOpportunity = async () => {
        console.log(this.state.crmOpportunityId)
        let bodyJson = {
            state:2
        }
        const token = await DB.getData("token")
        console.log(URL_OPPORTUNITIES+'/'+ this.state.crmOpportunityId)
        let successfulOpportunityPatch = await API.successfulOpportunity(token,URL_OPPORTUNITIES+'/'+ this.state.crmOpportunityId,bodyJson)
        console.log(successfulOpportunityPatch)
        //this.props.navigation.dispatch(resetAction)
        console.log(successfulOpportunityPatch.status)
        
        if (successfulOpportunityPatch.status===412){
            this.setState({
                drop:true
            })
        
        }
    }
    
    back = async () => {
        let bodyJson = {
            activityId: this.state.activityId,
            crmOpportunityId: this.state.crmOpportunityId,
            dateEnd: this.state.dateEnd,
            dateInit:this.state.dateSelectedCalendar,
            descriptions: this.state.description_next_activity,       
        }
        
        this.props.navigation.dispatch(resetAction)
    }
    closeActivity = async () => {
        let bodyJson = {
            activityId: this.state.activityId,
            crmOpportunityId: this.state.crmOpportunityId,
            dateEnd: this.state.dateEnd,
            dateInit:this.state.dateSelectedCalendar,
            descriptions: this.state.description_next_activity,       
        }
        console.log("bodyJson")
        console.log(bodyJson)
        
        const token = await DB.getData("token");
        let closeActivityPost = await API.PostData(token,URL_ACTIVITIES,bodyJson)
        console.log("closeActivityPost")
        console.log(closeActivityPost)
        this.props.navigation.dispatch(resetAction)
    }

    

    render(){
        console.log(this.state)
        return(
            
            <View style={styles.container}>
            
                <OpportunityModal states={this.state} goBack={this.goBackModalAction}
                    stateChange={this.stateChange} clientSelected={this.clientSelected}
                    addOpportunity={this.addOpportunity}
                    initialState={this.initialState}
                    
                />

                <EditOpportunityModal states={this.state} goBack={this.goBackModalAction}
                    stateChange={this.stateChange} 
                    initialState={this.initialState}
                    closeActivity = {this.closeActivity}
                    successfulOpportunity = { this.successfulOpportunity}
                    backButton={this.back}
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
                            <FloatButton add={this.goAddOpportunity}/>
                        </View>
                        ) : (
                        
                        <View style={styles.body}>
                            
                            <OpportunityList OpportunityList={this.state.dataOpportunitiesList}
                             onLongPressOpportunity={this.onLongPressOpportunity}
                             onPressOpportunity={this.onPressOpportunity}
                                
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
