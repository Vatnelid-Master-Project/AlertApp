import { FlatList, RefreshControl } from "react-native"
import Unit from "../../../api/model/Unit"
import UnitListCard from "../../../common/component/listCard/UnitListCard"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "../../../common/routes/types"

interface UnitListProps {
    units: Unit[] | undefined
    onRefresh: () => void
    isRefreshing: boolean
}

const UnitListView = ({units, onRefresh, isRefreshing} : UnitListProps) => {

    const navigation = useNavigation<HomeScreenProps>()
    
    useEffect(() => {
        onRefresh();
    }, [])

    const onPressHandler = (unit: Unit) => {
        navigation.navigate("UnitDetail", {unit})
    }

    return <FlatList
        data={units}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <UnitListCard unit={item} onPress={() => onPressHandler(item)}/>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>}
        />

}

export default UnitListView