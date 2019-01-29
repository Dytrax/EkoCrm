import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native"
import moment from 'moment'
export default class OpportunityList extends Component{
    

      
    renderItem = ({item}) => {
        
        return(
            <TouchableOpacity onPress={()=>{this.props.onPressOpportunity(item)}} onLongPress={()=>{this.props.onLongPressOpportunity(item)}} 
            style={styles.card}
            
            >
                <View style={styles.info}>
                    <Text style={[styles.title]}>Título:</Text>
                    <Text style={[styles.title, {marginLeft:5}]}>{item.title}</Text>
                </View>
                <View  style={styles.info}>
                    <Text style={styles.titleInfo}>Cliente:</Text>
                    <Text style={styles.textInfo}>{item.client}</Text>
                </View>
                <View  style={styles.info}>
                    <Text style={styles.titleInfo}>Fecha:</Text>
                    <Text style={styles.textInfo}>{moment(item.dateInit).format('YYYY/MM/DD h:mm a')
                    //new Date(item.dateInit).toLocaleString()
                    }</Text>
                </View>
                <View  style={styles.info}>
                    <Text style={styles.titleInfo}>Estado:</Text>
                    <Text style={styles.textInfo}>{item.opportunityState}</Text>
                </View>
                <View  style={styles.info}>
                    <Text style={styles.titleInfo}>Productos:</Text>
                    <Text style={styles.textInfo}>{item.crm_products}</Text>
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
                <Text style={{alignSelf:"center",fontSize:16}}>No hay oportunidades creadas</Text>
            </View>
        )
        
    }
    render(){
        return(
            <FlatList
                data={this.props.OpportunityList}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={this._listEmptyComponent}
                ListFooterComponent={this.renderFooter}
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