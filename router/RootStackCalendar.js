import { createStackNavigator, } from "react-navigation";
import CalendarScreen from "../src/containers/calendarScreen"
import OpportunityOfDayScreen from "../src/containers/opportunityOfDayScreen";
import CalendarScreenV2 from "../src/containers/calendarScreenV2/calendarScreenV2"
const RootStackCalendar = createStackNavigator(
  {
    CalendarScreen:{ screen: CalendarScreen,
      /* ({ navigation }) => {
        let drawerLabel = 'Calendario';
        return {drawerLabel} */
      navigationOptions: (navigation) => ({
        drawerLabel: 'Calendario',
        
        
      })
       
    },
    OpportunityOfDayScreen:{ screen: OpportunityOfDayScreen}
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

export default RootStackCalendar;