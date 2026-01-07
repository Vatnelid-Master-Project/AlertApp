import { FlatList, RefreshControl } from "react-native"
import Unit from "../../../api/model/Unit"
import UnitListCard from "../../../common/component/listCard/UnitListCard"
import { useCallback, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps, LogInScreenProps } from "../../../common/routes/types"
import { Auth0Token } from "../../../common/hooks/useAccessToken"
import { ApiController } from "../../../api/rest/ApiController"

interface UnitListProps {
    accessToken: Auth0Token
}

const UnitListView = ({accessToken} : UnitListProps) => {
    const [units, setUnits] = useState<Unit[]>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const navigation = useNavigation<HomeScreenProps>()

    const controller = new ApiController()
    

    const fetchUnits = useCallback(() => {
        setIsRefreshing(true)
        controller.fetchUnits(accessToken).then(units => setUnits(units))
        setIsRefreshing(false)
    }, [])
    
    useEffect(() => {
        fetchUnits();
    }, [])

    const onPressHandler = (unit: Unit) => {
        navigation.navigate("UnitDetail", {unit})
    }

    return <FlatList
        data={units}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <UnitListCard unit={item} onPress={() => onPressHandler(item)}/>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchUnits}/>}
        />

}

export default UnitListView