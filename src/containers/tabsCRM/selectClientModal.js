import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Picker,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native'
import styles from "./styleCRM"
import Header from "../../components/headerComponent"
import { CheckBox } from 'react-native-elements'
//import ProductAssignFlatList from '../../components/crmOportunity/productsAssignFlatList';

export default class SelectClientModal extends Component{
    renderItem = ({item}) => {
        return(
            <TouchableWithoutFeedback 
            onPress={()=>{this.props.selectedAction(item)}}>
            <View style={[styles2.card,{justifyContent:"center",alignItems:"center"}]}>
                <Text >{item.name}</Text>
            </View>
                
            </TouchableWithoutFeedback>
        )
        
    }
    
    render(){
        return(

            <Modal
            visible={this.props.show}
            animationType="slide"
            onRequestClose={() => {
                this.props.stateChange("showModalSelectClient",false)
            
          }}>
               
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.bodyContainer}>
                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                    
                    
                    
                        <Header 
                        showSearch={true}
                        titulo={"Asignar Cliente"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.stateChange("showModalSelectClient",false)}} 
                        actionSearchBar={this.props.searchClient}
                        state={this.props.states.searchBar}
                        />
                        
                    </View>
                
                    
                    <View style={[styles.bodyContainer]}>
                            <FlatList
                                data={this.props.states.dataClientList}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id.toString()}
                                //ItemSeparatorComponent={this.renderSeparator}
                                //ListFooterComponent={this.renderFooter}
                                //ListEmptyComponent={this._listEmptyComponent}
                                keyboardShouldPersistTaps="always"
                            />

                            
                    </View>
                    
                
                
                </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

const styles2 = StyleSheet.create({
    card:{
        borderRadius: 5,
        height:40,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        backgroundColor: '#fff', 
        elevation: 5,
        paddingLeft:5,
        marginTop:5
    }
})