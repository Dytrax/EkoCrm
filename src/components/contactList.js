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
    renderFooter = () => {
        /* if (!this.state.loading) return null; */
    
        return (
          <View
            style={{
              paddingVertical: 30,
              //borderTopWidth: 1,
              //borderColor: "#CED0CE"
            }}
          >
            {/* <ActivityIndicator animating size="large" /> */}
          </View>
        );
      };

      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              //width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "18%",
              marginRight: "3%"
            }}
          />
        );
      };

      
      
      _listEmptyComponent = () => {
          return(
              <View style={{marginTop:"50%"}}>
                  <Text style={{alignSelf:"center",fontSize:16}}>No hay contactos creados</Text>
              </View>
          )
          
      }
      
    render(){
        return(
            <FlatList   
                data={this.props.listContacts}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this._listEmptyComponent}
                keyboardShouldPersistTaps="always"
            />
        )   
    }
}

const styles = StyleSheet.create({

})