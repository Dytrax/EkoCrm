import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'

const color = {
    0:"blue",
    1:"red"
}
const activity = {
    0:"Cerrada",
    1:"Pendiente"
}
export default class ActivitiesDayList extends Component{
    renderItem = ({item}) => {
        //onPress={()=>{this.props.onPressOpportunity(item)}}
        return(
            <TouchableOpacity  
            onPress={()=>{this.props.onPressActivity(item)
                this.props.stateChange("activitiesDayModal",false)
                }}
            style={[styles.card,{flexDirection:"row",alignItems:"center"}]}
            
            >
           
            <View style={[styles.CircleShapeView,{backgroundColor:color[item.state]}]}>
            </View>
            <Text>{item.observations} ({activity[item.state]})</Text>
            
            </TouchableOpacity>
        )
    }

    
    _listEmptyComponent = () => {
        return(
            <View>
                <Text style={{alignSelf:"center",fontSize:16}}>No hay actividades </Text>
            </View>
        )
        
    }
    render(){
        return(
            <FlatList
                data={this.props.dataOnClickDay}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={this._listEmptyComponent}
                //ListFooterComponent={this.renderFooter}
            />
        )
    }
}

const styles = StyleSheet.create({
    CircleShapeView: {
        margin:10,
        width: 20,
        height: 20,
        borderRadius: 20/2,
        //backgroundColor: '#00BCD4'
    },
    card:{
        borderRadius: 5,
        margin:10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        backgroundColor: '#fff', 
        elevation: 5,
        paddingLeft:5
    }
})