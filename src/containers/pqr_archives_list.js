import React, {Component} from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Linking
} from "react-native"
import CONFIG from "../../config/config"
const URL_DOWNLOAD_FILES =`${CONFIG.URL_BASE}:${CONFIG.PORT_CRM}/${CONFIG.VERSION_API}/pqr/pqrs/uploads/` 
import API from "../../api/Api"
export default class PQRlist extends Component{
    onItemClick (item) {
        let url2 = `${item.pqrId}/${item.fileName}`
        let url = URL_DOWNLOAD_FILES + url2
        console.log(url)
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url);
            }
          }).catch(err => console.error('An error occurred', err));
        /* API.fileDownload(url,item.fileName) */
        console.log(url)  
        
        
    }
    
    renderItem = ({item}) => {
        return(
        <View>
            <Text onPress={()=>this.onItemClick(item)}>{item.fileName}</Text>
        </View>
        )
    }

    render(){
        return(
            <FlatList
                data={this.props.listArchives}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }

}