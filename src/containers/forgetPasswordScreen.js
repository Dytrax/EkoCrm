import React ,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    Dimensions,
    TextInput,
    TouchableHighlight
} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../components/headerComponent"
import Logo from '../../assets/Logo.png'
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default class ForgetPasswordScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                    <Header 
                    showSearch={false}
                    titulo={"Olvidaste tu contraseña"} 
                    name={"keyboard-backspace"}  
                    actionIcon={()=>{this.props.navigation.goBack(null)}} 
                    
                    />
                    
            </View>
            
            <View style={styles.subcontainer}>
                <View style={styles.body}> 
                
                <Image source={Logo} style={styles.logo} />
                <Text style= {styles.text}>Por favor ingresa el correro electrónico registrado en tu cuenta</Text>


            <View style={styles.inputBar}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems:"center",
                  height:40,
                  
                }}
              > 
                <Icon name="email" size={16} color="rgb(184,184,184)"  />
                {/* <Image source={emailIcon} style={styles.icon} /> */}
              </View>
                <TextInput
                  //this.setState({ email: val })
                  onChangeText={(val) => props.change("email",val)}
                  placeholder="E-mail"
                  placeholderTextColor={"rgb(184,184,184)"}
                  style={styles.txtInput}
                />
            </View>



                <TouchableHighlight
                //onPress={props.actionLogin}
                underlayColor="white"
                style={styles.forgetButton}
                >
            
                    <Text style={styles.buttonText}>Enviar Contraseña</Text>
            
                </TouchableHighlight>

                </View>
            </View>
            
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    subcontainer:{
        flex:1,
        
    },
    headerContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: Platform.OS === 'android' ? 60 : 60,
    },
    body:{
        backgroundColor: '#fff', 
        flex:1,
        alignItems:"center"
        
    },
    logo:{
        marginTop:50,
        alignSelf:"center",
        width: WIDTH - 60,
        height: 85,
        marginBottom: 30,
        resizeMode:"contain"
    },
    inputBar: {
        flexDirection: "row",
        alignSelf:"center",
        marginBottom:15
        
    },
    txtInput: {
        paddingLeft:8,
        width:300,
        height:40,
        borderBottomColor: "rgb(184,184,184)",
        borderBottomWidth: 1,
        marginBottom:10
        //backgroundColor:"black"
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        
      },
      forgetButton:{
        justifyContent:"center",
        height:35,
        alignSelf:"center",
        width: WIDTH - 60,
        backgroundColor: "rgb(144,184,54)",
        borderRadius: 20,
        //overflow: "hidden",
      },
      text:{
        //justifyContent:"center",
        textAlign:"center",
        width: WIDTH - 60,
        marginBottom:50
      }
})