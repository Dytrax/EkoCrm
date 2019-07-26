import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Header from '../components/headerComponent'
import styles from './tabsCRM/styleCRM'
import InputComponent from './tabsCRM/inputPrueba'
import Icon2 from "react-native-vector-icons/MaterialIcons";
import API from '../../api/Api'
import DB from '../../storeData/storeData'
import {connect} from 'react-redux'
import * as actions from '../../Redux/actionCreators/actions'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment'
//+57 (350) 503-4013
//+57 (350) 503-4013
class AddSolicitud extends Component{
    constructor() {
        super()
        this.state={
            data:[],
            typeSolicitudes:[],
            title:'',
            description:''
            
        }
    }
    async componentDidMount(){
        
        const token = await DB.getData("token");
        console.log(token)
        const clientesEjecutivo = await API.getClients(token)
        console.log(clientesEjecutivo,"Clientes")
        const tipoSolicitudes = await API.getTipoSolicitudes(token)
        console.log(tipoSolicitudes,'Tipos Solicitudes')
        var pruebaDataClientesEjecutivo = clientesEjecutivo[1].map(item => {
            item.contracts.map(item => {
                item.isSelect = false;
                item.selectedClass = styleCreateOpportunity.list;
                return item;
              })
            //item.isSelect = false;
            //item.selectedClass = styleCreateOpportunity.list;
            return item;
          })
          console.log('EPA COLMBIA ', pruebaDataClientesEjecutivo)
        //console.log(clientesEjecutivo[1])
        console.log(clientesEjecutivo,"Clientes")
        this.setState({
            data:clientesEjecutivo,
            typeSolicitudes:tipoSolicitudes[1]
        })
        //console.log(clientesEjecutivo)
        console.log("dejodjoejod")
    }
    stateChange = (stateToChange, value) => {
        /*   this.state[stateToChange] = value; */
        this.setState({ [stateToChange]: value });
      };


    filtrarPorState = (obj) => {
        if ( obj.contracts.isSelect === true ){
            return true
        }else{
            return false
        }
    }

    renderListClientSelected = ({item}) =>{
        //console.log(item)
        return(
        <TouchableWithoutFeedback //onPress={()=>{this.selectItem(item)}}
        >
        
        <View style={[{backgroundColor:"white",padding:10,margin:2},styleCreateOpportunity.list ]}>
            <View style={{alignSelf:"center",width:"90%",flexDirection:'row'}}>
                {
                    //item.contratos ? <Text style={{marginRight:10,color:'green'}}>{item.contratos.length}</Text> : null
                }
                {<Text style={{ }}>{`${item.businessName}`}</Text>}
                {
                    /* item.contracts.filter(this.filtrarPorState).length>0 ? <Text style={{marginRight:10,color:'green'}}>{item.contracts.filter(this.filtrarPorState).length} </Text> :
                    null */
                }
                {
                   /*  console.log(item.filter(this.filtrarPorState)) */
                }
                
                
            </View>
        
        </View>
        
        </TouchableWithoutFeedback>
        )
    }

    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View >
            <Text style={{ textAlign: 'center' }}>Aún no asigna ningun cliente</Text>
          </View>
        );
      };

      TipoSolicitudes = () => {
          this.props.navigation.navigate('SeleccionarTipoSolicitud',{
            typeSolicitudes:this.state.typeSolicitudes
          })
      }
    crearSolicitud = async () => {
        const token = await DB.getData("token");
        var clients = []
        var contracts2 = []
        var id = ''
        
        this.props.cliente.map(clientes=>{
            clientes.contracts.map(contratos=>{
                if(contratos.isSelect){
                    id = clientes.user_clients[0].id
                    contracts2.push(contratos.number)
                }
            })
            var data = {
                clientId: id,
                contracts: contracts2
              } 
            clients.push(data)
            id= ''
            contracts2=[]
        })
       /*  const postCrearSolicitud  = 
        await API.createSolicitud(this.props.typeSolicitud.codigo,
            clients,moment().format(),this.state.description,this.state.title,token) */
        var solicitudCompleta = {
            
            codigo:this.props.typeSolicitud.codigo,
            title:this.state.title,
            description:this.state.description,
            dateInit:moment().format(),
            contracts:clients
        }
        console.log(solicitudCompleta)
    }
    
    render(){
        return(
            
            <View style={styles.container}>
                


                
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={false}
                    titulo={"Crear Solicitud"} 
                    name={"menu"}
                    actionIcon={()=>this.props.navigation.openDrawer()}
                    //state={this.state.searchBar}
                    //actionSearchBar={this.searchMethods}

                    />
                    
                </View>
                
                <View style={[styles.bodyContainer]}>
                    
                <TouchableOpacity onPress={()=>{this.TipoSolicitudes()}}>
                    <View style={{flexDirection:"row",backgroundColor:"white",marginTop:15,
                    marginBottom:15,padding:10,borderBottomWidth:0.7,borderTopWidth:0.7,
                    borderColor:'rgb(143,143,143)'}}>
                        <View style={{alignSelf:"center",width:"70%"}}>
                            <View style={{}}>
                                <Text style={{color:'rgb(99,99,99)',fontWeight:"bold", fontSize:16,}}>TIPO DE SOLICITUD</Text>
                            </View>
                           <View style={{marginTop:10}}>
                                {
                                    !this.props.typeSolicitud.codigo ? (
                                        <Text style={{color:'rgb(133,133,133)'}}>Selecciona el tipo de solicitud *</Text>
                                    ): (
                                        <Text style={{color:'rgb(133,133,133)'}}>{`${this.props.typeSolicitud.codigo} - ${this.props.typeSolicitud.descripcion}`}</Text>
                                    )
                                }
                                
                            </View> 
                        </View>
                        <View style={{justifyContent:"center",alignItems:"flex-end",width:"30%"}}>
                            
                            <Icon  name='ios-arrow-forward' size={30} color='rgb(144,184,54)'/>
                            
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[{width:"90%",alignSelf:"center",borderWidth:1,borderColor:"#a3c51a",marginTop:10,justifyContent:'center',alignItems:'center',paddingVertical:20},styleCreateOpportunity.card]}>
                
                    <View style={{alignSelf:'center',width:'100%',marginLeft:'10%',marginBottom:20}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Título *"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"title"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={""}
                                        iconType={"font-awesome"}
                                        iconName={"file-text-o"}
                                        iconSize={25}
                                        />
                    </View>
                    <View style={{alignSelf:'center',width:'100%',marginLeft:'10%'}}>
                                <InputComponent 
                                        width={"100%"}
                                        texto={"Descripción *"} 
                                        mensajeError={"Campo Requerido"} 
                                        state={"description"}
                                        stateChange={this.stateChange}
                                        type={"default"}
                                        value={""}
                                        iconType={"font-awesome"}
                                        iconName={"file-text-o"}
                                        iconSize={25}
                                        />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View></View>
                    </View>
                    </View>
                    <View style={[{width:"90%",borderWidth:1,borderColor:"#a3c51a",padding:10,marginTop:22,alignSelf:'center'},styleCreateOpportunity.card]}>
                    
                    
                     <View style={{ maxHeight: 150,marginVertical:10,padding:10}}>
                        <FlatList
                            data={this.props.cliente}
                            renderItem={this.renderListClientSelected}
                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={this.ListEmpty}
                            //extraData={this.state}
                        /> 
                    </View>  
                    {/* <FlatList
                            data={this.props.cliente}
                            renderItem={this.renderListClientSelected}
                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={this.ListEmpty}
                            //extraData={this.state}
                        />  */}
                    <RaisedTextButton title='Asignar Clientes' color= 'rgb(144,184,54)'
                        alignSelf={'center'} titleColor='rgb(255,255,255)' 
                        width={'90%'}
                        onPress={()=>{this.props.navigation.navigate('SeleccionarClientes', 
                        {
                        Data: this.state.data[1],
                        });
                        console.log(this.state.data[1],'DATOSSSS ARREGLO')
                        }
                        } 
                        />
                        <View style={{marginBottom:5}}/>
                    </View>
                    
                   
                    
                
                    
                </View>
                <View style={{marginTop:10}}/>
                <RaisedTextButton title='Crear Solicitud' color= 'rgb(144,184,54)'
                        alignSelf={'center'} titleColor='rgb(255,255,255)' 
                        width={'90%'}
                        onPress={()=>{this.crearSolicitud()}} 
                        />
                        <View style={{marginBottom:10}}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cliente : state.cliente,
        typeSolicitud : state.typeSolicitud,
    }
}

export default connect(mapStateToProps,actions)(AddSolicitud); 

const styleCreateOpportunity = StyleSheet.create({
    card:{
        borderRadius: 5,
        
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        backgroundColor: '#fff', 
        elevation: 5,
        paddingLeft:5
    },
    list:{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        
        elevation: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
    }
})