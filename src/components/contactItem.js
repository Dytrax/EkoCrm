import React from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native"

export default function ContactItem (props){
    callNumber = () =>{

    }
    return(
        <View>
        
            <View style={styles.contact}>
                <View style={styles.iconContainer} >
                    <View style={styles.circleContainer}></View>
                    
                        <Text style={styles.letter}  >{props.name[0]}</Text>
                    
                    
                </View>
                <View style={styles.nameContainer}>
                    <Text>{props.name}</Text>
                </View>
                <View style={styles.emailContainer}>
                    <Text>IcEmail</Text>
                </View>
                <View style={styles.phoneContainer} onPress={this.callNumber} >
                    <Text>{props.phone}</Text>
                </View>
            </View>
            <View style={styles.city}>
                <Text>{props.townName}</Text>   
            </View>
        </View>
        
    )
}
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
    city:{
        
        alignItems:"flex-end"
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
    }
})

