import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, SectionList } from 'react-native';
import EventListView from '../views/event/eventList/EventListVeiw';
import AlertListView from '../views/alert/alertList/AlertListVeiw';
import UnitListView from '../views/unit/unitList/UnitListVeiw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../common/routes/types';
import useAccessToken, { Auth0Token } from '../common/hooks/useAccessToken';
import { useWebsocketAlert } from '../common/hooks/useWebsocketAlert';
import { wsUri } from '../variables/ApiVariables';
import * as SecureStore from 'expo-secure-store'

type Props = NativeStackScreenProps<
    RootStackParamList,
    "Home"
>

const Layout = ({route, navigation} : Props) => {

    const [apiKey, setApiKey] = useState<string | null>("")
    
    useEffect(() => {
        const bootstrap = async () => {
            setApiKey(await SecureStore.getItemAsync("apiKey"))
        }

        bootstrap()
    },[])

    useWebsocketAlert(wsUri, apiKey)

    const token : Auth0Token = useAccessToken()
    const [type, setType] = useState<string>('events')

    const listView = useCallback(() : React.JSX.Element => {
        switch(type){
            case 'events':
                return <EventListView accessToken={token}/>
            case 'alerts':
                return <AlertListView accessToken={token}/>
            case 'units':
                return <UnitListView accessToken={token}/>
            default:
                return <View/>
        }
    }, [type]) 

    return <View style={styles.container}>
                <View style={styles.topBar}>
                    <Button title='Events' onPress={() => {setType('events')}}></Button>
                    <Button title='Alerts' onPress={() => {setType('alerts')}}></Button>
                    <Button title='units' onPress={() => setType('units')}></Button>
                </View>
                <View style={styles.content}>
                    {listView()}
                </View>
        </View>
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 15,
    padding: 12,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#6e7499ff'
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default Layout