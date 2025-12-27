import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from 'react-native';
import { ApiController } from "../api/rest/ApiController"
import Alert from "../api/model/Alert"

export const SettingsVeiw = () => {
    const apiController = new ApiController()
    const [alert, setAlert] = useState<Alert>()


    useEffect(() => {
        apiController.fetchAlert(1).then(alert => setAlert(alert))

    },[apiController])
    
    console.log(alert)

    return <View>
        <Text>{alert?.getKey ?? ""}</Text>
    </View>

}