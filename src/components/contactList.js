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
        //console.log("item")
        //console.log(item)
        return(
        <ContactItem {...item} showModal={this.props.editModal}></ContactItem>
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