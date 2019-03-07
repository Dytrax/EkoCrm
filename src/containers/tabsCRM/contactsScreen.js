import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Button
} from 'react-native';
import styles from "./styleCRM.js"
import Header from "../../components/headerComponent"
import ContactList from "../../components/contactList"
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import CONFIG from "../../../config/config"
import EditModal from "./editModal"
import Modal from "./modal"
import { Overlay } from 'react-native-elements';

const URL_PICKERS = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries/`
const URL = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts`
const URL_COUNTRIES = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/countries`
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

import { withNavigation, StackActions,NavigationActions } from "react-navigation";
import FloatButton from '../../components/floatButton.js';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab1' })],
  });
let country="";
 class ContactScreen extends Component{
    static navigationOptions = {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            defaultHandler();
  
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Tab1' })],
            });
            navigation.dispatch(resetAction);
          },
    }

    constructor(){
        
        super()
        this.state = {
            searchBar:false,
            copyDataSource: [],
            dataSource: [],
            loadingData: true,
            isVisible: false,
            showModal:false,
            showEditModal:false,
            idContactToEdit:"",
            dataEditContact:[],
            country:"",


            ///ADD CONTACT
            departmentName:"",
            contactName:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
        }
    }

     
    async componentDidMount(){
        let mensaje = await DB.getData("Mensaje");
        console.log("Mensaje")
        console.log(mensaje)
        DB.store("Mensaje","false")
        const token = await DB.getData("token");
        //Getting "La Información de Solicitudes" from the BackendApi
        const answer = await API.getDataBackEnd(token,URL)
        
        
        
        
        console.log("answer")
        console.log(answer)
        if(answer!=false){
            let openRequest = answer.map(s=>{
                console.log(s.email)
                console.log(s.town.name)
                return {
                    id:s.id,
                    name:s.name,
                    address:s.address,
                    email:s.email,    
                    phone:s.phone,
                    observations:s.observations,
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
             this.setState({
                loadingData:false,
                dataSource:openRequest,
                copyDataSource:openRequest
            }) 
            console.log("Passeee")
            console.log("openRequest")
            console.log(openRequest)
        }else{
            this.setState({
                loadingData:false,
                
            })

        }
        
        console.log(answer);
    }

    initialState = () => {
        
        this.setState({
            departmentName:"",
            contactName:"",
            contactDir:"",
            contactEmail:"",
            contactPhone:"",
            contactObs:"",
           
           
            
        })
    }

    stateChange = (stateToChange, value) => {
        
        //this.state[stateToChange] = value;

        var  tmp = {}
        tmp[stateToChange] = value
        this.setState(tmp)
        
        //console.log("this.state.stateChange")
        //console.log(this.state)
      };

    actionBar = (text) =>{
        let barText = text
        let datos = this.state.copyDataSource.filter(
            
            s=>{
                return s.name.toUpperCase().search(text.toUpperCase()) != -1
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
    
    addContactV2 = () =>{
        this.props.navigation.navigate('CreateContact')
    }

    editContactV2 = (id) => {
        let filtroData = this.state.dataSource.filter(n=>n.id===id)
        data = {
            idContactToEdit:id,
            dataEditContact:filtroData[0]
        }
        this.props.navigation.navigate('EditContact', {
            data: data
          });
    }
    /* goToEdit = (id) => {
        console.log("hola")
        console.log("id Selected")
        console.log(id)
        console.log("this.state.dataSource")
        console.log(this.state.dataSource)
        let filtroData = this.state.dataSource.filter(n=>n.id===id)
        console.log("filtroData")
        console.log(filtroData)
        this.setState({
            showEditModal:true,
            idContactToEdit:id,
            contactName:filtroData[0].name,
            contactDir:filtroData[0].address,
            contactEmail:filtroData[0].email,
            contactPhone:filtroData[0].phone,
            contactObs:filtroData[0].observations,
            dataEditContact:filtroData[0]
        })
    } */
    modalOff_ = () => {
        this.setState({
            showModal:false,
            showEditModal:false
        })
        this.props.navigation.dispatch(resetAction)
    }

    backModalAction = () => {
        this.setState({
            showModal:false,
            showEditModal:false
        })
    }






    //Add Contact Logic
    //////////////////
    countrySelectedAndGetDepartments = async (data) =>{
        this.setState({
            departmentName:""
        }) 
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
            departments:departments,
            departmentName:""
        }) 
        console.log("Respuesta after filter")
        console.log(this.state.departments)
      }

      departmentSelectedAndGetTown = async (data) =>{
        
        console.log("Department Selected")
        console.log(data.value)
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
            departmentName:data.value,
            towns:towns,
            //townName:""
    
        }) 
        //console.log(towns)
        
      }


    render(){
        return(
            <View style={styles.container}>
                {/* <Modal 
                initialState  = {this.initialState}
                countrySelectedAndGetDepartments = {this.countrySelectedAndGetDepartments}
                departmentSelectedAndGetTown = {this.departmentSelectedAndGetTown}
                states = {this.state}
                show={this.state.showModal} 
                modalOff={this.modalOff_} 
                data={this.state.country} 
                back={this.backModalAction}
                departmentName={this.state.departmentName}
                stateChange={this.stateChange}
                /> */}
                
                {/* <EditModal 
                initialState = {this.initialState}
                states={this.state}
                show={this.state.showEditModal}
                back={this.backModalAction}
                dataForm={this.state.dataEditContact}
                data={this.state.country} 
                modalOff={this.modalOff_} 
                idContactToEdit={this.state.idContactToEdit}
                stateChange={this.stateChange}
                /> */}
                
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    selected={false}
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
                        
                            <ContactList listContacts={this.state.dataSource} editModal={this.editContactV2}/>
                            
                            <FloatButton add={this.addContactV2}/>
                            
                           
                            
                        </View>
                        
                        
                        )}   

                        
                </View>
                    
                </View>
                
            </View>
        )
    }
}

export default withNavigation(ContactScreen);
