import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native"

export default class ClosedActivities extends Component{
    

      
    renderItem = ({item}) => {
        
        return(
            <View style={styles.card}>
                <Text style={{margin:10,fontSize:16}}>{`Descripción:  ${item.observations}`}</Text>
                <Text style={{color:"rgb(5,172,238)",alignSelf:"flex-end",marginRight:10,}}>TERMINADA</Text>
            </View>
        )
    }
    
    _listEmptyComponent = () => {
        return(
            <View>
                <Text style={{alignSelf:"center",fontSize:16}}>No hay actividades cerradas</Text>
            </View>
        )
        
    }

    renderFooter = () => {
        
    
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

    render(){
        return(
            <FlatList
                data={this.props.closedActivitiesList}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={this._listEmptyComponent}
                //ListFooterComponent={this.renderFooter}
            />
        )
    }
}

const styles = StyleSheet.create({
    info:{
        flexDirection:"row",
        marginTop:5,
        marginBottom:5,
        marginLeft:10
    },
    titleInfo:{
        fontSize: 16,
    },
    title:{
        fontSize: 18,
        color:"#a3c51a",
        fontWeight: 'bold'
    },
    textInfo:{
        fontSize: 16,
        marginLeft:5,
        color:"rgb(184,184,184)",
        fontWeight: 'bold'
    },
    
    card:{
        borderRadius: 5,
        
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        backgroundColor: '#fff', 
        elevation: 5,
        margin:5
    }
})