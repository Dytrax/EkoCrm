import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert
} from "react-native"
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/FontAwesome'
import emailIcon from "../../assets/gmail.png"
import CONFIG from "../../config/config"
const URL_DELETE_CONTACT = `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/contacts`
import { withNavigation,StackActions,NavigationActions } from 'react-navigation';
import Api from "../../api/Api";
import DB from "../../storeData/storeData"
import EditModal from "../containers/tabsCRM/editModal"
    
 const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab1' })],
  });
  
  

class ContactItem extends Component {
    callNumber = (phone) =>{
        console.log("Hola Mundo")
        const args = {
            number: phone, // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
           
          call(args).catch(console.error)
    }

    deleteContact = async (id) =>{
        const token = await DB.getData("token");
        let answer = await Api.DeleteContact(token,URL_DELETE_CONTACT+"/"+id)
        console.log("answer")
        console.log(answer)
        if (answer.status==205){
            this.props.navigation.dispatch(resetAction)
        }else{
            DB.store("Mensaje","true")
            this.props.navigation.dispatch(resetAction)
        }
        
        
    } 

    askAgain = (id) =>{
        console.log(id)
        console.log("Eliminado")
        Alert.alert(
            '¿Quieres eliminar este contacto?',
            'Este paso no se puede revertir',
            [
              
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Aceptar', onPress: () => this.deleteContact(id)},
            ],
            { cancelable: false }
          )
        //this.props.navigation.dispatch(resetAction)
            
        
    }
    // activeOpacity={2} activeOpacity={2}
    
    SampleFunction=(name,id)=>{
        
        Alert.alert(
            'Contacto Seleccionado',
            name,
            [
              {text: 'Editar', onPress: () => this.props.showModal(id)},
              {text: 'Eliminar', onPress: ()=> this.askAgain(id)},
              {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
      
       }
    render(){
    return(
        <TouchableOpacity onLongPress={()=>{this.SampleFunction(this.props.name,this.props.id)}} >
        
            <View style={styles.contact}>
                <View style={styles.iconContainer} >
                    <View style={styles.circleContainer}></View>
                    
                        <Text style={styles.letter}  >{this.props.name[0]}</Text>
                    
                    
                </View>
                <View style={styles.nameContainer}>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.townName}</Text>  
                </View>
                <View style={styles.emailContainer}>
                <TouchableHighlight underlayColor="red" onPress={() => Linking.openURL(`mailto:${this.props.email}`)} >
                    <Image title="support@example.com"  source={emailIcon} style={styles.email}>
                </Image>
                </TouchableHighlight>
                    
                    
                </View>
                <View style={styles.phoneContainer}  >
                <Icon name="phone" onPress={()=>{this.callNumber(this.props.phone)}} size={20}></Icon>
                    
                
                </View>
            </View>
        </TouchableOpacity>
       
        
    )
}
}
export default withNavigation(ContactItem)
const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    contact:{
        height:60,
        flex:1,
        flexDirection:"row",
        //justifyContent:"space-between"
    },
    iconContainer:{
        flex:20,
        justifyContent:"center",
        alignItems:"center",
        //backgroundColor:"red"
    },
    nameContainer:{
        flex:70,
        justifyContent:"center",
        alignItems:"flex-start",
        //backgroundColor:"yellow"
    },
    emailContainer:{
        flex:10,
        justifyContent:"center",
        alignItems:"center"
    },
    phoneContainer:{
        flex:10,
        justifyContent:"center",
        alignItems:"center"
    },
    circleContainer:{
        
        position:"absolute",
        width:40,
        height:40,
        //backgroundColor:"green",
        borderRadius:40,
        borderWidth:2,
        borderColor:"green"
    },
    letter:{
    
        overflow: "hidden",
    },
    email:{
        height:20,
        width:20,
        resizeMode:"contain",
    }
})

