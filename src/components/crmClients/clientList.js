import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Linking,
    ActivityIndicator,
    Alert,
    TouchableWithoutFeedback
} from "react-native";
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/FontAwesome'
import emailIcon from "../../../assets/gmail.png"
import CONFIG from "../../../config/config"
import API from "../../../api/Api"
import DB from "../../../storeData/storeData"
const URL_DELETE_CLIENT= `${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/crm/clients`
import { withNavigation,StackActions,NavigationActions } from 'react-navigation';
import { showMessage, hideMessage } from "react-native-flash-message";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab2' })],
  });
 class ClientList extends Component {
    constructor(){
        super()
        this.state = {
            loading:true
        }
    }
    callNumber = (phone) =>{
        console.log("Hola Mundo")
        const args = {
            number: phone, // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
           
          call(args).catch(console.error)
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              //width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "18%",
              marginRight: "3%"
            }}
          />
        );
      };
    

      deleteClient = async (id) =>{
        const token = await DB.getData("token");
        let answer = await API.DeleteContact(token,URL_DELETE_CLIENT+"/"+id)
        console.log("answer delete client")
        console.log(answer)
        if (answer.status==204){
            this.props.navigation.dispatch(resetAction)
        }else{  
            showMessage({
                message: "Cliente con oportunidad activa",
                description: answer._bodyInit.slice(12, answer._bodyInit.length-2),
                type: "info",
              });
            //DB.store("Mensaje","true")
            //this.props.navigation.dispatch(resetAction)
        }
        
        
    }

      askAgain = (id) =>{
        
        Alert.alert(
            '¿Quieres eliminar este contacto?',
            'Este paso no se puede revertir',
            [
              
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Aceptar', onPress: () => this.deleteClient(id)},
            ],
            { cancelable: false }
          )
        //this.props.navigation.dispatch(resetAction)
            
        
    }

      clientAction = (item) =>{
        
        Alert.alert(
            'Contacto Seleccionado',
            item.name,
            [
              {text: 'Editar', onPress: () => this.props.editClient(item)},
              /* {text: 'Eliminar', onPress: ()=> this.askAgain(item.id)}, */
              {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
      
       }



    renderItem = ({item}) => {
        console.log("item")
        console.log(item)
        return(
            <TouchableOpacity onLongPress={()=>{this.clientAction(item)}} >
            
                <View style={styles.contact}>
                    <View style={styles.iconContainer} >
                        <View style={styles.circleContainer}></View>
                        
                            <Text style={styles.letter}  >{item.name[0]}</Text>
                        
                        
                    </View>
                    <View style={styles.nameContainer}>
                        <Text>{item.name}</Text>
                        {/* <Text>{item.townName}</Text> */}  
                    </View>
                        <View style={styles.emailContainer}>
                    <TouchableHighlight 
                    hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                    underlayColor="red" onPress={() => Linking.openURL(`mailto:${item.email}`)} >
                        
                            <Image title="support@example.com"  source={emailIcon} style={styles.email}/>
                        
                        
                    
                    </TouchableHighlight>
                        
                        
                    </View>
                    <View style={styles.phoneContainer}  >
                        <TouchableWithoutFeedback
                        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                        onPress={()=>{this.callNumber(item.phone)}}
                        >   
                            <View>
                                <Icon name="phone" color={"green"}  size={24}></Icon>
                            </View>
                            
                        </TouchableWithoutFeedback>
                    
                    </View>
                   {/*  <View style={styles.emailContainer}>
                    <TouchableHighlight underlayColor="red" onPress={() => Linking.openURL(`mailto:${item.email}`)} >
                        <Image title="support@example.com"  source={emailIcon} style={styles.email}>
                    </Image>
                    </TouchableHighlight>
                        
                        
                    </View>
                    <View style={styles.phoneContainer}  >
                    <Icon name="phone" color={"green"} onPress={()=>{this.callNumber(item.phone)}} size={22}></Icon>
                        
                    
                    </View> */}
                </View>
            </TouchableOpacity>
        )
    }

    
    

    renderFooter = () => {
        /* if (!this.state.loading) return null; */
    
        return (
          <View
            style={{
              paddingVertical: 30,
              //borderTopWidth: 1,
              //borderColor: "#CED0CE"
            }}
          >
            {/* <ActivityIndicator animating size="large" /> */}
          </View>
        );
      };

      
      _listEmptyComponent = () => {
          return(
              <View style={{marginTop:"50%"}}>
                  <Text style={{alignSelf:"center",fontSize:16}}>No hay clientes creados</Text>
              </View>
          )
          
      }

    render(){
        return(
            <FlatList
                data={this.props.clientList}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this._listEmptyComponent}
                keyboardShouldPersistTaps="always"
            />
        )
    }
}
export default withNavigation(ClientList)
const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    contact:{
        margin:5,
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
        //backgroundColor:"yellow",
        flex:16,
        justifyContent:"center",
        alignItems:"center",
        marginRight:5,
    },
    phoneContainer:{
        //backgroundColor:"yellow",
        flex:16,
        justifyContent:"center",
        alignItems:"center",
        marginRight:10,

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
        height:24,
        width:24,
        resizeMode:"contain",
    }
})

