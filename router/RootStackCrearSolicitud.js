import { createStackNavigator, } from "react-navigation";
import addSolicitud from '../src/containers/addSolicitud'
import SelectClients from "../src/containers/selectClients";
import seleccionarTipoSolicitud from "../src/containers/seleccionarTipoSolicitud";


const RootStackCrearSolicitud = createStackNavigator(
  {
    CrearSolicitudScreen:{ screen: addSolicitud},
    SeleccionarClientes:{ screen: SelectClients},
    SeleccionarTipoSolicitud:{ screen: seleccionarTipoSolicitud}
  },
  /* {
    ActivitiesDayScreen:{ screen: OpportunityOfDayScreen}
  }, */
  {
    navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
        
      })
  }

  
);

export default RootStackCrearSolicitud;