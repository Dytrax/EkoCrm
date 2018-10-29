import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    
} from 'react-native';
import styles from "./styleCRM.js"
import Header from "../../components/headerComponent"
import ContactList from "../../components/contactList"
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import CONFIG from "../../../config/config"
const URL = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts`
const list = [
    {
        title: 'Avengers',
        year: '2012',
        rating: 5 + " Estrellas",
        key: '1',
    },
    {
        title: 'Pokemon',
        year: '2000',
        rating: 3 + " Estrellas",
        key: '2',
    },
    {
        title: 'Carlos El caga montes',
        year: '2015',
        rating: 2 + " Estrellas",
        key: '3',
    },
    {
        title: 'Carlos El caga montes 2',
        year: '2020',
        rating: 5 + " Estrellas",
        key: '4',
    }
    
]
export default class ContactScreen extends Component{
    constructor(){
        super()
        this.state = {
            searchBar:false,
            copyDataSource: [],
            dataSource: [],
            loadingData: false,
        }
    }

    async componentWillMount(){
        const token = await DB.getData("token");
        //Getting "La Información de Solicitudes" from the BackendApi
        const answer = await API.getDataBackEnd(token,URL)
        console.log(answer)
        if(answer!=false){
            let openRequest = answer.map(s=>{
                console.log(s.email)
                console.log(s.town.name)
                return {
                    id:s.id,
                    name:s.name,
                    email:s.email,
                    phone:s.phone,
                    townName:s.town.name
                    
                }
            })
             this.setState({
                dataSource:openRequest
            }) 
            console.log("openRequest")
            console.log(openRequest)
        }else{

        }
        console.log(answer);
    }

    actionBar = (text) =>{
        let barText = text
        let datos = this.state.copyDataSource.filter(
            
            s=>{
                return s.companyName.toUpperCase().search(text.toUpperCase()) != -1
            }
            
        )
        
        if (barText.length>0){
            this.setState({
                searchBar:true,
                dataSource:datos
            })
        }else{
            this.setState({
                searchBar:false,
                dataSource:datos
            })
        }
        
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    titulo={"Contactos"} 
                    name={"menu"} 
                    actionIcon={()=>this.props.navigation.openDrawer()}
                    state={this.state.searchBar}
                    actionSearchBar={this.actionBar}/>
                    
                </View>
                
                <View style={styles.subcontainer}>
                <View style={[styles.bodyContainer]}>
                    {this.state.loadingData ? (
                        <View style={[styles.body,styles.indicator]}>
                            <ActivityIndicator size="large" color="#ff0050" />
                        </View>
                        ) : (
                        <View style={styles.body}>    
                            <ContactList listContacts={this.state.dataSource}/>
                        </View>
                        )}   
                </View>
                    
                </View>
                
            </View>
        )
    }
}

