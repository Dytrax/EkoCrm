import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import API from "../../../api/Api"
import DB from "../../../storeData/storeData"
import Separator from "../../components/flatListComponents/horizontal-separator"
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default class AbiertasScreen extends Component{
    constructor(){
        super()
        this.state = {
            dataSource: [],
            

        }
    }
     async componentWillMount(){
        const data = this.props.navigation.getParam("dataSource")
        const itemid= this.props.navigation.getParam("itemId")
        console.log("Id Selected")
        console.log(itemid)
        console.log("data")
        console.log(data)
        let filtroData = data.filter(n=>n.id===itemid)
        console.log("filtroData")
        console.log(filtroData)
        
        filtroData = filtroData[0]["pqrsCompanyCerradas"];
        console.log("filtrado final")
        console.log(filtroData)
        this.setState({

        })
     }




        
    //<Text>Fecha</Text>
    //<Text>Company Name</Text>
    //renderItem={this.renderItem}
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: WIDTH,
              backgroundColor: "#CED0CE",
              //marginLeft: "14%"
            }}
          />
        );
      };


     renderItem = ({item}) => {
        console.log({item})
         return(
            <View style={{flexDirection:"row",margin:3,
            borderBottomWidth:1,borderBottomColor:"#CED0CE"}}>
            <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}}>
                <Text style={{color:"black",marginBottom:4}}>{item.title}</Text>
                <Text style={{color:"black"}}>{item.CompanyName}</Text>
                
                
            </View>
            
            <Text style={{color:"black",alignSelf:"flex-start"}}>{item.dateInit}</Text>
            </View>
         )
            
            
         
        
        
    }
    /* itemSeparator = ()=>{
        return(
            <Separator  ></Separator>
        )
    }  */

     renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
      }; 
    
    render(){
        
        return(
            
            <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="menu" size={30}  
                style={{flex:1,alignSelf:"center",marginLeft:10}} 
                onPress={()=>this.props.navigation.openDrawer()}/>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontWeight:"bold",fontSize:15}}>Abiertas</Text>
                </View>
                <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}}>
                {/* <Text>Buscar</Text> */}
                </View>
                
            </View>
            <View style={styles.body}>
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderHeader}
                //ItemSeparatorComponent={this.renderSeparator}
            />

            </View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:"center",
        //justifyContent:"center",   
    },
    container1:{
        flex:1
    },
    header:{
        flex:1,
        backgroundColor:"rgb(135,179,90)",
        flexDirection:"row",
        width:WIDTH,
            
    },
    body:{
        flex:10,
        backgroundColor:"white",
        width:WIDTH,
        //alignItems:"center",
        //justifyContent:"center",
    },
    /* titleAndDate:{
        justifyContent:"space-between"
        data={list}
                    renderItem={this.renderItem}
    } */
})