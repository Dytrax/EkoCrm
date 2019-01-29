import React, { Component } from 'react';
import {
    View,
} from "react-native"
import { Dropdown } from 'react-native-material-dropdown';
 
export default class MyDropDown extends Component {
    constructor(){
        super()
        this.state = {
            value:""
        }
    }
     componentDidMount(){
         /* this.setState({
             value:"colombia"
         }) */
        //this.props.countryValue
        /* let filtroData = this.props.datos.filter(n=>n.code===57)
        console.log("filtroDataidjidjidjiasjijiasds")
        console.log(filtroData)
        this.setState({
            value:filtroData[0].value
        }) */
    } 
  render() {
    
 
    return (
        
            <Dropdown
                value={this.state.value}
                
                //valueExtractor={({value})=> value}
                label={this.props.label}
                data={this.props.datos}
                containerStyle={{width:this.props.size,margin:5}}
                onChangeText={(value,index,data)=>{
                    this.setState({
                        value:value
                    })
                    console.log("value")
                    console.log(value)
                    console.log("index")
                    console.log(index)
                    console.log("data[index]")
                    console.log(data[index])
                    this.props.getData(data[index])}}
                
                />
        
      
    );
  }
}