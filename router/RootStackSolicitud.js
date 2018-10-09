import { createStackNavigator } from "react-navigation";
import TabsSolicitud from "./RootStackTabSolicitud"
import SolicitudScreen from "../src/containers/solicitudScreen"

const RootStackSolicitud = createStackNavigator(
  {
    SolicitudScreen:{ screen: SolicitudScreen},
    SolicitudesCompanyTab:{ screen: TabsSolicitud }
  },
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false

      })
  }

  
);

export default RootStackSolicitud;
