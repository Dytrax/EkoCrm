import React, {Component} from 'react'
import{
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    
} from 'react-native'
import { Container,  } from 'native-base';
import HeaderComponent from '../../components/headerComponent'
const WIDTH = Dimensions.get("window").width;

export default class Chat extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataFlatList:[],
            dataSource: [],
            titleProblem:"",
            searchBar:false,
            textSearchBar:"",
            copyDataSource: [],
            text: '', 
            height: 0,
            flexBody:10,
            stateKeyboard:false
            
        }
        
    }

    async componentWillMount(){
        const requestOpenSelected = this.props.navigation.getParam("openRequest")
        console.log(requestOpenSelected["pqr_tracings"])
        console.log(requestOpenSelected["title"])
        
         this.setState({
            dataFlatList:requestOpenSelected["pqr_tracings"],
            dataSource:requestOpenSelected,
            titleProblem:requestOpenSelected["title"]
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
            
            <View style={{flex:93}}>
                <Text style={{alignSelf:"flex-end", marginRight:6}}>Yo</Text>
                <Text style={{alignSelf:"flex-end", marginRight:6}}>{item.description}</Text>
                <Text style={{alignSelf:"flex-end", marginRight:6}}>{item.dateExecution}</Text>
            </View>
            <View style={{flex:7}}>
                        <View  
                            style={{height:14,width:14,
                            resizeMode:"contain",
                            backgroundColor:"green",
                            //alignSelf:'flex-start',
                            borderRadius:7,
                            marginTop:3,
                            marginLeft:5,
                            //marginBottom:5,
                            //position:"absolute",
                            
                            }}/>
            </View>
        </View>
        )
    }

    cambiarFlex = () =>{
        variable=true
        
        /* this.setState(
            {   
                //stateKeyboard:true,
                flexBody:6
            }
        ) */
    }
    
    render(){
        console.log(this.state.height)
        return(
            
            <View style={styles.container}>
                <HeaderComponent titulo={this.state.titleProblem} 
                name={"keyboard-backspace"} 
                //actionDrawer={this.myAction} 
                //state={this.state.searchBar}
                //text={this.state.barText}
                //actionSearchBar={this.actionBar}
                />
                
                <View style={{
                    flex:10,
                    backgroundColor:"white",
                    width:WIDTH,
                }}>
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
                    width:WIDTH-50,}}>
                        <View style={{flex:7,backgroundColor:"#fff",alignContent:"center"}} >
                        <View  
                            style={{height:14,width:14,
                            resizeMode:"contain",
                            backgroundColor:"red",
                            //alignSelf:'flex-start',
                            borderRadius:7,
                            marginTop:3,
                            marginLeft:5,
                            //marginBottom:5,
                            //position:"absolute",
                            
                            }}/>
                        </View>
                        <View style={{flex:93,}} >
                            <Text>{`Super Admin #${this.state.dataSource["userClientId"]}`}</Text>
                            <Text>{this.state.dataSource["description"]}</Text>
                            <Text style={{alignSelf:"flex-end"}}>{this.state.dataSource["dateInit"]}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.dataFlatList}
                        renderItem={this.renderItem}
                        //ListHeaderComponent={this.renderHeader}
                        keyExtractor={item => item.id.toString()}
                        //ItemSeparatorComponent={this.renderSeparator}
                    />
                    
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null}
                
                > 
                <View style={{ 
                flexDirection:"row",
                ...Platform.select({
                ios: {
                    backgroundColor: "green",
                },
                android: {
                    backgroundColor:"green",
                }}),
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 3, //IOS
                
                elevation: 5}}>
                        
                        <View style={{flex:90, 
                        alignItems:"center",
                        justifyContent:"center",
                        //padding:3,
                        height: Math.max(45, this.state.height+10),
                         maxHeight:100}}>
                            <TextInput  
                            
                            {...this.props}
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({ text:text })
                            }}
                            onContentSizeChange={(event) => {
                                this.setState({ height: event.nativeEvent.contentSize.height })
                            }}
                            style={[styles.default, {height: Math.max(35, this.state.height)}]}
                            value={this.state.text} 
                            />
                        </View>
                        
                        <View style={{flex:10}}>
                            
                        </View>
                </View>
                </KeyboardAvoidingView>
                
                
            </View>
            
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    body:{
        
        
        //alignItems:"center",
        //justifyContent:"center"
    },
    default:{
        backgroundColor:"white",
        //alignSelf:"center",
        paddingLeft:10,
        borderRadius: 5,
        maxHeight:90,
        width:WIDTH-50,
        margin:2,
        fontSize:16
    }
}
)