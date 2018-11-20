import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
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
    actions: [NavigationActions.navigate({ routeName: 'Tab2' })],
  });


  const stateName = {
    0:"Desactivado",
    1:"Activo",
    2:"Exitosa",
    3:"No exitosa"
}
export default class ClientScreen extends Component{
    
    constructor(){
        super()
        
        this.state={


            dataOpportunitiesList:[],
            copyDataOpportunitiesList:[],
            loadingData:true,
            searchBar:false,
            title:"",
            observations:"",
            dataClientList:[],
            productsChecked:[],
            showModalAssignProduct:false,
            showModalAddOpportunity:false,
            dataProductsList:[],
            editContactData:[],
            
            
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
    addOpportunity = () =>{
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

    clientSelected =  (data) =>{

        console.log(data)
        /* let code = data.code
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
        })  */
        //console.log("this.state.departments")
        //console.log(this.state.departments)
      }

      

    /* componentWillReceiveProps(nextProps) {
        
        if (nextProps.showModalAssignProduct !== this.state.showModalAssignProduct) {
          this.setState({ 
            showModalAssignProduct: nextProps.showModalAssignProduct

        
        });
        }
        
            
      } */

    render(){
        console.log(this.state)
        return(
            <View style={styles.container}>
                <OpportunityModal states={this.state} goBack={this.goBackModalAction}
                    stateChange={this.stateChange} clientSelected={this.clientSelected}
                    
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
                                
                            />
                            <FloatButton add={this.addOpportunity}/>
                            
                            
                            
                            
                        </View>
                        
                        
                        )}   

                        
                </View>
                    
                </View>
                
            </View>
        )
    }
}
