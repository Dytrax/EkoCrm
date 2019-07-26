import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/buttonCircle'



class SelectContractModal extends Component {
  constructor(props){
      super(props)
  }
  render(){
    return (
      <Modal
          transparent={true}
          animationType={'none'}
          visible={this.props.modal}
          
          >
          <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                {this.props.children}
                <View>
                  <Button size={'100%'} text={'Aceptar'} action={this.props.action}/>
                </View>
              </View>
              
          </View>
  
  
  
  
  
      </Modal>
      )
  }
}


const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      padding:10,
      backgroundColor: '#FFFFFF',
      height: '50%',
      width:'80%',
      //width: 100,
      borderRadius: 10,
      //display: 'flex',
      //alignItems: 'center',
      //justifyContent: 'center'
    },
    onText:{
      //color:Color.primary
    }
  });
export default SelectContractModal;