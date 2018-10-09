import PropTypes from 'prop-types';
import React, {Component} from 'react';
//import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Image, TouchableHighlight,ImageBackground} from 'react-native';
import Logo from "../../assets/Logo.png"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCrm from "react-native-vector-icons/MaterialCommunityIcons";
import IconRequest from "react-native-vector-icons/MaterialIcons";
class SideMenu extends Component {
  constructor(){
    super()
    this.state = {
      eyeSlash:0,
    }
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
    {uri : 'https://wallpaper-house.com/data/out/10/wallpaper2you_388555.jpg'}} */
  render () {
    return (
      <View style={styles.container}>
        <View style={{height:200}}>
        <ImageBackground  
            style={{width: '100%', height: '100%',flexDirection:"row"}}
            source={
    {uri : 'https://wallpaper-house.com/data/out/10/wallpaper2you_388555.jpg'}}
            
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
          <Image  source={Logo}
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
          <Text style={{color:"rgb(255,255,255)",marginLeft:5,fontWeight: "bold",fontSize:15}}>Ejecutivo2@leadis.co</Text>
          </View>
          
          
          


        </ImageBackground>
        
        </View>
        
        
          
      
        
        <ScrollView>
            <View style={[styles.offTabCalendar, this.state.eyeSlash===0 && styles.onTabCalendar]} onPress={()=>{this.controlTabNavigator('Calendar',0)}}>
                <Icon name="calendar-check" size={16}  
                style={[styles.offIcon, this.state.eyeSlash===0 && styles.onIcon]}/>
    
                <TouchableHighlight onPress={()=>{this.controlTabNavigator('Calendar',0)}} underlayColor="white"
                style={{flex:1}}>

                <Text style={[styles.offPressFont, this.state.eyeSlash===0 && styles.onPressFont]} >
                Calendario</Text>
                      
                </TouchableHighlight>
                
            </View>
            <View style={[styles.offTabCalendar, this.state.eyeSlash===1 && styles.onTabCalendar]}>
            <IconCrm name="folder-search" size={16} 
            style={[styles.offIcon, this.state.eyeSlash===1 && styles.onIcon]} />
    
                <TouchableHighlight onPress={()=>{this.controlTabNavigator('Crm',1)}} underlayColor="white"
                style={{flex:1}}>

                <Text style={[styles.offPressFont, this.state.eyeSlash===1 && styles.onPressFont]} >
                CRM</Text>
                      
                </TouchableHighlight>
              
            </View>
            <View style={[styles.offTabCalendar, this.state.eyeSlash===2 && styles.onTabCalendar]}>
            <IconRequest name="question-answer" size={16} 
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
          <Text>Footer</Text>
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
        backgroundColor:"rgb(245,245,245)"
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
        color:"rgb(139,179,75)",
        fontWeight:'bold'
      },
      offIcon:{
        alignSelf:"center",
        color:"rgb(184,184,184)",
        marginLeft:10
      },
      onIcon:{
        alignSelf:"center",
        color:"rgb(139,179,75)",
        marginLeft:10
      }
});
SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;