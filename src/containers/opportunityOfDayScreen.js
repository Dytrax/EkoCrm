import React, {Component} from 'react'
import { 
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native'
import styles from './tabsCRM/styleCRM'
import Icon3 from "react-native-vector-icons/FontAwesome";
//import ClosedActivities from '../../components/crmOportunity/closedActivities';
import CalendarModal from './tabsCRM/calendarModal';
import Header from '../components/headerComponent'
import CONFIG from '../../config/config'
import API from '../../api/Api'
import DB from '../../storeData/storeData'
import Option from "react-native-vector-icons/SimpleLineIcons";
import { withNavigation, StackActions,NavigationActions } from "react-navigation";
import ClosedActivities from '../components/crmOportunity/closedActivities';
import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from "../components/loader"
const URL_ACTIVITIES = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/activities`
const URL_OPPORTUNITIES= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/oportunities`
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'CalendarScreen' })],
  });

export default class OpportunityOfDayScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            showModalCalendar:false,
            dateSelectedCalendarToShow:"",
            description_next_activity:"",
            dateSelectedCalendar:"",
            minDate: new Date(),
        }
    }
    async componentDidMount(){
        
        //activityId-
        //crmOpportunityId-
        //dateEnd-
        /* this.setState({
            activityId:data.activityId,
            crmOpportunityId:data.crmOpportunityId,
            
        }) */
    }

    stateChange = (stateToChange, value) => {
        var  tmp = {}
        tmp[stateToChange] = value
        this.setState(tmp)   
      };

    closeActivity = async () => {
        
        if (!this.state.dateSelectedCalendar || !this.state.description_next_activity ){
                Alert.alert(
                    'Todos los campos son requeridos'
                 )

            }
        else{
            this.setState({
                loading:true
            })
            const { navigation } = this.props;
            const data = navigation.getParam('data', 'No-Data');
            let bodyJson = {
                activityId: data.activityId,
                crmOpportunityId: data.crmOpportunityId,
                dateEnd: new Date().toISOString(),
                dateInit:this.state.dateSelectedCalendar,
                descriptions: this.state.description_next_activity,       
            }
            console.log("bodyJson")
            console.log(bodyJson)
            /* 
            const token = await DB.getData("token");
            let closeActivityPost = await API.PostData(token,URL_ACTIVITIES,bodyJson)
            
            console.log("closeActivityPost")
            console.log(closeActivityPost)
            this.props.navigation.dispatch(resetAction) */
            const token = await DB.getData("token");
            let closeActivityPost = await API.PostData(token,URL_ACTIVITIES,bodyJson)
            this.setState({
                loading:false
            })
            this.props.navigation.dispatch(resetAction)
            /* console.log("closeActivityPost")
            console.log(closeActivityPost) */

            /* if (closeActivityPost===204){
                this.props.navigation.dispatch(resetAction)
            }else{

            } */
        }
        
        
      }

      successfulOpportunity = async () => {
        this.setState({
            loading:true
        })
        const { navigation } = this.props;
        const data = navigation.getParam('data', 'No-Data');
        
        let bodyJson = {
            state:2
        }
        const token = await DB.getData("token")
        
        let successfulOpportunityPatch = await API.successfulOpportunity(token,URL_OPPORTUNITIES+'/'+ data.crmOpportunityId,bodyJson)
        this.setState({
            loading:false
        })
        console.log(successfulOpportunityPatch)
        this.props.navigation.dispatch(resetAction)
    }

    unsuccessfulOpportunity = async () => {
        this.setState({
            loading:true
        })
        const { navigation } = this.props;
        const data = navigation.getParam('data', 'No-Data');
        
        let bodyJson = {
            state:3
        }
        const token = await DB.getData("token")
        
        let successfulOpportunityPatch = await API.successfulOpportunity(token,URL_OPPORTUNITIES+'/'+ data.crmOpportunityId,bodyJson)
        this.setState({
            loading:false
        })
        console.log(successfulOpportunityPatch)
        this.props.navigation.dispatch(resetAction)
    }

    optionButton = () =>{
        
        Alert.alert(
            'Calificaría la oportunidad como:',
            '',
            [
              
              
              {text: 'Exitosa', onPress: () => this.successfulOpportunity()},
              {text: 'No Exitosa', onPress: () => this.unsuccessfulOpportunity()},
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
        //this.props.navigation.dispatch(resetAction)
            
        
    }
      
    
    render(){

        const { navigation } = this.props;
        const data = navigation.getParam('data', 'No-Data');
        
        console.log("data")
        console.log(data)
        return(
            
            
            
            <View style={styles.container}>
            <View style={styles.container}>
            
                <Loader loading={this.state.loading} />
                <CalendarModal
                    show={this.state.showModalCalendar}
                    stateChange={this.stateChange}
                    states={this.states}
                    minDate={data.copyminDate}
                />
                

                
              <View style={styles.headerContainer}>

                <Header 
                    
                    titulo={data.itemToEdit.title} 
                    name={"keyboard-backspace"} 
                    actionIcon={() => this.props.navigation.goBack()} 

                />
                  
              </View>
            
             
              

              
              
            {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}> */}
            {/* <ScrollView  keyboardShouldPersistTaps='always'
                keyboardDismissMode='on-drag'> */}
                {/* <ScrollView  keyboardShouldPersistTaps='always'
                keyboardDismissMode='on-drag'> */}
              <View style={[styles.bodyContainer]}>
                <View style={{width:"90%",alignSelf:"center",}}>
                    {
                        data.opportunityState ? null : 
                        (
                            <View style={[{borderWidth:1,borderColor:"#a3c51a",marginTop:22,padding:10},styleCreateOpportunity.card]}>

                            <Text style={{alignSelf:"center",fontSize:20,marginBottom:10}}>Actividad Actual</Text>
                            <Text style={{alignSelf:"flex-start",color:"#a3c51a",fontSize:16,marginBottom:5}}>En Proceso</Text>
                            <Text style={{alignSelf:"flex-start", fontSize:16}}>Descripción: {data.descriptionOpportunity}</Text>
                            {/* <Text style={{alignSelf:"center", fontSize:20}}>Inicio siguiente actividad</Text> */}
                            
                            
                            </View>


                        )
                    }
                    
                    {
                        data.opportunityState ? null : 
                        (
                            <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>
                                <Text style={{fontSize:20,alignSelf:"center",marginBottom:10}}>Inicio Siguiente Actividad</Text>
                                
                                <View style={{flexDirection:"row",marginBottom:10}}>
                                    <Text style={{fontSize:16,paddingTop:5}}>Seleccionar Fecha: </Text>
                                    <Icon3 
                                        style={{marginRight:10}}
                                        name={"calendar"} color={"#a3c51a"} size={25} 
                                        onPress={()=>{this.stateChange("showModalCalendar",true)}}/>
                                    <View style={{paddingTop:5}}>
                                        <Text>{this.state.dateSelectedCalendarToShow}</Text>
                                    </View>

                                </View>
                                <View style={[{marginBottom:10},styleCreateOpportunity.card]}>
                                    <TextInput
                                    fontSize={16}
                                    multiline = {false} 
                                    placeholder="Descripción siguiente actividad"
                                    onChangeText={(text) => this.stateChange("description_next_activity",text)}
                                    //value={this.props.states.description_next_activity}
                                    ></TextInput>
                                </View>
                                <Button title="Cerrar actual y crear siguiente" onPress={() => {this.closeActivity()}}/>      
                            
                            </View>
                        )
                    }
                    
                    
                    
                    
                    <View style={[{marginBottom:20,marginTop:22,borderWidth:1,borderColor:"#a3c51a",padding:10,height:"40%"},styleCreateOpportunity.card]}>
                        <Text style={{fontSize:20,alignSelf:"center",marginBottom:10}}>Actividades Terminadas</Text>
                        <ClosedActivities closedActivitiesList={data.crm_finish_activities}/>
                        
                        
                        


                        


                    </View>
                    
                    


                    
                </View>
                


              </View>
              
              {/* </ScrollView>
              </KeyboardAvoidingView>
              */}
              
              
            
              
          
          
          {/* {
            data.opportunityState ? null : 
            (
                <View style={[{flexDirection:"row",backgroundColor:"rgb(243,243,243)"},styleCreateOpportunity.card]}> 
                    <View style={{width:"50%"}}>
                        <Button color="rgb(255,85,29)" title="No Exitosa" onPress = {() => {this.unsuccessfulOpportunity()}}/>
                    </View>
                    <View  style={{width:"50%"}}>
                        <Button  color="rgb(65,83,175)" title="Exitosa" onPress = {() => {this.successfulOpportunity()}}/>
                    </View>
                        
                        
                </View>
            )
          } */}
          
          </View>

          <View style={[{position:"absolute",top:Platform.OS === 'android' ? "0%" : "1%",right:"5%",
                    },styles.headerContainer]}>
              <Option 
                        
                        style={{alignSelf:"center"}}
                        name={"options-vertical"} color={"white"} size={25} 
                        onPress={()=>{this.optionButton()}}

                        />
              </View>
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
        
    }
})