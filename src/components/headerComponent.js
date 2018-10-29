import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    
    
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements'
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function HeaderComponent(props){
    return(
                 <View style={styles.header}>
                        <View style={{flex:10,justifyContent:"center"}}>
                            <Icon2 name={props.name} size={30}  
                            style={{marginLeft:10,color:"white",}} 
                            onPress={props.actionIcon}/>
                        </View>
                        
                        
                        <View style={{flex:90,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontWeight:"bold",fontSize:15,color:"white"}}>{props.titulo}</Text>
                        </View>
                        {props.showSearch===true ? (
                            <View style={{flex:10,alignItems:"flex-end",justifyContent:"center"}}>
                            
                                <SearchBar
                                    
                                    round
                                    containerStyle={[styles.containerStyleClickOff, props.state===true && styles.containerStyleClick ]}
                                    inputStyle={{backgroundColor: 'white',}}
                                    inputContainerStyle={{backgroundColor: 'white'}}
                                    onChangeText={(text)=> props.actionSearchBar(text)}
                                
                                    /> 
                        
                            </View>
                            ) : (
                            <View style={{flex:10,alignItems:"flex-end",justifyContent:"center"}}>
                    
                            </View>
                        )}   
                        
                    
                </View>
    )
}

const styles =  StyleSheet.create({
    header:{
        flex:1,
        backgroundColor:"#a3c51a",
        //backgroundColor:"rgb(138,200,1)",
        flexDirection:"row",
        width:WIDTH,
        minHeight:14,
        
        ...Platform.select({
        ios: {  paddingTop: 12},
        
        }),
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 6, //IOS
        //backgroundColor: '#fff', 
        elevation: 5
        
        
    },
    containerStyleClick:{
        backgroundColor:"#a3c51a",
    borderTopColor:"transparent",
    borderBottomColor:"transparent",
    width:WIDTH-50},
    containerStyleClickOff:{
        backgroundColor:"#a3c51a",
        borderTopColor:"transparent",
        borderBottomColor:"transparent",
        width:WIDTH-250}
})

export default HeaderComponent; 