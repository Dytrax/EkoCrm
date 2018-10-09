import { createBottomTabNavigator } from "react-navigation";
import AbiertasScreen from "../src/containers/tabsSolicitud/abiertasScreen";
import CerradasScreen from "../src/containers/tabsSolicitud/cerradasScreen";
import EnProcesoScreen from "../src/containers/tabsSolicitud/enProcesoScreen";




const TabsSolicitud = createBottomTabNavigator({
    Abiertas:{ screen: AbiertasScreen},
    EnProceso:{ screen: EnProcesoScreen},
    Cerradas:{ screen: CerradasScreen}

  
},{
    //order:['Abiertas','EnProceso','Cerradas'],
    animationEnabled:true,
    
}   
);

export default TabsSolicitud;