import React, {Component} from 'react'
import { 
    Modal,
    Text,
    View,
    StyleSheet
} from 'react-native'
import styles from './tabsCRM/styleCRM'
import Header from '../components/headerComponent'
import ActivitiesDayList from '../components/CalendarScreen/ActivitiesDayList';

export default class ActivitiesDayModal extends Component {

    render(){
        return(
            <Modal visible={this.props.states.activitiesDayModal}
            animationType="none"
            onRequestClose={() => { this.props.stateChange("activitiesDayModal",false) } }
            >
                
            

                <View style={styles.container}>
              
                
                    <View style={styles.headerContainer}>
                        <Header 
                        
                        titulo={"Actividades"} 
                        name={"keyboard-backspace"} 
                        actionIcon={()=>{this.props.stateChange("activitiesDayModal",false)
                        
                        //this.props.initialState()
                        }} 

                        />
                  
                    </View>
          
                    <View style={[styles.bodyContainer]}>
                    <ActivitiesDayList dataOnClickDay={this.props.states.activitiesOnClickDay}
                        onPressActivity={this.props.onPressActivity}
                        stateChange={this.props.stateChange}
                    />
                    </View>
              
              
          
          
                </View>
                
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