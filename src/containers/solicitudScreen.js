import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    
} from 'react-native'
import DB from "../../storeData/storeData"
import API from "../../api/Api"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/headerComponent"
export default class SolicitudScreen extends Component {
    constructor(){
        super()
        this.state = {
            searchBar:false,
            copyDataSource: [],
            dataSource: [],
            loadingData: true,
        }
    }

    async componentWillMount(){
        //Getting the token from AsyncStorageDatabase
        const token = await DB.getData("token");
        //Getting "La Información de Solicitudes" from the BackendApi
        const answer = await API.getRequest(token);
        //console.log(answer)
        if (answer[0]==200){
            let openRequest = answer[1].map(s=>{
                return {
                    //Filtering the information and forming the Json if the token still alive
                    id:s.id.toString(),
                    companyName:s.businessName,
                    pqrsCompanyAbiertas:s.pqrs.filter(p=>p.state===1),
                    pqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0),
                    pqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2),
                    quantitypqrsCompanyAbiertas:(s.pqrs.filter(p=>p.state===1)).length,
                    quantitypqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0).length,
                    quantitypqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2).length,                 
                    
                }
                
                //Sorting the Json 
            }).sort((a,b)=>b.quantitypqrsCompanyEnProceso-a.quantitypqrsCompanyEnProceso)
            /* console.log("openRequest")
            console.log(openRequest) */
            this.setState({
                copyDataSource:openRequest,
                dataSource:openRequest,
                loadingData:false
            }) 
        }else if(answer[0]==403){
            //Removing the token if the token isn`t still alive
            await DB.removeItemValue("token")
            //if token fail go to Login='Home'
            this.props.navigation.navigate('Home')
            
        }
        
        
    }


    onItemClick (item) {
        console.log("Item Selected")
        console.log(item)
        //SolicitudesCompanyTab
        DB.store("itemId", item);
        this.props.navigation.navigate('SolicitudesCompanyTab', {
            //itemId: item,
            //dataSource:this.state.dataSource
          });
        
        
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
            
            
            }} onPress={()=>{this.onItemClick(item.id)}}>

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
                            <Icon2 name="folder-open" size={20}  
                            style={{marginLeft:3,color:"rgb(54,176,88)"}} 
                            />
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text>{item.quantitypqrsCompanyAbiertas}</Text>
                        </View>
                        
                        
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Icon2 name="clock-end" size={20}  
                                    style={{flex:1,marginLeft:3,color:"rgb(252,140,1)"}} 
                                    />
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text >{item.quantitypqrsCompanyEnProceso}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Icon2 name="folder" size={20}  
                                    style={{flex:1,marginLeft:3,color:"rgb(226,65,55)"}} 
                                    />
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{flex:1}}>{item.quantitypqrsCompanyCerradas}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </TouchableOpacity>
         )
            
            
         
        
        
    }

    actionBar = (text) =>{
        let barText = text
        let datos = this.state.copyDataSource.filter(
            
            s=>{
                return s.companyName.toUpperCase().search(text.toUpperCase()) != -1
            }
            
        )
        /* console.log("datos")
        console.log(datos)
        console.log("barText.length")
        console.log(barText.length)
        console.log("barText")
        console.log(barText) */
        if (barText.length>0){
            this.setState({
                searchBar:true,
                dataSource:datos
            })
        }else{
            this.setState({
                searchBar:false,
                dataSource:datos
            })
        }
        
    }

    render(){
          
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    titulo={"Solicitudes"} 
                    name={"menu"} 
                    actionIcon={()=>this.props.navigation.openDrawer()}
                    state={this.state.searchBar}
                    actionSearchBar={this.actionBar}/>
                    
                </View>
                
                <View style={styles.subcontainer}>
                <View style={[styles.bodyContainer]}>
                    {this.state.loadingData ? (
                        <View style={[styles.body,styles.indicator]}>
                            <ActivityIndicator size="large" color="#ff0050" />
                        </View>
                        ) : (
                        <View style={styles.body}>    
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        )}   
                </View>
                    
                </View>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    subcontainer:{
        flex:1
    },
    headerContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: Platform.OS === 'android' ? 60 : 60,
    },
    bodyContainer:{
        flex:90
    },
    body:{
        flex:1,
    },
    indicator:{
        alignItems:"center",
        justifyContent:"center"
    }
})