import { FlatList, RefreshControl, Text } from "react-native"

import Event from "../../../api/model/Event"
import EventListCard from "../../../common/component/listCard/EventListCard"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps, LogInScreenProps } from "../../../common/routes/types"
import { Auth0Token } from "../../../common/hooks/useAccessToken"
import { ApiController } from "../../../api/rest/ApiController"

interface EventListProps {
    accessToken: Auth0Token
}

const EventListView = ({accessToken}: EventListProps) => {
    const [events, setEvents] = useState<Event[]>([])
    const [lastDate, setLastDate] = useState<string>(() => {
        // Initialize with today's date immediately, avoiding the empty string issue
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        return (
            currentDate.getFullYear() +
            "-" + currentMonth +
            "-" + currentDate.getDate() +
            "T23:59:59"
        )
    })
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const navigation = useNavigation<HomeScreenProps>();

    // Prevent controller from being recreated on every render
    const controller = useRef(new ApiController()).current

    const formatDate = (date: Date): string => {
        const month = date.getMonth() + 1
        return (
            date.getFullYear() +
            "-" + month +
            "-" + date.getDate() +
            "T" + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
        )
    }

    const fetchEvents = useCallback(() => {
        setIsRefreshing(true)
        controller.fetchEvents(accessToken, lastDate)
            .then((newEvents : Event[]) => {
                if (newEvents.length > 0) {
                    // Append new events to existing list
                    setEvents(prev => [...prev, ...newEvents])

                    // Update lastDate from the last fetched event, inside .then() so data is available
                    const lastEvent = newEvents[newEvents.length - 1]
                    const lastEventDate = new Date(lastEvent.eventOccurrence)
                    setLastDate(formatDate(lastEventDate))
                }
            })
            .finally(() => {
                setIsRefreshing(false)
            })
    }, [accessToken, lastDate, controller])

    useEffect(() => {
        fetchEvents()
    }, []) // Runs once on mount; lastDate is already initialized above

    const onPressHandler = (event: Event) => {
        navigation.navigate("EventDetail", {event})
    }

    return (
        <FlatList
            data={events}
            keyExtractor={(item) => item.key?.toString()}
            renderItem={({item}) => (
                <EventListCard event={item} onPress={() => onPressHandler(item)}/>
            )}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={fetchEvents}/>
            }
        />
    )
}

export default EventListView