import { FlatList, RefreshControl, Text } from "react-native"

import Event from "../../../api/model/Event"
import EventListCard from "../../../common/component/listCard/EventListCard"
import { useCallback, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps, LogInScreenProps } from "../../../common/routes/types"
import { Auth0Token } from "../../../common/hooks/useAccessToken"
import { ApiController } from "../../../api/rest/ApiController"

interface EventListProps {
    accessToken: Auth0Token
}

const EventListView = ({accessToken}: EventListProps) => {
    const [events, setEvents] = useState<Event[]>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const navigation = useNavigation<HomeScreenProps>();

    const controller = new ApiController()

    const fetchEvents = useCallback(() => {
            setIsRefreshing(true)
            controller.fetchEvents(accessToken).then(events => { setEvents(events)})
            setIsRefreshing(false)
        }, [])

    useEffect(() => {
        fetchEvents()
    }, [])

    const onPressHandler = (event: Event) => {
        navigation.navigate("EventDetail", {event})
    }

    return <FlatList
        data={events}
        renderItem={({item}) => <EventListCard event={item} onPress={() => onPressHandler(item)}/>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchEvents}/>} 
        />
}

export default EventListView