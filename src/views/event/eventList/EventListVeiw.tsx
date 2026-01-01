import { FlatList, Text } from "react-native"

import Event from "../../../api/model/Event"
import EventListCard from "../../../common/component/listCard/EventListCard"

interface EventListProps {
    events: Event[] | undefined
}

const EventListView = ({events}: EventListProps) => {

    return <FlatList
        data={events}
        renderItem={({item}) => <EventListCard event={item}/>} 
        />
}

export default EventListView