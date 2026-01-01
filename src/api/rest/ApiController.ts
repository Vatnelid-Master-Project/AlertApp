import { apiUri } from "../../variables/ApiVariables"
import Alert from "../model/Alert"
import Event from "../model/Event"
import Unit from "../model/Unit"

export class ApiController {
    
    public async fetchAlert(key: number) : Promise<Alert> {
        const response = await fetch(`${apiUri}/Alert/${key}`)

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }

    public async fetchAlerts() : Promise<Alert[]> {
        const response = await fetch(`${apiUri}/Alert`)

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }

    public async fetchEvents() : Promise<Event[]> {
        const response = await fetch(`${apiUri}/Event`)

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }

    public async fetchUnits() : Promise<Unit[]> {
        const response = await fetch(`${apiUri}/Unit`)

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }
}