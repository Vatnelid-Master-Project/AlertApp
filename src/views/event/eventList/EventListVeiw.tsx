import { FlatList, RefreshControl, Text } from "react-native"

import Event from "../../../api/model/Event"
import EventListCard from "../../../common/component/listCard/EventListCard"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "../../../common/routes/types"

interface EventListProps {
    events: Event[] | undefined
    onRefresh: () => void
    isRefreshing: boolean
}

const EventListView = ({events, onRefresh, isRefreshing}: EventListProps) => {

    const navigation = useNavigation<HomeScreenProps>();

    useEffect(() => {
        onRefresh()
    }, [])

    const onPressHandler = (event: Event) => {
        navigation.navigate("EventDetail", {event})
    }

    return <FlatList
        data={events}
        renderItem={({item}) => <EventListCard event={item} onPress={() => onPressHandler(item)}/>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>} 
        />
}

export default EventListView