import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, SectionList } from 'react-native';
import Alert from '../api/model/Alert';
import { ApiController } from '../api/rest/ApiController';
import Event from '../api/model/Event';
import Unit from '../api/model/Unit';
import EventListView from '../views/event/eventList/EventListVeiw';
import AlertListView from '../views/alert/alertList/AlertListVeiw';
import UnitListView from '../views/unit/unitList/UnitListVeiw';


const Layout = () => {

    const controller = new ApiController()

    const [type, setType] = useState<string>('events')
    const [alerts, setAlerts] = useState<Alert[]>()
    const [events, setEvents] = useState<Event[]>()
    const [units, setUnits] = useState<Unit[]>()

    const fetchAlerts = useCallback(() => {
        controller.fetchAlerts().then(alerts => setAlerts(alerts))
    }, [])

    const fetchEvents = useCallback(() => {
        controller.fetchEvents().then(events => setEvents(events))
    }, [])

    const fetchUnits = useCallback(() => {
        controller.fetchUnits().then(units => setUnits(units))
    }, [])

    const listView = useCallback(() : React.JSX.Element => {
        switch(type){
            case 'events':
                return <EventListView events={events}/>
            case 'alerts':
                return <AlertListView alerts={alerts}/>
            case 'units':
                return <UnitListView units={units}/>
            default:
                return <View/>
        }
    }, [type]) 

    useEffect(() => {
        fetchAlerts()
        fetchEvents()
        fetchUnits()
    }, [])

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