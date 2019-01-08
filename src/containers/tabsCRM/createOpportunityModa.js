import React, {Component} from 'react'
import { 
    Modal,
    Text,
    View,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
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

import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import CONFIG from "../../../config/config"
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
const URL_OPPORTUNITIES= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/oportunities`
export default class OpportunityModal extends Component {


    addOpportunity = async () => {
        if (!this.props.states.productsChecked || !this.props.states.dateSelectedCalendar || 
            !this.props.states.description || !this.props.states.observations || !this.props.states.title){
                Alert.alert(
                    'Todos los campos deben ser completados'
                 )

            }
        else{
            let bodyJson = {
                crmClientId: this.props.states.crmClientId,
                dateInit: new Date().toISOString(),
                dateInitActivity: this.props.states.dateSelectedCalendar,
                descriptions:this.props.states.description,
                observations:this.props.states.observations,
                products:this.props.states.productsChecked,
                title:this.props.states.title,
                rolId:this.props.states.rolId
    
            }
            console.log(bodyJson)
            const token = await DB.getData("token");
            let answer = await API.PostData(token,URL_OPPORTUNITIES,bodyJson)
            if (answer[0]===201){
                this.props.reset()
            }
            else{

                this.dropdown.showMessage({
                    message: "No fue posible crear la oportunidad ",
                    description:answer[1].message,
                    type: "danger",
                  });
                /* Alert.alert(
                    "No fue posible crear la oportunidad " + 
                    answer[1].message
                 ) */
                /* this.props.stateChange("showModalAddOpportunity",false) */
                /* showMessage({
                    message: "No fue posible crear la oportunidad",
                    description: answer[1].message,
                    type: "danger",
                  }); */
                
            }
            console.log(answer)
            //Falta hacer las validaciones
           
            
            //this.props.navigation.navigate('Tab1')
            //console.log(answer)
            //this.props.modalOff()
        }
        
      }


    render(){
        return(
            <Modal visible={this.props.states.showModalAddOpportunity}
            animationType="fade"
            onRequestClose={() => { this.props.stateChange("showModalAddOpportunity",false) } }
            >
            <AssignProductModal
                show={this.props.states.showModalAssignProduct}
                stateChange={this.props.stateChange}
                states={this.props.states}
                
            />
            <CalendarModal
                show={this.props.states.showModalCalendar}
                stateChange={this.props.stateChange}
                states={this.props.states}
                minDate={this.props.states.minDate}
            />

            <View style={styles.container}>
              
                
              <View style={styles.headerContainer}>
                  <Header 
                  
                  titulo={"Crear Oportunidad"} 
                  name={"keyboard-backspace"} 
                  actionIcon={()=>{this.props.stateChange("showModalAddOpportunity",false)
                  this.props.initialState()
                  }} 

                  />
                  
              </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>  
            <ScrollView style={[styles.bodyContainer]}
            keyboardShouldPersistTaps='always'
                keyboardDismissMode='on-drag'
            >
            <View style={[styles.bodyContainer]}>
                <View style={{width:"90%",alignSelf:"center",}}>
                    
                    <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:22,},styleCreateOpportunity.card]}>
                    <View >
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Título"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"title"}
                                        stateChange={this.props.stateChange}
                                        type={"default"}
                                        value={""}
                                        iconType={"font-awesome"}
                                        iconName={"file-text-o"}
                                        iconSize={25}
                                        />
                    </View>
                    
                    
                    
                    <View style={{marginTop:22,}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Observaciones"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"observations"}
                                        stateChange={this.props.stateChange}
                                        type={"default"}
                                        value={""}
                                        iconType={"font-awesome"}
                                        iconName={"file-text-o"}
                                        iconSize={25}
                                        />
                    </View>
                    <MyDropDown size={"100%"}
                        title={"Cliente"}
                        data={this.props.states.dataClientList}
                        selectedAction={this.props.clientSelected}
                    />
                    <MyDropDown size={"100%"}
                        title={"Selecciona el rol"}
                        data={this.props.states.listRol}
                        selectedAction={this.props.rolSelected}
                    />
                    </View>
                    <View style={[{borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:20,},styleCreateOpportunity.card]}>
                            
                        <View style={{flexDirection:"row",}}>
                                <View style={{marginRight:40,paddingTop:10}}>
                                    <Text>Añadir Productos</Text>
                                </View>
                                <View style={{justifyContent:"flex-end"}}>
                                    <Icon2 name={"add-circle"} color={"#a3c51a"} size={40} onPress={()=>{this.props.stateChange("showModalAssignProduct",true)}}/>
                                </View>
                                <View style={{alignSelf:"center",paddingLeft:10}}>
                                    <Text style={{fontSize:22}}>{this.props.states.productsChecked.length}</Text>
                                </View>
                        </View>
                    </View>
                    

                    <View style={[{marginBottom:20,marginTop:22,borderWidth:1,borderColor:"#a3c51a",padding:10},styleCreateOpportunity.card]}>
                        <View style={{alignSelf:"center",marginBottom:10}}>
                            <Text>Primer Actividad</Text>
                        </View>
                        
                        <View style={{flexDirection:"row"}}>
                            <View style={{marginRight:10,paddingTop:5}}>
                                <Text>Fecha Próxima Actividad</Text>
                            </View>
                            <Icon3 
                            style={{marginRight:10}}
                            name={"calendar"} color={"#a3c51a"} size={25} 
                            onPress={()=>{this.props.stateChange("showModalCalendar",true)}}/>
                            <View style={{paddingTop:5}}>
                                <Text>{this.props.states.dateSelectedCalendarToShow}</Text>
                            </View>
                            
                        </View>

                        <View >
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Descripción actividad"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"description"}
                                        stateChange={this.props.stateChange}
                                        type={"default"}
                                        value={""}
                                        //iconType={"font-awesome"}
                                        //iconName={"file-text-o"}
                                        //iconSize={25}
                                        />
                        </View>


                        


                    </View>
                    <View >
                                <ButtonCircle text={"Añadir"} size={"50%"} action={this.addOpportunity}></ButtonCircle>
                           </View>
                    
                    


                    
                </View>



              </View>
              </ScrollView>
              </KeyboardAvoidingView>
              {/* aqui */}
              
          
          
          </View>
                <FlashMessage ref={ref => this.dropdown = ref} />   
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
        paddingLeft:5
    }
})