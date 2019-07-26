import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import { withNavigation, StackActions,NavigationActions } from "react-navigation";
const actionToDispatch = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "TabCRM",
            action: NavigationActions.navigate({
              routeName: "Tab1",
            })
          }),
        ]
  });

class ActivityResetPrueba extends Component {

    render(){
        return(
            <View>
                <Text>Window Reset</Text>
                <Button
                title="Go to Contacts"
                onPress={() => 
                this.props.navigation.dispatch(actionToDispatch)
                //this.props.navigation.dispatch(actionToDispatch)
                
                
                //this.props.navigation.dispatch(resetAction)
                //this.props.navigation.navigate('Tab1')
                }
                //this.props.navigation.navigate('Tab1')}
                />
            </View>
        )
    }
}
export default withNavigation(ActivityResetPrueba)
