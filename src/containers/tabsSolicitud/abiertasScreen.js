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
    TouchableWithoutFeedback
} from 'react-native';
import {
    NavigationEvents,
    StackActions,
    NavigationActions
  } from 'react-navigation';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/headerComponent"
import DB from "../../../storeData/storeData"
import API from "../../../api/Api"
import moment from 'moment'
import ChatSolicitud from './chatSolicitud'
const resetAction = StackActions.reset({
    //routeName: 'SolicitudesCompanyTab',PruebaScreen
    index: 0,
    //key:null,
    actions: [NavigationActions.navigate({ routeName: 'Tab1'})],
  });
export default class AbiertasScreen extends Component{
    constructor(){
        super()
        this.state = {
            dataSource: [],
            companyName:"",
            searchBar:false,
            textSearchBar:"",
            copyDataSource: [],
            loadingData: true,
            //Nuevo...Abajo
            showChat:false,
            itemSelected:"",
            dataFlatList:"",
            pantallaPrevia:"",
            pqrId:"",
            token:"",
            dataFlatListArchives:[]
        }
        
    }
     async componentWillMount(){
        const token = await DB.getData("token");
        const itemId = await DB.getData("itemId");
        console.log("item selected: " + itemId )
        answer = await API.getRequest(token);
        if (answer[0]==200){
            let data = API.dataFilter(answer[1])
            console.log(data)
            let filtroData = data.filter(n=>n.id===itemId)
            console.log("filtroData")
            let companyName = filtroData[0]["companyName"]
            console.log(companyName)
            filtroData = filtroData[0]["pqrsCompanyAbiertas"];
            console.log("filtrado final")
            console.log(filtroData)
            this.setState({
                dataSource:filtroData,
                companyName:companyName,
                copyDataSource: filtroData,
                loadingData:false,
                //Nuevo ...Abajo
                token:token
            })
            console.log("this.state.companyName")
            console.log(this.state.companyName)
            
            
        }else if(answer[0]==403){
            //Removing the token if the token isn`t still alive
            await DB.removeItemValue("token")
            //if token fail go to Login='Home'
            this.props.navigation.navigate('Home')
            
        }

        
     }
        
     


     onItemClick (item) {
        
        //console.log("itemChat"+item.id)
        //DB.store("itemChat", item.id.toString());
        //DB.store("pantalla", "pqrsCompanyAbiertas");
        console.log("item")
        console.log(item)
        this.setState({
            showChat:true,
            titleProblem:item["title"],
            itemSelected:item,
            dataFlatListArchives:item["pqr_archives"],
            dataFlatList:item["pqr_tracings"],
            pantallaPrevia:"pqrsCompanyEnProceso",
            pqrId:item["id"],
        })
        /* this.props.navigation.navigate('PruebaScreen', {
            pantalla: "pqrsCompanyAbiertas",
            itemChat:item.id,
            dataSource:item
        }); */    
        
        
    }

    renderItem = ({item}) => {
        //console.log({item})
        console.log("item.dateInit " + item.dateInit)
         return(
         
            <TouchableWithoutFeedback onPress={()=>this.onItemClick(item)}>
                <View style={stylesList.container}>
                    <View style={stylesList.iconContainer}>
                        <Icon2 name="ray-start" size={20}  
                                    style={{marginLeft:3,color:"rgb(226,65,55)"}} 
                                    />
                    </View>
                    <View  style={stylesList.titleContainer}>
                        <Text style={stylesList.title}>{item.title}</Text>
                        <Text style={stylesList.message} numberOfLines={2}>{item.description}</Text>
                    </View>
                    <View style={stylesList.dateContainer}>
                        <Text style={stylesList.date}>{moment(item.dateInit).format('YYYY/MM/DD')
                                //new Date(item.dateInit).toLocaleString()
                                }</Text>
                        <Text style={stylesList.date}>{moment(item.dateInit).format('h:mm a')
                                //new Date(item.dateInit).toLocaleString()
                                }</Text>
                                
                    </View>

                </View>
                
            </TouchableWithoutFeedback> 
            
         
            

         )
                
    }
    
    
    actionBar = (text) =>{
        let barText = text

        
        let datos = this.state.copyDataSource.filter(
            
            s=>{
                return s.title.toUpperCase().search(text.toUpperCase()) != -1
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
    
    _listEmptyComponent = () => {
        return(
            <View style={{marginTop:"50%"}}>
                <Text style={{alignSelf:"center",fontSize:16}}>No hay solicitudes abiertas</Text>
            </View>
        )
        
    }

    stateChange = (stateToChange, value) => {
        
        //this.state[stateToChange] = value;

        var  tmp = {}
        tmp[stateToChange] = value
        this.setState(tmp)
        
        //console.log("this.state.stateChange")
        //console.log(this.state)
      }; 

      reset = () => {
        this.props.navigation.dispatch(resetAction);
      }
    
    render(){
        
        return(
            
            <View style={styles.container}>
                <ChatSolicitud
                states={this.state}
                stateChange={this.stateChange}
                reset={this.reset}
            />
            <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    titulo={this.state.companyName} 
                    name={"keyboard-backspace"}  
                    actionIcon={()=>{this.props.navigation.goBack(null)}} 
                    state={this.state.searchBar}
                    actionSearchBar={this.actionBar}
                    //bigTitle = {true}

                    />
                    
            </View>
           
            <View style={styles.subcontainer}>
                
                {this.state.loadingData ? (
                        <View style={[styles.body,styles.indicator]}>
                            <ActivityIndicator size="large" color="#ff0050" />
                        </View>
                        ) : (
                        <View style={styles.body}>    
                            <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={this._listEmptyComponent}
                            />
                        </View>
                        )}
                
                 

           
            </View>
            
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    subcontainer:{
        flex:1
    },
    headerContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: Platform.OS === 'android' ? 60 : 60,
    },
    body:{
        backgroundColor: '#fff', 
        flex:1,
        
    },
    indicator:{
        alignItems:"center",
        justifyContent:"center"
    }
})

const stylesList = StyleSheet.create({
    container:{
        margin:5,
        height:60,
        flex:1,
        flexDirection:"row",
        
        borderRadius: 4,
            
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 3, //IOS
            backgroundColor: '#fff', 
            elevation: 5,
            padding:5
    },
    iconContainer:{
        flex:10,
        justifyContent:"center",
        alignItems:"center",
        //backgroundColor:"red"
    },
    titleContainer:{
        flex:70,
        justifyContent:"center",
        alignItems:"flex-start",
        //backgroundColor:"yellow"
    },
    dateContainer:{
        flex:20,
        justifyContent:"center",
        alignItems:"flex-end",
    },
    title:{
        fontWeight:"bold",
        fontSize:14
    },
    date:{
        fontSize:12,
        
    },
    message:{
        width:200
    }
    
})