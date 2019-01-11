import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Alert

} from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import ArchivesFilesList from "./pqr_archives_list"
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import API from "../../api/Api"
import DB from "../../storeData/storeData"
import Header from "../components/headerComponent"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import moment from 'moment'
//import Icon3 from "react-native-vector-icons/MaterialIcons";
const resetAction = StackActions.reset({
    //routeName: 'SolicitudesCompanyTab',PruebaScreen
    index: 0,
    //key:null,
    actions: [NavigationActions.navigate({ routeName: 'SolicitudesCompanyTab'})],
  });

  
export default class PruebaScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataFlatListArchives:[],
            dataFlatList:[],
            dataSource: [],
            titleProblem:"",
            text: '', 
            height: 0,
            closeActivated:false,
            token:"",
            pantallaPrevia:"",
            modalVisible: false,
        }
        
    }
    
    async componentWillMount(){
        
        
        let token = await DB.getData("token");
        //let itemId = await DB.getData("itemId");
        //const ItemChat = this.props.navigation.getParam('itemChat');
        const pantallaPrevia = this.props.navigation.getParam('pantalla');
        const data = this.props.navigation.getParam('dataSource');
        console.log("data ")
        console.log(data["pqr_archives"])
        console.log(data["pqr_tracings"])
        console.log(data["pqr_tracings"].sort((a,b)=>b.id-a.id))
        this.setState({
            token:token,
            pqrId:data["id"],
            dataFlatList:data["pqr_tracings"],
            dataFlatListArchives:data["pqr_archives"],
            dataSource:data,
            titleProblem:data["title"],
            pantallaPrevia:pantallaPrevia
        })
        
        
        
          
       

    }
    

    renderItem = ({item}) => {
        return(
        <View style={{flexDirection:"row",
        borderRadius: 4,
        marginBottom:5,
        marginTop:3,
        marginLeft:5,
        marginRight:5,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        backgroundColor: '#fff', 
        elevation: 5,
        width:WIDTH-50,
        alignSelf:"flex-end"}}>
            
            <View style={{flex:95}}>
                <Text style={styles.renderViewStyle}>Yo</Text>
                <Text style={styles.renderViewStyle}>{item.description}</Text>
                <Text style={styles.renderViewStyle}>{moment(item.dateExecution).format('YYYY/MM/DD h:mm a')
                    //new Date(item.dateExecution).toLocaleString()
                    }</Text>
            </View>
            <View style={{flex:0.5}}>
                        <View  
                            style={{flex:1,
                            
                            backgroundColor:"green",
                            
                            }}/>
            </View>
        </View>
        )
    }

    actionBar = (text) =>{
        let barText = text

        
        let datos = this.state.copyDataSource.filter(
            
            s=>{
                return s.title.toUpperCase().search(text.toUpperCase()) != -1
            }
            
        )
        
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
    scrollToIndex = () => {
        let listSize=this.state.dataFlatList.length
        if(listSize!=0){
            console.log(listSize)
            //let randomIndex = Math.floor(Math.random(Date.now()) * this.props.data.length);
            this.flatListRef.scrollToIndex({animated: true, index: listSize-1});
        } 
        
      }
      
    send = async () =>{
        console.log(this.state.text)
        var date = new Date().toISOString()
        let answer = await API.chatPost(date,this.state.text,this.state.pqrId,this.state.token)
        console.log(answer[1])
        if (answer[0]===201){
            
            this.props.navigation.dispatch(resetAction);
            
        }else if(answer[0]==403){
            //Removing the token if the token isn`t still alive
            await DB.removeItemValue("token")
            //if token fail go to Login='Home'
            this.props.navigation.navigate('Home')
            
        }
    }
    closeAlert = () => {
        Alert.alert(
            'Cerrar Solicitud',
            '¿Estás seguro que deseas dar cierre a la solicitud?',
            [
              {text: 'Aceptar', onPress: () => this.close()},
              {text: 'Cancelar', onPress: () => null},
              
            ],
            { cancelable: false }
          )
    }
    close = async () => {
        var date = new Date().toISOString()
        let answer = await API.chatPostClose(date,this.state.text,this.state.pqrId,this.state.token)
        console.log(answer[1])
        if (answer[0]===201){
            this.props.navigation.dispatch(resetAction); 
            
        }else if(answer[0]==403){
            //Removing the token if the token isn`t still alive
            await DB.removeItemValue("token")
            //if token fail go to Login='Home'
            this.props.navigation.navigate('Home')
            
        }
    }
    resetToDashboard = () => {
        this.props.navigation.navigate('SolicitudesCompanyTab');
         
          //this.props.navigation.dispatch(resetAction);
		 
	}
    render(){
        return (
            
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={false}
                    titulo={this.state.titleProblem} 
                    name={"keyboard-backspace"}  
                    actionIcon={this.resetToDashboard} 
                    state={this.state.searchBar}
                    actionSearchBar={this.actionBar}/>
                    
                </View>
                
                
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.subcontainer}> 
                <View style={styles.subcontainer}>

                
                <View style={[styles.bodyContainer]}>
                    <View style={styles.clientRequestContainer}>
                        <View style={{flex:0.5,backgroundColor:"#fff",alignContent:"center",}} >
                            <View  
                                style={{flex:1,
                                
                                backgroundColor:"red",
                                }}/>
                            </View>
                        <View style={{flex:93,marginLeft:6}} >
                            <Text>{`Super Admin # ${this.state.dataSource["userClientId"]}`}</Text>
                            <Text>{this.state.dataSource["description"]}</Text>
                            <Text style={{fontWeight:"bold"}}>Archivos Adjuntos</Text>
                            <ArchivesFilesList listArchives={this.state.dataFlatListArchives}/>
                            <Text style={{alignSelf:"flex-end"}}>{moment(this.state.dataSource["dateInit"]).format('YYYY/MM/DD h:mm a')
                                //new Date(this.state.dataSource["dateInit"]).toLocaleString()
                                }</Text>
                            
                        </View>
                    </View>
                        <FlatList
                        ref={(ref) => { this.flatListRef = ref; }}
                        data={this.state.dataFlatList.reverse()}
                        renderItem={this.renderItem}
                        //ListHeaderComponent={this.renderHeader}
                        keyExtractor={item => item.id.toString()}
                        //onEndReachedThreshold={0.5}
                        
                        //ItemSeparatorComponent={this.renderSeparator}
                        />
                </View>
                {this.state.pantallaPrevia === "pqrsCompanyCerradas" ? (
                    null
                ) : (
                    <View style={[styles.footerContainer,{maxHeight:70,height: Math.max(45, this.state.height+10),}]}>
                    
                   
                    <View style={{
                        backgroundColor:"rgb(245,245,245)",
                        justifyContent:"center",
                        alignContent:"center",
                        borderRadius: 5,
                        maxHeight:70,
                        //width:WIDTH-100,
                        //position:"absolute",
                        }}>
                        <TextInput 
                                borderWidth={1}
                                borderColor={"rgb(183,183,183)"}
                                onFocus={this.scrollToIndex}
                                //textAlign={"'center'"}
                                placeholder="Seguimiento..."
                                {...this.props} 
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({ text:text 
                                        
                                    })
                                    
                                    if (text.length>=1){
                                        this.setState({closeActivated:true})
                                        
                                    }else{
                                        this.setState({closeActivated:false})
                                    }
                                }}
                                onContentSizeChange={(event) => {
                                    this.setState({ height: event.nativeEvent.contentSize.height })
                                }}
                                style={[styles.textInputChat, {height: Math.max(30, this.state.height)}]}
                                value={this.state.text} 
                                />
                                                   
                    </View>
                    
                            {/* <TextInput style={{flex:90,backgroundColor:"white",height:40,}}></TextInput> */}
                            <View style={{flex:13,alignItems:"center",justifyContent:"center",backgroundColor:"rgb(245,245,245)",}}>
                                <Icon2  name="send" size={30} onPress={this.state.closeActivated===true?this.send:null}
                                style={[styles.offIcon, this.state.closeActivated===true && styles.onIcon]}></Icon2> 
                            </View> 
                            <View style={{flex:13,alignItems:"center",justifyContent:"center",backgroundColor:"rgb(245,245,245)",}}>
                                <Icon2  name="close-circle-outline" onPress={this.state.closeActivated===true?this.closeAlert:null} 
                                size={35} style={[styles.offIcon, this.state.closeActivated===true && styles.onIcon2]}></Icon2>
                            </View>
                            
                           
                    </View>
                )}
                
                    
                </View>
                
                
                </KeyboardAvoidingView>
                
            </View>
            
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
        //width:WIDTH,
        //height:HEIGHT
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
        backgroundColor:"#fff",
        padding:5,
        flex:95
    },
    footerContainer:{
        //flex:8,
        //height:40,
        flexDirection:"row",
        //backgroundColor:"rgb(2,87,23)",
        
    },
    clientRequestContainer:{
    flexDirection:"row",
    borderRadius: 4,
    marginBottom:5,
    marginTop:3,
    marginLeft:5,
    marginRight:5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 3, //IOS
    backgroundColor: '#fff', 
    elevation: 5,
    //width:WIDTH-50,
},

ChatContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        elevation: 5},

textInputChat:{
    paddingLeft:10,
    paddingRight:10,
    //position:"absolute",
    width:WIDTH-100,
    margin:5,
    //justifyContent:"center",
    //alignSelf:"center",
    //flex:90,
    //flex:1,
    backgroundColor:"white",
    //height:40,
    //padding:10,
    borderRadius: 5,
    //maxHeight:90,
    maxHeight:60,
    //width:WIDTH-80,
    //margin:1
    },
    offIcon:{
        color:"rgb(184,184,184)",
    },
    onIcon:{
        color:"rgb(2,87,23)"
    },
    onIcon2:{
        color:"rgb(213,138,33)"
    },
    renderViewStyle:{
        alignSelf:"flex-end", marginRight:6,marginLeft:6,
        textAlign:"justify"
    }
})