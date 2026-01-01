import { FlatList, Text } from "react-native"
import Unit from "../../../api/model/Unit"
import UnitListCard from "../../../common/component/listCard/UnitListCard"

interface UnitListProps {
    units: Unit[] | undefined
}

const UnitListView = ({units} : UnitListProps) => {

    return <FlatList
        data={units}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <UnitListCard unit={item}/>}
        />

}

export default UnitListView