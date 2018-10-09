import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Alert,
    TouchableOpacity,
    Platform
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import DB from "../../storeData/storeData"
import API from "../../api/Api"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default class SolicitudScreen extends Component {
    constructor(){
        super()
        this.state = {
            dataSource: []
        }
    }

    async componentWillMount(){
        const token = await DB.getData("token");
        const answer = await API.getRequest(token);
        console.log(answer)
        let openRequest = answer[1].map(s=>{
            return {
                //empresasNames:
                id:s.id.toString(),
                companyName:s.businessName,
                pqrsCompanyAbiertas:s.pqrs.filter(p=>p.state===1),
                pqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0),
                pqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2),
                quantitypqrsCompanyAbiertas:(s.pqrs.filter(p=>p.state===1)).length,
                quantitypqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0).length,
                quantitypqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2).length,                 
                
            }
            

        }).sort((a,b)=>b.quantitypqrsCompanyEnProceso-a.quantitypqrsCompanyEnProceso)
        console.log("openRequest")
        console.log(openRequest)
        this.setState({
            dataSource:openRequest
        }) 
        
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              
              height: 1,
              width: WIDTH,
              backgroundColor: "#CED0CE",
              alignSelf:"center",
              //marginTop:"3%"
              //marginLeft: "5%",
            
              //marginTop:"3%",
              
              //marginRight:"5%"
            }}
          />
        );
      };

      renderHeader = () => {
        return <SearchBar placeholder="Buscar..." lightTheme round 
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={{shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius:2, //IOS
            backgroundColor: '#fff', 
            borderWidth:1, 
            borderRadius: 100,
            ...Platform.select({
            ios: {
                borderColor:"rgb(190,190,190)",
            },
            android: {
                borderColor:"rgb(190,190,190)",
            },
            }),
            
            width:WIDTH-20,
            elevation: 3,
            //height:45,
            alignSelf:"center"
            ,marginTop:5
            }}
        />;
      }; 

      GetItem (item) {
        console.log(item)
        this.props.navigation.navigate('SolicitudesCompanyTab', {
            itemCompanyName: item,
            dataSource:this.state.dataSource
          });
        //this.props.navigation.navigate("");
        //Alert.alert(item);
        
        }

      renderItem = ({item}) => {
        console.log({item})
         return(
            <TouchableOpacity style={{flexDirection:"row",
            borderRadius: 4,
            marginRight:"2%",
            marginLeft:"2%",
            marginBottom:"1%",
            marginTop:"2%",
            //borderColor: "black",
            //borderWidth: 1,
            height:80,
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 3, //IOS
            backgroundColor: '#fff', 
            elevation: 5
            
            
            }} onPress={()=>{this.GetItem(item.companyName)}}>

                <View style={{flex:3,
                borderRightWidth:1,borderRightColor:"#CED0CE",
                //backgroundColor:"red",
                alignItems:"center",
                justifyContent:"center",
                height:80}}>
                    <Text>{item.companyName}</Text>
                </View>
                <View style={{flex:1,height:80}}>
                    <View style={{flex:1,flexDirection:"row"}}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Icon name="folder-open" size={20}  
                            style={{marginLeft:3,color:"rgb(54,176,88)"}} 
                            />
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text>{item.quantitypqrsCompanyAbiertas}</Text>
                        </View>
                        
                        
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Icon name="clock-end" size={20}  
                                    style={{flex:1,marginLeft:3,color:"rgb(252,140,1)"}} 
                                    />
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text >{item.quantitypqrsCompanyCerradas}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Icon name="folder" size={20}  
                                    style={{flex:1,marginLeft:3,color:"rgb(226,65,55)"}} 
                                    />
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{flex:1}}>{item.quantitypqrsCompanyEnProceso}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </TouchableOpacity>
         )
            
            
         
        
        
    }
    
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="menu" size={30}  
                style={{flex:1,alignSelf:"center",marginLeft:10,color:"white"}} 
                onPress={()=>this.props.navigation.openDrawer()}/>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontWeight:"bold",fontSize:15,color:"white"}}>Solicitudes</Text>
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
                keyExtractor={item => item.id}
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
        backgroundColor:"rgb(138,200,1)",
        flexDirection:"row",
        width:WIDTH,
        
            
    },
    body:{
        flex:10,
        backgroundColor:"white",
        width:WIDTH,
        //padding:5,
        //paddingTop:10
        //alignItems:"center",
        //justifyContent:"center",
    },
    /* titleAndDate:{
        justifyContent:"space-between"
        data={list}
                    renderItem={this.renderItem}
    } */
})