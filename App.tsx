import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SettingsVeiw } from './src/views/settings/SettingsVeiw';
import Layout from './src/layout/Layout';
import { useWebsocketAlert } from './src/common/hooks/useWebsocketAlert';
import { wsUri } from './src/variables/ApiVariables';

export default function App() {
  useWebsocketAlert(wsUri)

  return (
    <View style={styles.container}>
      <Layout/>
    </View>
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
