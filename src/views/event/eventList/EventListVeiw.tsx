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
    const [events, setEvents] = useState<Event[]>([])
    const [lastDate, setLastDate] = useState<String>("")
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const navigation = useNavigation<HomeScreenProps>();

    const controller = new ApiController()

    const fetchEvents = useCallback(() => {
            setIsRefreshing(true)
            controller.fetchEvents(accessToken, lastDate).then(e => { 
                setEvents(prev => prev.concat(e))
            })
            const currentlastDate = new Date (events[events?.length - 1]?.eventOccurrence)
            const currentMonth = currentlastDate.getMonth() + 1
            
            const lastDateString = 
                currentlastDate.getFullYear() + 
                "-" + currentMonth + 
                "-" + currentlastDate.getDate() + "T" +
                currentlastDate.getHours() + 
                ":" + currentlastDate.getMinutes() + 
                ":" + currentlastDate.getSeconds()

            
            setLastDate(lastDateString)
            console.log(lastDate)
            setIsRefreshing(false)
        }, [accessToken, lastDate, controller])

    useEffect(() => {

        if (lastDate === ""){
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth() + 1

            const currentDateString = 
            currentDate.getFullYear()
            + "-" 
            + currentMonth
            + "-"
            + currentDate.getDate()
            + "T023:59:59"
    
            setLastDate(currentDateString)
        }

        fetchEvents()
    }, [lastDate])

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