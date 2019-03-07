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
    
    render(){
        return(

            <Modal
            visible={this.props.show}
            animationType="none"
            onRequestClose={() => {
                this.props.goBack()
           
          }}
          >
               
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        showSearch={true}
                        selected={false}
                        titulo={"Asignar Contactos"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.goBack()}} 
                        state={this.props.searchBarContacts}
                        actionSearchBar={this.props.searchContactList}
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