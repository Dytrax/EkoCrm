import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView, 
    Alert, 
    Platform,
    Linking
} from 'react-native'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import DeviceInfo from 'react-native-device-info';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import styles from './tabsCRM/styleCRM'
import Header from "./../components/headerComponent"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DB from "./../../storeData/storeData"
import API from "./../../api/Api"
import CONFIG from "./../../config/config"
const URL_ACTIVITIES = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/activities`
import ActivitiesDayList from './../components/CalendarScreen/ActivitiesDayList';
import ActivitiesDayModal from './activitiesDayModal';
import EditOpportunityModal from './tabsCRM/editOpportunituModal';
const URL_OPPORTUNITIES= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/oportunities`
const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
import { withNavigation, StackActions,NavigationActions } from "react-navigation";
import {LocaleConfig} from 'react-native-calendars';
import FloatButton from '../components/floatButton'
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Deciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago','Sept.','Oct.','Nov.','Dec.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.']
};

LocaleConfig.defaultLocale = 'es';
const stateName = {
  0:"Desactivado",
  1:"Activo",
  2:"Exitosa",
  3:"No exitosa"
}

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'CalendarScreen' })],
});

export default class CalendarScreen extends Component{
     static navigationOptions = ({ navigation }) => {
       let drawerLabel = 'Calendario';
       return {drawerLabel}
     }
      constructor(props) {
        super(props);
        this.state = {
          fromCalendar:true,
            
          minDate: new Date(),



          //--------------------------
          loading:true,
          activitiesOnClickDay:[],
          activitiesDayModal:false,
          showModalEditOpportunity:false,
          itemToEdit:"",
          description_next_activity:"",
          copyminDate:"",
          showModalCalendar:false,
          AppVersion:""
        };
        this.onDayPress = this.onDayPress.bind(this);
      }


      initialState = () => {
        this.setState({
            
            //--------Edit Opportunities---------
            showModalEditOpportunity:false,
            itemToEdit:"",
            description_next_activity:"",
            copyminDate:""
            
        })
    }


      objectoCalnedario = (key,color) => {
        return{
          'key':key,
          'color':color,
        }
      }
      async componentDidMount(){
        console.log("Hola")
        if (Platform.OS === 'android'){
          const version = DeviceInfo.getVersion();
          this.setState({
            AppVersion: version
          })
          console.log("Android V",version)
          var versionFirebase = firebase.firestore().collection('EkoSave').doc('Version').get()
              .then(function(doc) {
                  if (doc.exists) {
                      
                      
                      if (doc.data()["Android"]>version){
                          console.log(true)
                          Alert.alert(
                              'Actualización disponible',
                              "Actualiza la aplicación y disfruta de la versión mejorada",
                              [
                                {text: 'Actualizar', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=com.leadis.ekosave')},
                                {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                              ],
                              { cancelable: false }
                            )
                      }
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }).catch(function(error) {
                  console.log("Error getting document:", error);
              });
          }else{
              const version = DeviceInfo.getVersion();
              console.log("IOS V",version)
              var versionFirebase = firebase.firestore().collection('EkoSave').doc('Version').get()
              .then(function(doc) {
                  if (doc.exists) {
                      console.log("Document data:", doc.data());
                      console.log(doc.data()["IOS"])
                      if (doc.data()["IOS"]>version){
                          console.log(true)
                          Alert.alert(
                              'Actualización disponible',
                              "Actualiza la aplicación y disfruta de la versión mejorada",
                              [
                                {text: 'Actualizar', onPress: () => console.log('Actualizando...')},
                                {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                              ],
                              { cancelable: false }
                            )
                      }
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }).catch(function(error) {
                  console.log("Error getting document:", error);
              });
          }








        console.log("REINICIADO")
        const token = await DB.getData("token");
        let modules = await DB.getData("modules")
        console.log(JSON.parse(modules))

        const opportunities = await API.getDataBackEnd(token,URL_OPPORTUNITIES)
        console.log("opportunities")
        console.log(opportunities)

        objActivities={}
        objCalendar={}
        
        if (opportunities!=false ){

            
            let crm_activities = opportunities.map(op=>{

                    //[data.crm_activities.dateInit]:{},
                    op.crm_activities.map(data=>{
                      data.title = op.title
                      console.log("data")
                      console.log(data)
                      console.log(objActivities)
                        if (objActivities.hasOwnProperty(data.dateInit.slice(0,10))){
                          objActivities[data.dateInit.slice(0,10)].push(data)
                          
                        }else{
                            objActivities[data.dateInit.slice(0,10)] = []
                            objActivities[data.dateInit.slice(0,10)].push(data)
                        }
                      console.log(objActivities)

                        if (objCalendar.hasOwnProperty(data.dateInit.slice(0,10))){
                          if(data.state===0){
                            objCalendar[data.dateInit.slice(0,10)].dots.push(this.objectoCalnedario(data.id.toString(),"blue"))
                          }else{
                            objCalendar[data.dateInit.slice(0,10)].dots.push(this.objectoCalnedario(data.id.toString(),"red"))
                          }
                        }else{
                          objCalendar[data.dateInit.slice(0,10)] = {dots:[]}



                          if(data.state===0){
                            objCalendar[data.dateInit.slice(0,10)].dots.push(this.objectoCalnedario(data.id.toString(),"blue"))
                          }else{
                            objCalendar[data.dateInit.slice(0,10)].dots.push(this.objectoCalnedario(data.id.toString(),"red"))
                          }
                          
                          
                          
                        }
                      
                    })
                    
                
            })
            console.log("objActivities")
            console.log(objActivities)
            console.log("objCalendar")
            console.log(objCalendar)
            /* let copyobjCalendar = objCalendar
            
            let otro
            for(x in objCalendar){
               otro = objCalendar[x].dots.filter(fi => !(copyobjCalendar[x].dots.some(item => item.color === fi.color)))
              
            } 

            console.log(otro) */
            
            
            this.setState({
                objCalendar:objCalendar,
                objActivities:objActivities,
                loading:false,
                opportunities:opportunities
                //loadingData:false,
                //dataOpportunitiesList:dataOpportunitiesList,
                //copyDataOpportunitiesList:dataOpportunitiesList,
                //dataClientList:dataClientList,
                //dataProductsList:dataProductsList,
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

    onPressActivity = (item) => {
      this.stateChange("showModalEditOpportunity",true)
      console.log(this.state.opportunities)
      let opportunitiesFilterByActivity = this.state.opportunities.filter(data=>data.id===item.crmOpportunityId)
      console.log("Item to edit")
      console.log(opportunitiesFilterByActivity[0])
      console.log(opportunitiesFilterByActivity[0].state)
      let opportunityState = false
 
      if (stateName[opportunitiesFilterByActivity[0].state] === "Exitosa"){
          opportunityState = true
        }

        let crm_finish_activities = opportunitiesFilterByActivity[0].crm_activities.filter(n=>n.state===0)
        console.log("crm_finish_activities")
        console.log(crm_finish_activities)
        let crm_inProcess_activities = opportunitiesFilterByActivity[0].crm_activities.filter(n=>n.state===1)
        console.log("crm_inProcess_activities")
        console.log(crm_inProcess_activities)
        let descriptionOpportunity = ""
        let date = ""
        let crmOpportunityId = ""
        let activityId = ""
        if (crm_inProcess_activities.length != 0){
            
            descriptionOpportunity = crm_inProcess_activities[0].observations
            date = new Date(crm_inProcess_activities[0].dateInit);
            date = (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' +  date.getFullYear()
            crmOpportunityId =  crm_inProcess_activities[0].crmOpportunityId
            activityId = crm_inProcess_activities[0].id
        }else{
            descriptionOpportunity = ""
            date = ""
            crmOpportunityId = ""
            activityId = ""
        }
        //console.log(crm_inProcess_activities[0].observations)
        //console.log(crm_inProcess_activities[0].dateInit)
        //activityId-
        //crmOpportunityId-
        //dateEnd-

        data = {
            itemToEdit:opportunitiesFilterByActivity[0],
            crm_finish_activities:crm_finish_activities,
            crm_inProcess_activities:crm_inProcess_activities,
            descriptionOpportunity:descriptionOpportunity,
            copyminDate:date,
            crmOpportunityId:crmOpportunityId,
            activityId:activityId,
            dateEnd: new Date().toISOString(),
            opportunityState: opportunityState,
        }
        console.log(opportunityState)
        this.props.navigation.navigate('OpportunityOfDayScreen', {
            data:data
        });
        /* this.props.navigation.navigate("OpportunityOfDayScreen")
        
        this.stateChange("itemToEdit",opportunitiesFilterByActivity[0])
        this.setState({
            crm_finish_activities:crm_finish_activities,
            crm_inProcess_activities:crm_inProcess_activities,
            descriptionOpportunity:descriptionOpportunity,
            copyminDate:date,
            crmOpportunityId:crmOpportunityId,
            activityId:activityId,
            dateEnd: new Date().toISOString(),
            opportunityState: opportunityState,
            
        }) */
        
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

      successfulOpportunity = async () => {
        let bodyJson = {
            state:2
        }
        const token = await DB.getData("token")
        let successfulOpportunityPatch = await API.successfulOpportunity(token,URL_ACTIVITIES+'/'+ this.state.activityId,bodyJson)
        console.log(successfulOpportunityPatch)

    }

    goToOpportunityOfDayScreen= ()=>{
      this.props.navigation.navigate("OpportunityOfDayScreen")
    }
    reset = () => {
      this.props.navigation.dispatch(resetAction)
    }
    
      render() {
        console.log(this.state)
        return (
          <View style={styles.container}>
                    <ActivitiesDayModal 
                    states={this.state}
                    stateChange={this.stateChange}
                    onPressActivity={this.onPressActivity}
                    
                    
                    />
                    {/* <EditOpportunityModal 
                    states={this.state} 
                    stateChange={this.stateChange} 
                    initialState={this.initialState}
                    closeActivity = {this.closeActivity}
                    successfulOpportunity = { this.successfulOpportunity}
                    
                      
                    /> */}
                    

                    <View style={[styles.headerContainer,{marginBottom:10}]}>
                        <Header
                        //selected={false}
                        titulo={"Calendario Actividades"} 
                        name={"menu"} 
                        actionIcon={()=>this.props.navigation.openDrawer()} 

                        />
                        
                    </View>
                
                    
                    <View style={[styles.bodyContainer]}>
                        {
                          this.loading ? null : (
                            
                            <Calendar
                                onDayPress={this.onDayPress}
                                style={stylesCalendar.calendar}
                                hideExtraDays
                                //current={}
                                //minDate={}
                                //showWeekNumbers={true}
                                markingType={'multi-dot'}
                                markedDates={
                                  this.state.objCalendar
                                  }
                            />
                            
                            
                          )
                        }
                        {/* <ActivitiesDayList dataOnClickDay={this.state.activitiesOnClickDay}/> */}
                        
            </View>
            {/* <FloatButton add={this.reset}/> */}
            
            </View>
        );
      }
     /*  {
                                  
        '2018-11-25': {dots: [{key:'vacation', color: 'red',}, massage, workout],},
        '2018-11-26': {dots: [massage, workout], disabled: true},
      } */
      //{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}
      onDayPress(day) {
        console.log(day.dateString,)
        let activitiesOnClickDay=""
        if (this.state.objActivities){
          activitiesOnClickDay = this.state.objActivities[day.dateString]
        }
        
        activitiesDayModal = true
        if (!activitiesOnClickDay){
          activitiesOnClickDay = []
          activitiesDayModal = false
        }
        console.log(activitiesOnClickDay)


        this.setState({
          activitiesDayModal:activitiesDayModal,
          selected: day.dateString,
          dateSelected: new Date(day.dateString).toISOString(),
          activitiesOnClickDay:activitiesOnClickDay
        });
      }
    }
    
    const stylesCalendar = StyleSheet.create({
      calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350
      },
      text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee'
      },
      container: {
        flex: 1,
        backgroundColor: 'gray'
      }
    });