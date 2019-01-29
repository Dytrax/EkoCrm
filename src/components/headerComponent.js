import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableWithoutFeedback
    
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements'
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function HeaderComponent(props){
    return(
                 <View style={styles.header}>
                    
                                <TouchableWithoutFeedback 
                                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                                onPress={props.actionIcon}   
                                
                                >   
                                        <View style={{width:40,alignItems:"center",justifyContent:"center"}}>
                                            <Icon2 name={props.name} size={30}  
                                                style={{color:"white",}} 
                                                
                                                />

                                        </View>
                                        

                                    
                                        
                                    
                                    
                                </TouchableWithoutFeedback>
                                
                            
                        {/* <View style={{flex:10,alignItems:"center",justifyContent:"center",backgroundColor:"yellow"}}>
                            <TouchableWithoutFeedback 
                            hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                            onPress={props.actionIcon}    
                            >   
                                <View>
                                    <Icon2 name={props.name} size={30}  
                                        style={{marginLeft:10,color:"white",}} 
                                        
                                        />

                                </View>
                                    
                                
                                
                            </TouchableWithoutFeedback>
                            
                        </View> */}
                        
                        {props.bigTitle===true ? (
                            <View style={{flex:80,alignItems:"center",justifyContent:"center"}}>
                                <Text numberOfLines={1} style={{fontWeight:"bold",fontSize:15,color:"white",width:160}}>{props.titulo}</Text>
                            </View>
                        ) : (
                            <View style={{flex:80,alignItems:"center",justifyContent:"center"}}>
                                <Text style={{fontWeight:"bold",fontSize:15,color:"white"}}>{props.titulo}</Text>
                            </View>
                        )  
                        
                        }
                        
                        {props.showSearch===true  ? (
                            
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
                            <View style={{flex:10}}></View>
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
        width:110}
})

export default HeaderComponent; 