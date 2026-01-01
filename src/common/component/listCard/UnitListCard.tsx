import { View, Text } from "react-native";
import Unit from "../../../api/model/Unit";
import style from "./style";

interface UnitListCardProps {
    unit: Unit | undefined
}

const UnitListCard = ({unit} : UnitListCardProps) => {

    return <View style={style.card}>
                <View style={style.left_component}>
                    <Text style={style.text}>Name: </Text>
                    <Text style={style.text}>{unit?.unitName}</Text>
                </View>
        </View>
}

export default UnitListCard