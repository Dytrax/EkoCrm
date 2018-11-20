import React, {Component} from 'react'
import { 
    Modal,
    Text,
    View,
    StyleSheet
} from 'react-native'
import styles from './styleCRM'
import Header from '../../components/headerComponent'
import InputComponent from './inputPrueba'
import MyDropDown from './dropDownPrueba'
import Icon2 from "react-native-vector-icons/MaterialIcons";
import AssignProductModal from './assignProductModal';

export default class OpportunityModal extends Component {

    render(){
        return(
            <Modal visible={this.props.states.showModalAddOpportunity}
            animationType="fade">
            <AssignProductModal
                show={this.props.states.showModalAssignProduct}
                stateChange={this.props.stateChange}
                states={this.props.states}
            />
            

            <View style={styles.container}>
              
                
              <View style={styles.headerContainer}>
                  <Header 
                  
                  titulo={"Añadir Oportunidad"} 
                  name={"keyboard-backspace"} 
                  actionIcon={()=>{this.props.stateChange("showModalAddOpportunity",false)}} 

                  />
                  
              </View>
          
              <View style={[styles.bodyContainer]}>
                <View style={{width:"75%",alignSelf:"center",}}>
                    
                    
                    <View style={{marginTop:15,}}>
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
                    <MyDropDown size={"100%"}
                        title={"Cliente"}
                        data={this.props.states.dataClientList}
                        selectedAction={this.props.clientSelected}
                    />
                    <View style={{flexDirection:"row",marginTop:22}}>
                            <View style={{marginRight:40,paddingTop:10}}>
                                   <Text>Productos</Text>
                            </View>
                            <View style={{justifyContent:"flex-end"}}>
                                <Icon2 name={"add-circle"} color={"#a3c51a"} size={40} onPress={()=>{this.props.stateChange("showModalAssignProduct",true)}}/>
                            </View>
                    </View>
                    
                    <View style={{marginBottom:20,marginTop:22,}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"observations"} 
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
                    
                    


                    
                </View>



              </View>
              
              
          
          
          </View>
                
            </Modal>
                   
            
        )
    }
}