import React, {Component} from 'react'
import { 
    Modal,
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Button
} from 'react-native'
import styles from './styleCRM'
import Header from '../../components/headerComponent'
import InputComponent from './inputPrueba'
import MyDropDown from './dropDownPrueba'
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import AssignProductModal from './assignProductModal';
import CalendarModal from './calendarModal';
import ButtonCircle from '../../components/buttonCircle'
import ClosedActivities from '../../components/crmOportunity/closedActivities';

export default class EditOpportunityModal extends Component {

    render(){
       
        
        return(
            
            <Modal visible={this.props.states.showModalEditOpportunity}
            animationType="none"
            onRequestClose={() => {
            console.log("Modal has been closed.")}}>
            
            <CalendarModal
                show={this.props.states.showModalCalendar}
                stateChange={this.props.stateChange}
                states={this.props.states}
                minDate={this.props.states.copyminDate}
            />

            <View style={styles.container}>
              
                
              <View style={styles.headerContainer}>
              { this.props.states.fromCalendar ? 
              
                (
                    <Header 
                  
                        titulo={this.props.states.itemToEdit.title} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.stateChange("showModalEditOpportunity",false)
                        this.props.stateChange("activitiesDayModal",true)
                        
                        this.props.initialState()
                       
                        }} 

                    />
                ) :
                (
                    <Header 
                  
                        titulo={this.props.states.itemToEdit.title} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.stateChange("showModalEditOpportunity",false)
                        this.props.initialState()
                    }} 

                    />
                )

              
              }
                  
                  
              </View>
            <ScrollView>
              <View style={[styles.bodyContainer]}>
                <View style={{width:"90%",alignSelf:"center",}}>
                    {
                        this.props.states.opportunityState ? null : 
                        (
                            <View style={[{borderWidth:1,borderColor:"#a3c51a",marginTop:22,padding:10},styleCreateOpportunity.card]}>

                            <Text style={{alignSelf:"center",fontSize:20,marginBottom:10}}>Actividad Actual</Text>
                            <Text style={{alignSelf:"flex-start",color:"#a3c51a",fontSize:16,marginBottom:5}}>En Proceso</Text>
                            <Text style={{alignSelf:"flex-start", fontSize:16}}>Descripción: {this.props.states.descriptionOpportunity}</Text>
                            {/* <Text style={{alignSelf:"center", fontSize:20}}>Inicio siguiente actividad</Text> */}
                            
                            
                            </View>


                        )
                    }
                    
                    {
                        this.props.states.opportunityState ? null : 
                        (
                            <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>
                                <Text style={{fontSize:20,alignSelf:"center",marginBottom:10}}>Inicio Siguiente Actividad</Text>
                                
                                <View style={{flexDirection:"row",marginBottom:10}}>
                                    <Text style={{fontSize:16,paddingTop:5}}>Seleccionar Fecha: </Text>
                                    <Icon3 
                                        style={{marginRight:10}}
                                        name={"calendar"} color={"#a3c51a"} size={25} 
                                        onPress={()=>{this.props.stateChange("showModalCalendar",true)}}/>
                                    <View style={{paddingTop:5}}>
                                        <Text>{this.props.states.dateSelectedCalendarToShow}</Text>
                                    </View>

                                </View>
                                <View style={[{marginBottom:10},styleCreateOpportunity.card]}>
                                    <TextInput
                                    fontSize={16}
                                    multiline = {true} 
                                    placeholder="Descripción siguiente actividad"
                                    onChangeText={(text) => this.props.stateChange("description_next_activity",text)}
                                    //value={this.props.states.description_next_activity}
                                    ></TextInput>
                                </View>
                                <Button title="Cerrar actual y crear siguiente" onPress={() => {this.props.closeActivity()}}/>      
                            
                            </View>
                        )
                    }
                    
                    
                    
                    
                    <View style={[{marginBottom:20,marginTop:22,borderWidth:1,borderColor:"#a3c51a",padding:10},styleCreateOpportunity.card]}>
                        <Text style={{fontSize:20,alignSelf:"center",marginBottom:10}}>Actividades Terminadas</Text>
                        <ClosedActivities closedActivitiesList={this.props.states.crm_finish_activities}/>
                        
                        


                        


                    </View>
                    
                    


                    
                </View>



              </View>
              </ScrollView>
            
              
          
          
          </View>

          {
            this.props.states.opportunityState ? null : 
            (
                <View style={[{flexDirection:"row",backgroundColor:"rgb(243,243,243)"},styleCreateOpportunity.card]}> 
                    <View style={{width:"50%"}}>
                        <Button color="rgb(255,85,29)" title="No Exitosa"/>
                    </View>
                    <View  style={{width:"50%"}}>
                        <Button  color="rgb(65,83,175)" title="Exitosa" onPress = {() => {this.props.successfulOpportunity()}}/>
                    </View>
                        
                        
                </View>
            )
          }
          
                
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
        
    }
})