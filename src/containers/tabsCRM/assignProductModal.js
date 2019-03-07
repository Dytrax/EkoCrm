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
import ProductAssignFlatList from '../../components/crmOportunity/productsAssignFlatList';

export default class AssignProductModal extends Component{
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
            animationType="none"
            onRequestClose={() => {
                this.props.stateChange("showModalAssignProduct",false)
            //Alert.alert('Modal has been closed.');
          }}>
               
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        //selected={false}
                        titulo={"Asignar Productos"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.stateChange("showModalAssignProduct",false)}} 

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
                        <ProductAssignFlatList
                        //copyDataProductList  dataProductsList
                            data={this.props.states.copyDataProductList}
                            productsChecked={this.props.states.productsChecked}
                            stateChange={this.props.stateChange}
                        />
                        {/* <ContactAssignFlatList data={[this.props.data[0],this.props.data[1]]}
                            chageState={this.props.chageState}
                        /> */}
                        
                        
                        
                            
                            
                            
                            
                            

                            
                    </View>
                    
                
                
                </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}