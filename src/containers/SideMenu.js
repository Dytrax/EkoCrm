import PropTypes from 'prop-types';
import React, {Component} from 'react';
//import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Image, TouchableHighlight,ImageBackground} from 'react-native';
import Logo from "../../assets/Logo.png"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCrm from "react-native-vector-icons/MaterialCommunityIcons";
import IconRequest from "react-native-vector-icons/MaterialIcons";
import DB from "../../storeData/storeData"
import CONFIG from "../../config/config"
import colors from "../../config/colors"
const URL_IMAGEN = `${CONFIG.URL_BASE}:${CONFIG.PORT_IMAGE}/${CONFIG.VERSION_API_IMAGE}/configuration-image/`
class SideMenu extends Component {
  constructor(){
    super()
    this.state = {
      eyeSlash:0,
      imageCompany:"",
      email:""
    }
  }
  async componentWillMount(){
    const compnayId = await DB.getData("companyId");
    const email = await DB.getData("email");
    console.log(email)
    this.setState({
      imageCompany:URL_IMAGEN+compnayId,
      email:email
    })
    console.log(URL_IMAGEN+compnayId)
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  controlTabNavigator = (route,number) => {
   
    this.props.navigation.navigate(route);
    this.props.navigation.closeDrawer()
    this.setState({
      eyeSlash:number
    })
  }
  //source={{uri : 'https://www.iconsdb.com/icons/preview/white/square-xxl.png'}}
  /* source={
    {uri : 'https://wallpaper-house.com/data/out/10/wallpaper2you_388555.jpg'}}
    source={
        {uri : 'http://hdwpro.com/wp-content/uploads/2017/01/Nice-Green-Background.jpg'}} */
  render () {
    return (
      <View style={styles.container}>
        <View style={{height:200}}>
        <View  
            style={[{width: '100%', height: '100%',flexDirection:"row",},colors.primaryColor]}
            
            
          >
          
          <Image  source={{uri : 'https://www.iconsdb.com/icons/preview/white/square-xxl.png'}}
          style={{height:80,width:80,
          resizeMode:"contain",
          alignSelf:'flex-start',
          borderRadius:40,
          marginTop:60,
          marginLeft:20,
          marginBottom:5,
          position:"absolute",
          
          }}

          />
          <Image  source={{uri:this.state.imageCompany}}
          style={{height:80,width:80,
          resizeMode:"contain",
          alignSelf:'flex-start',
          borderRadius:40,
          marginTop:60,
          marginLeft:20,
          marginBottom:5,
          overflow: "hidden",
            
          }}

          />
          <View style={{marginTop:70}}>
          <Text style={{color:"rgb(255,255,255)",marginLeft:5,fontWeight: "bold",fontSize:17}}>EkoEnergia</Text>
          <Text style={{color:"rgb(255,255,255)",marginLeft:5,fontWeight: "bold",fontSize:15}}>Ejecutivo de cuenta</Text>
          <Text style={{color:"rgb(255,255,255)",marginLeft:5,fontWeight: "bold",fontSize:15}}>{this.state.email}</Text>
          </View>
          
          
          


        </View>
        
        </View>
        
        
          
      
        
        <ScrollView>
            <View style={[styles.offTabCalendar, this.state.eyeSlash===0 && (styles.onTabCalendar,colors.lightColor)]} onPress={()=>{this.controlTabNavigator('Calendar',0)}}>
                <Icon name="calendar-check" size={18}  
                style={[styles.offIcon, this.state.eyeSlash===0 && styles.onIcon]}/>
    
                <TouchableHighlight onPress={()=>{this.controlTabNavigator('Calendar',0)}} underlayColor="white"
                style={{flex:1}}>

                <Text style={[styles.offPressFont, this.state.eyeSlash===0 && styles.onPressFont]} >
                Calendario</Text>
                      
                </TouchableHighlight>
                
            </View>
            
            <View style={[styles.offTabCalendar, this.state.eyeSlash===1 && (styles.onTabCalendar,colors.lightColor)]}>
            <IconCrm name="folder-account" size={18} 
            style={[styles.offIcon, this.state.eyeSlash===1 && styles.onIcon]} />
    
                <TouchableHighlight onPress={()=>{this.controlTabNavigator('Crm',1)}} underlayColor="white"
                style={{flex:1}}>

                <Text style={[styles.offPressFont, this.state.eyeSlash===1 && styles.onPressFont]} >
                CRM</Text>
                      
                </TouchableHighlight>
              
            </View>
            <View style={[styles.offTabCalendar, this.state.eyeSlash===2 && (styles.onTabCalendar,colors.lightColor)]}>
            <IconRequest name="question-answer" size={18} 
            style={[styles.offIcon, this.state.eyeSlash===2 && styles.onIcon]} />
            <TouchableHighlight onPress={()=>{this.controlTabNavigator('SolicitudScreen',2)}} underlayColor="white"
                style={{flex:1}}>

                <Text style={[styles.offPressFont, this.state.eyeSlash===2 && styles.onPressFont]} >
                Solicitudes
                </Text>
                      
                </TouchableHighlight>

            
            </View>
            
            
          
        </ScrollView>
        <View style={styles.footerContainer}>
          
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      onTabCalendar:{
        flexDirection:"row",
        //backgroundColor:"#76ad60"
      },
      offTabCalendar:{
        flexDirection:"row",
        backgroundColor:"white"
      },
      navItemStyle: {
        padding: 10
      },
      navSectionStyle: {
        backgroundColor: 'lightgrey'
      },
      sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
      },
      footerContainer: {
        padding: 20,
        //backgroundColor: 'lightgrey'
      },
      offPressFont:{
        paddingVertical: 10,
        paddingHorizontal: 5,
        color:"rgb(184,184,184)",
        fontWeight:'bold'
      },
      onPressFont:{
        paddingVertical: 10,
        paddingHorizontal: 5,
        color:"rgb(245,245,246)",
        fontWeight:'bold'
      },
      offIcon:{
        alignSelf:"center",
        color:"rgb(184,184,184)",
        marginLeft:10
      },
      onIcon:{
        alignSelf:"center",
        color:"rgb(245,245,246)",
        marginLeft:10
      },
      section:{
        paddingLeft:10,
        paddingVertical: 10,
        backgroundColor:"rgb(225,226,225)"
      }
});
SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;