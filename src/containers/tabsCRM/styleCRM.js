import { StyleSheet,Platform } from 'react-native';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    subcontainer:{
        flex:1
    },
    headerContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: Platform.OS === 'android' ? 60 : 60,
    },
    bodyContainer:{
        flex:90
    },
    body:{
        flex:1,
    },
    indicator:{
        alignItems:"center",
        justifyContent:"center"
    }
})