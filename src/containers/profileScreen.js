import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Dimensions,
    TextInput,
    Button,
    ScrollView,
   
} from 'react-native';
import styles from "./tabsCRM/styleCRM"
import Header from "../components/headerComponent"
import DB from "../../storeData/storeData"
import API from "../../api/Api"
import CONFIG from "../../config/config"
import Icon from "react-native-vector-icons/MaterialIcons";
import EditPassword from './editPasswordModal';
import InputComponent from '../components/inputComponentV2'
import { showMessage, hideMessage } from "react-native-flash-message";
const URL_EDIT_NAME_AND_PHONE = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_IMAGE}/user-company/`
/* import { Button } from 'native-base'; */

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default class Profile extends Component {
    /* const token = await DB.getData("token");
        const itemId = await DB.getData("itemId"); */
    constructor(){
        super()
        this.state = {
            name:"",
            phone:"",
            editPassword:false,
            actualPassword:"",
            password:"",
            confirmationPassword:""
        }
    }
    async componentWillMount(){
        const name = await DB.getData("name");
        const phone = await DB.getData("phone");
        this.setState({
            name:name,
            phone:phone
        })
        console.log(name)
        console.log(phone)
    }

    validatePassword = (password) => {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/
        return re.test(password)
    }

    

    stateChange = (stateToChange, value) => {
  
        var  tmp = {}
        tmp[stateToChange] = value
        this.setState(tmp)
 
      };

    changeNameOrPhone = async () => {
        await DB.store("name", this.state.name);
        await DB.store("phone", this.state.phone);

        let bodyJson = {
            name: this.state.name,
            phone: this.state.phone,
              
        }
        console.log("bodyJson")
        console.log(bodyJson)
        const token = await DB.getData("token");
        const id = await DB.getData("id");
        
        let changeRequest = await API.PutData(token, URL_EDIT_NAME_AND_PHONE + id, bodyJson)
        console.log(changeRequest)
        if (changeRequest.status==201){
            showMessage({
                message: "Nombre y telefono editado",
                description: "Cambios guardados satisfactoriamente",
                type: "success",
              });
        }
        /* this.dropdown.alertWithType('error', 'Error', "Lo sentimos por el momento no tenemos servicio, intenta más tarde"); */
        /* const token = await DB.getData("token");
        let closeActivityPost = await API.PostData(token,URL_ACTIVITIES,bodyJson) */
    }


    changePassword = async() => {
        if (this.state.password!=this.state.confirmationPassword){
            Alert.alert(
                'Las contraseñas deben coincidir'
             )
        }
        else{
            let bodyJson = {
                confirmPassword: this.state.confirmationPassword,
                newPassword: this.state.password,
                oldPassword: this.state.actualPassword 
                  
            }
            const token = await DB.getData("token");
            const id = await DB.getData("id");
            console.log(id)
            let changePasswordRequest = await API.changePassword(token, URL_EDIT_NAME_AND_PHONE + id, bodyJson)
            console.log(changePasswordRequest)
            if (changePasswordRequest.status==204){
                showMessage({
                    message: "OK",
                    description: "Contraseña cambiada satisfactoriamente",
                    type: "success",
                  });
            }else{
                showMessage({
                    message: "No se pudo realizar el cambio",
                    description: "No se pudo realizar el cambio",
                    type: "warning",
                  });
            }
            
        }
        
    }
    

    render(){
        return(
            <View style={styles.container}>
                <EditPassword loading={this.state.editPassword} states={this.state}
                    stateChange={this.stateChange} changePassword={this.changePassword}
                />
  
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={false}
                    titulo={"Perfil"} 
                    name={"menu"}
                    actionIcon={()=>this.props.navigation.openDrawer()}
                    //state={this.state.searchBar}
                    //actionSearchBar={this.searchMethods}

                    />
                    
                </View>
                
                <View style={styles.subcontainer}>
                <ScrollView keyboardShouldPersistTaps='handled' style={[styles.bodyContainer]}>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Nombre"} 
                                            mensajeError={"Campo Requerido \nHoamiwndinwcdimwicd \nHoamiwndinwcdimwicd \nHoamiwndinwcdimwicd"} 
                                            state={"name"}
                                            stateChange={this.stateChange}
                                            type={"default"}
                                            value={this.state.name}
                                            iconType={"material-icons"}
                                            iconName={"person"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    <View style={{justifyContent: "center",
                            alignItems:"center",marginTop:20,marginBottom:20}}>
                        <InputComponent 
                                            
                                            //width={"100%"}
                                            texto={"Telefono"} 
                                            mensajeError={"Campo Requerido \nHoamiwndinwcdimwicd \nHoamiwndinwcdimwicd \nHoamiwndinwcdimwicd"} 
                                            state={"phone"}
                                            stateChange={this.stateChange}
                                            type={"phone-pad"}
                                            value={this.state.phone}
                                            iconType={"material-icons"}
                                            iconName={"phone"}
                                            iconSize={25}
                                            
                                            />
                    </View>
                    
                    

                    

                    <Button
                    
                        onPress={()=> this.changeNameOrPhone()}
                        title="Guardar Cambios"
                        color="#6A8B05"
                        //accessibilityLabel="Learn more about this purple button"
                        />

                    <Button
                        onPress={()=> this.stateChange("editPassword",true)}
                        
                        title="Cambiar Contraseña"
                        color="#F88E38"
                        //accessibilityLabel="Learn more about this purple button"
                        />
                    

                        
                </ScrollView> 
                    
                </View>
                
            </View>
        )
    }
}
