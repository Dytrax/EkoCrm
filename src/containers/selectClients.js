import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import Header from '../components/headerComponent'
import styles from './tabsCRM/styleCRM'
import InputComponent from './tabsCRM/inputPrueba'
import Icon2 from "react-native-vector-icons/MaterialIcons";
import {connect} from 'react-redux'
import * as actions from '../../Redux/actionCreators/actions'
import ContractModal from './selectContractModal'
import Button from './../components/buttonCircle'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
class SelectClients extends Component{
    constructor(props) {
        super(props)
        this.state = {
        modal:false,
        loading: false,
        dataSource: [],
        contracts: [],
        clients:[],
        clientSelect:'',
        contractsSelect:[],
        indexClient:''
         };
      }

    componentDidMount(){
        console.log('hsxihiswxhixhiwhx')
        const { navigation } = this.props;
        const Data = navigation.getParam('Data', 'NO-DATA')
        
       /*  .map(item => {
            item.isSelect = false;
            item.selectedClass = styleCreateOpportunity.list;
            return item;
          }); */
        console.log(Data)


        /* let liste = Data.filter(item =>{
            let x=item.contracts.filter(i2=>{
                return i2.isSelect == true
            })
            return  (x.length>0) 
        }) */
        //let list = Data.filter(item =>item.contracts.filter(i2=>i2.isSelect == true).length>0)

        //console.log(listed)
        //console.log(list)

        this.setState({
            dataSource:Data
        })
        
    }


     filtrarPorState = (obj) => {
        if ('isSelect' in obj && obj.isSelect === true ){
            return true
        }else{
            return false
        }
    }


    stateChange = (stateToChange, value) => {
        /*   this.state[stateToChange] = value; */
        this.setState({ [stateToChange]: value });
      };

      renderItem = ({item}) =>{
        //console.log(item)
        return(
        <TouchableWithoutFeedback onPress={()=>{this.selectItem(item)}}
        //onPress={()=>{this.reduxerStateChaange(item)
        //this.props.navigation.goBack()}}
        //esto es importante      item.selectedClass esto es importante
        >
        
        <View style={[{backgroundColor:"white",marginBottom:5,padding:10},styleCreateOpportunity.list ]}>
            <View style={{alignSelf:"center",width:"90%",flexDirection:'row'}}>
                {
                    //item.contratos ? <Text style={{marginRight:10,color:'green'}}>{item.contratos.length}</Text> : null
                }
                {
                    item.contracts.filter(this.filtrarPorState).length>0 ? <Text style={{marginRight:10,color:'green'}}>{item.contracts.filter(this.filtrarPorState).length} </Text> :
                    null
                }
                <Text style={{ }}>{`${item.businessName}`}</Text>
                
            </View>
        
        </View>
        
        </TouchableWithoutFeedback>
        )
    }

    renderListContracts = ({item}) =>{
        //console.log(item)
        return(
        <TouchableWithoutFeedback onPress={()=>{this.selectContract(item)}}
        //onPress={()=>{this.reduxerStateChaange(item)
        //this.props.navigation.goBack()}}
        >

            
        <View style={[{backgroundColor:"white",marginBottom:5,padding:10}, item.selectedClass]}>
            <View style={{alignSelf:"center",width:"90%"}}>
                
                <Text style={{ }}>{`${item.number}`}</Text>
                
            </View>
        
        </View>
        </TouchableWithoutFeedback>
        )
    }

    selectItem = data => {
        
        this.setState({
            modal:true,
            clientSelect:data.contracts
        })
       
      const index = this.state.dataSource.findIndex(item => data.id === item.id);
     
       this.setState({
        indexClient:index,
        contracts: data.contracts
       }); 
      };

      selectContract = data => {
          console.log('DATA')
          console.log(data)
          var arregloContratos = this.state.contractsSelect
          if (arregloContratos.includes(data)){
              console.log('entro')
              var indexData = arregloContratos.indexOf(data)
              arregloContratos.splice(indexData, 1);
          }else{
            arregloContratos.push(data)
          }
          
        
        data.isSelect = !data.isSelect;
        data.selectedClass = data.isSelect
         ? styleCreateOpportunity.sombra: styleCreateOpportunity.list;
       
       /* const index = this.state.dataSource.findIndex(
         item => data.item.id === item.id
      ); */
      const index = this.state.contracts.findIndex(item => data.id === item.id);
      //console.log(index)
      /* this.state.dataSource[this.state.indexClient].contracts.map(item => {
        return item;
      })
      

      console.log(this.state.dataSource) */
     


      this.state.dataSource[this.state.indexClient].contratos = arregloContratos;
      this.state.contracts[index] = data;
       this.setState({
        dataSource: this.state.dataSource,
        contracts: this.state.contracts,
        contractsSelect: arregloContratos
       }); 
       console.log('datasource')
       console.log(this.state.dataSource)
       
      };
     
    closeModal = () => {
        /* console.log(this.state.dataSource.filter(function (obj) {
            
            for (item in obj.contracts){
                 return obj.contracts[item].isSelect === true
            }
        })) */
        /* console.log()
        var clients = this.state.clients
        var data = {
            compnayId: this.state.clientSelect, //'ejecutivo@leadis.co',
            contracts: this.state.contractsSelect //'Hola@321',
          }
        clients.push(data)

        
          console.log(data) */
        this.setState({
            modal:false,
            //clientSelect:'',
            //contractsSelect:[],
            //clients: clients
        })
        /* console.log(clients)
        console.log(this.state.dataSource) */
    }

    aceptarButton = () =>{
        let list = this.state.dataSource.filter(item =>item.contracts.filter(i2=>i2.isSelect === true).length>0)
        
        console.log(list)
        this.props.setClient(list)
        console.log(this.props)
        this.props.navigation.navigate('CrearSolicitudScreen')}
    render(){
        /* const { navigation } = this.props;
        const Data = navigation.getParam('Data', 'NO-DATA').map(item => {
            item.isSelect = false;
            item.selectedClass = styleCreateOpportunity.list;
            return item;
          }); */



        return(
            
            <View style={styles.container}>


                

                <ContractModal
                modal={this.state.modal}
                action={this.closeModal}
                >   
                    <View style={{marginVertical:5}}>
                        <Text style={{alignSelf:'center',fontWeight:'bold'}}>Seleciona los contratos</Text>
                    </View>
                    
                    <FlatList
                            data={this.state.contracts}
                            renderItem={this.renderListContracts}
                            keyExtractor={item => item.id.toString()}
                            extraData={this.state}
                        />
                </ContractModal>
                
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={false}
                    titulo={"Seleccionar Clientes"} 
                    name={"keyboard-backspace"}
                    actionIcon={()=>this.props.navigation.goBack()}
                    //state={this.state.searchBar}
                    //actionSearchBar={this.searchMethods}

                    />
                    
                </View>
                
                <View style={[styles.bodyContainer]}>
                    <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id.toString()}
                            extraData={this.state}
                        />
                    <View style={{marginBottom:10}}>
                        {/* <Button size={'90%'} text={'Aceptar'} action={this.aceptarButton}
                        /> */}
                        <RaisedTextButton title='Terminar' color= 'rgb(144,184,54)'
                        alignSelf={'center'} titleColor='rgb(255,255,255)' 
                        onPress={()=>{this.aceptarButton()}} //width={'90%'}
                        />
                    </View>
                </View>
                
            </View>
        )
    }
}

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
    sombra:{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: 'rgb(106,185,250)', 
        elevation: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
       
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

const mapStateToProps = state => {
    return {
        cliente : state.cliente,
    }
}

export default connect(mapStateToProps,actions)(SelectClients); 
