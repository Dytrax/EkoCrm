import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native";
import { CheckBox } from 'react-native-elements'
export default class ProductAssignFlatList extends Component{
    /* constructor(props){
        super(props)
        state = {
            checked: this.props.data[1],
          };
    } */
    state = {
        checked: this.props.productsChecked,
      };

    renderItem = ({item}) => {
        //console.log(item)
        return(
            <CheckBox
                            title={`${item.name}`}
                            checked={this.state.checked.includes(item.id)}
                            onPress={() => this.checkItem(item)}
                            />
        )
    }

    checkItem = item => {
        const { checked } = this.state;
       
        if (!checked.includes(item.id)) {
           
          this.setState({ checked: [...checked, item.id] });
          this.props.stateChange("productsChecked",[...checked, item.id])
          
          
          
        } else {
            //console.log("primerif")
          this.setState({ checked: checked.filter(a => a !== item.id) });
          this.props.stateChange("productsChecked",checked.filter(a => a !== item.id))
         
        }

     
      };

    
    
    render(){
        return(
            <FlatList
                data={this.props.data}
                renderItem={this.renderItem}
                extraData={this.state}
                keyExtractor={item => item.id.toString()}
                
            />
        )
    }
}