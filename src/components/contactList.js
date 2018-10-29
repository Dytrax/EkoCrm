import React,{Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native"
import ContactItem from "../components/contactItem"

export default class ContactList extends Component {

    renderItem = ({item}) => {
        return(
        <ContactItem {...item}></ContactItem>
        )
    }


    render(){
        return(
            <FlatList   
                data={this.props.listContacts}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
            />
        )   
    }
}

const styles = StyleSheet.create({

})