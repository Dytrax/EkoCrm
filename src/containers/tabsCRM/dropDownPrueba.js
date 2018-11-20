import React, { Component } from 'react';
import {
    View,
} from "react-native"
import { Dropdown } from 'react-native-material-dropdown';
 

export default class DropDownPrueba extends Component {
    constructor(){
        super()
        this.state = {
            value:"",
            
        }
    }
     /* componentDidMount(){
          this.setState({
             value:this.props.value
         }) 
         
    }  */
  render() {
    
 
    return (
        
            <Dropdown
                value={this.props.value}            
                selectedIndex={this.state.index}
                selectedItem={this.state.selectedItem}
                //valueExtractor={({value})=> value}
                label={this.props.title}
                data={this.props.data}
                containerStyle={{width:this.props.size ,  }}
                onChangeText={(value,index,data)=>{
                    this.setState({
                        value:value,
                        
                    })
                    
                    this.props.selectedAction(data[index])
                    console.log(value)
                    console.log(index)
                    console.log(data)
                   }
                   }
                
                />
        
      
    );
  }
}