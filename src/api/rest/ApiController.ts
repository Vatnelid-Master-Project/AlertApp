import { Auth0Token } from "../../common/hooks/useAccessToken"
import { apiUri } from "../../variables/ApiVariables"
import Alert from "../model/Alert"
import Event from "../model/Event"
import Unit from "../model/Unit"

export class ApiController {
    
    public async fetchAlert(accessToken: Auth0Token, key: number) : Promise<Alert> {
        const response = await fetch(`${apiUri}/Alert/${key}`, {
            headers: {
                "Authorization": `Bearer ${accessToken.access_token}`
            }
        })

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }

    public async fetchAlerts(accessToken : Auth0Token, date: String) : Promise<Alert[]> {
        
        const response = await fetch(`${apiUri}/Alert?limit=5&date=${date}`, {
            headers: {
                "Authorization": `Bearer ${accessToken.access_token}`
            }
        })

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }

    public async fetchEvents(accessToken: Auth0Token, date: String) : Promise<Event[]> {
        
        const response = await fetch(`${apiUri}/Event?limit=5&date=${date}`, {
            headers: {
                "Authorization": `Bearer ${accessToken.access_token}`
            }
        })

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }

    public async fetchUnits(accessToken: Auth0Token) : Promise<Unit[]> {
        const response = await fetch(`${apiUri}/Unit`, {
            headers: {
                "Authorization": `Bearer ${accessToken.access_token}`
            }
        })

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }
    public async authenticate(username: string, password: string) {
        const request = new Request(`${apiUri}/User/authenticate`, {
            method: 'GET',
            headers: {
                "UserName": username,
                "Password": password
            }
        })

        const response = await fetch(request)

        if (!response.ok){
            return false
        }

        return await response.json()
    }
}