import { StyleSheet, Text, View } from 'react-native';
import Layout from './src/layout/Layout';
import { useWebsocketAlert } from './src/common/hooks/useWebsocketAlert';
import { wsUri } from './src/variables/ApiVariables';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlertDetailsView from './src/views/alert/alertDetails/AlertDetailsView';
import { RootStackParamList } from './src/common/routes/types';
import EventDetailsView from './src/views/event/eventDetails/EventDetailsView';
import UnitDetialsView from './src/views/unit/unitDetailsView/UnitDetailsView';


export default function App() {
  useWebsocketAlert(wsUri)

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Layout} />
          <Stack.Screen name='AlertDetail' component={AlertDetailsView}/>
          <Stack.Screen name='EventDetail' component={EventDetailsView}/>
          <Stack.Screen name='UnitDetail' component={UnitDetialsView}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
