import { createStackNavigator,NavigationActions } from "react-navigation";
import TabsSolicitud from "./RootStackTabSolicitud"
import SolicitudScreen from "../src/containers/solicitudScreen"
import Chat from "../src/containers/chatSolicitudes/chat";
import PruebaScreen from "../src/containers/pruebaScreen";
import TabsSolicitud2 from "./stack2prueba"


const RootStackSolicitud = createStackNavigator(
  {
    SolicitudScreen:{ screen: SolicitudScreen},
    SolicitudesCompanyTab:{ screen: TabsSolicitud2 },
    ChatScreen:{ screen: Chat},
    PruebaScreen:{ screen: PruebaScreen},
    
  },
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
        
      })
  }

  
);

export default RootStackSolicitud;
