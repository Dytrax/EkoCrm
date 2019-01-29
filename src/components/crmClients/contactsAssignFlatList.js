import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native";
import { CheckBox } from 'react-native-elements'
export default class ContactAssignFlatList extends Component{
    /* constructor(props){
        super(props)
        state = {
            checked: this.props.data[1],
          };
    } */
    state = {
        checked: this.props.data[1],
      };

    renderItem = ({item}) => {
        //console.log(item)
        return(
            <CheckBox
                            title={`${item.name}\n${item.email}`}
                            checked={this.state.checked.includes(item.id)}
                            onPress={() => this.checkItem(item)}
                            />
        )
    }

    checkItem = item => {
        const { checked } = this.state;
       
        if (!checked.includes(item.id)) {
           
          this.setState({ checked: [...checked, item.id] });
          this.props.chageState([...checked, item.id])
          
          
          
        } else {
            //console.log("primerif")
          this.setState({ checked: checked.filter(a => a !== item.id) });
          this.props.chageState(checked.filter(a => a !== item.id))
         
        }

     
      };

    
    
    render(){
        return(
            <FlatList
                data={this.props.data[0]}
                renderItem={this.renderItem}
                extraData={this.state}
                keyExtractor={item => item.id.toString()}
                
            />
        )
    }
}