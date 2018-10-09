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
            dataSource2: []

        }
    }
     async componentWillMount(){
        const data = this.props.navigation.getParam("dataSource")
        console.log("dataaaaaaaaaaaa")
        //console.log(this.props.navigation.state.params.dataSource)
        const token = await DB.getData("token");
        const answer = await API.getRequest(token);
        console.log("answer")
        console.log(answer)
        let abiertasAnswer = answer[1]
        console.log("abiertasAnswer")
        console.log(abiertasAnswer.filter(n=>n.name==="Avofruit SAS"))





        let openRequest = answer[1].map(s=>{





            return {
                //empresasNames:
                //pqrsCompanyXcerradas:s.filter(n=>n.name==="Avofruit SAS"),
                idCompany:s.id,
                companyName:s.businessName,
                pqrsCompanyAbiertas:s.pqrs.filter(p=>p.state===1),
                pqrsCompanyCerradas:s.pqrs.filter(p=>p.state===0),
                pqrsCompanyEnProceso:s.pqrs.filter(p=>p.state===2),               
                
            }
            

        })

        /* this.setState({
            dataSource:openRequest
        }) */
        console.log(openRequest)
        
        let cerradas = openRequest.filter(n=>n.idCompany===22)
        console.log(cerradas)
        cerradas = cerradas[0]["pqrsCompanyCerradas"];

        console.log(cerradas);
        let datos  = [];
        let objeto = {};

        for (var clave in openRequest){
            
            /* console.log("clave")
            console.log(clave)
            console.log("json[clave]")
            console.log(openRequest[clave].pqrsCompanyCerradas) */
            /* console.log("CompanyName")
            console.log(openRequest[clave].companyName) */
            for( var clave2 in openRequest[clave].pqrsCompanyCerradas){
                datos.push({
                    "CompanyName":openRequest[clave].companyName,
                    "title":openRequest[clave].pqrsCompanyCerradas[clave2].title,
                    "dateInit":openRequest[clave].pqrsCompanyCerradas[clave2].dateInit.slice(0,10)
                })
                /* console.log("Ttile")
                console.log(openRequest[clave].pqrsCompanyCerradas[clave2].title,)
                console.log("CompanyName")
                console.log(openRequest[clave].companyName)
                console.log("Fecha de inicio")
                console.log(openRequest[clave].pqrsCompanyCerradas[clave2].dateInit) */
            }
                
                /* console.log("Descripción")
                console.log(openRequest[clave].pqrsCompanyCerradas[clave2].description) */
            
        }
        //objeto.datos = datos;
        console.log("datos")
        console.log(datos)
        console.log("objeto")
        console.log(objeto.datos)
        console.log("Json Creado")
        console.log(JSON.stringify(objeto));
        this.setState({
            dataSource:datos
        })
        //console.log(this.state)
        //console.log(openRequest[0].companyName)
        //console.log(openRequest[0].pqrsCompanyCerradas[0].title)
        //console.log(openRequest[0].pqrsCompanyCerradas[0].dateInit)
        
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