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
class TiposSolicitud extends Component{
    constructor() {
        super()
        this.state={
            data:[],
            
        }
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

      reduxerStateChaange(item){
        this.props.setTipoSolicitud({
            codigo:item.codigo,
            descripcion:item.descripcion
        })
    }

      renderItem = ({item}) =>{
        
        return(
        <TouchableOpacity onPress={()=>{this.reduxerStateChaange(item)
        this.props.navigation.goBack()}}>
        <View style={[{flexDirection:"row",backgroundColor:"white",marginBottom:5,padding:10},styleCreateOpportunity.sombra]}>
        <View style={{alignSelf:"center",width:"90%"}}>
            
            <Text style={{ }}>{`${item.codigo} - ${item.descripcion}`}</Text>
            
        </View>
        
            
            {
                this.props.typeSolicitud.codigo === item.codigo ? (
                    <View style={{justifyContent:"center",alignItems:"center",width:"10%"}}>
                        <Icon name={'ios-checkmark'} size={30} color='rgb(144,184,54)'/>
                    </View>
                ) :  (null)
            }
            
        </View>
        </TouchableOpacity>
        )
    }

    render(){
        const { navigation } = this.props;
        const typeSolicitudes = navigation.getParam('typeSolicitudes', 'NO-TYPE');
        return(
            
            <View style={styles.container}>
                


                
                <View style={styles.headerContainer}>
                    <Header 
                    showSearch={true}
                    titulo={"Seleccionar Tipo"} 
                    name={"keyboard-backspace"}
                    actionIcon={()=>this.props.navigation.goBack()}
                    //state={this.state.searchBar}
                    //actionSearchBar={this.searchMethods}

                    />
                    
                </View>
                
                <View style={[styles.bodyContainer]}>
                    <FlatList
                                data={typeSolicitudes.data}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.codigo}
                                
                            />
                    
                </View>
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        typeSolicitud : state.typeSolicitud,
    }
}
export default connect(mapStateToProps,actions)(TiposSolicitud); 

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
    },
    sombra:{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        //backgroundColor: '#fff', 
        elevation: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
       
    }
})