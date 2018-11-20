import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Picker,
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from 'react-native'
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
import { CheckBox } from 'react-native-elements'
import ContactAssignFlatList from '../../components/crmClients/contactsAssignFlatList';
export default class CreateClientModal extends Component{
     constructor(){
        super()
        this.state = {
            checked:false
        }
    } 
    /* stateChange = (stateToChange, value) => {
        console.log(this.state.var)
        //console.log(this.state.contactName)
        console.log(stateToChange);
        //console.log(this.state)
        //console.log(value);
        this.state[stateToChange] = !value;
       
        console.log("this.state.stateChange")
        console.log(this.state)
      }; */

    render(){
        return(

            <Modal
            visible={this.props.show}
            animationType="slide"
            onRequestClose={() => {
            console.log("Modal has been closed.")
            //Alert.alert('Modal has been closed.');
          }}>
               
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        selected={false}
                        titulo={"Asignar Contactos"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.goBack()}} 

                        />
                        
                    </View>
                
                    
                    <View style={[styles.bodyContainer]}>
                        {/* <CheckBox
                            //title='Click Here'
                            checked={this.state.checked}
                            onPress={()=>{this.setState({
                                checked:!this.state.checked
                            })}}
                            /> */}
                            
                        <ContactAssignFlatList data={[this.props.data[0],this.props.data[1]]}
                            chageState={this.props.chageState}
                        />
                        
                        
                        
                            
                            
                            
                            
                            

                            
                    </View>
                    
                
                
                </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}