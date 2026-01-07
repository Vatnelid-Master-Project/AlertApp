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
import LogInScreenProps from './src/views/login/LogInView';
import LogInView from './src/views/login/LogInView';
import React, { useState } from 'react';
import AppStack from './src/common/navigation/AppStack';
import AuthStack from './src/common/navigation/AuthStack';


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <NavigationContainer>
        {isLoggedIn ? (<AppStack/>) : <AuthStack onLogin={() => setIsLoggedIn(true)}/>}
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
