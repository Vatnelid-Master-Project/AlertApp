import Alert from "../model/Alert"

class ApiController {
    
    private async fetchAlert(key: number) : Promise<Alert> {
        const apiUri = process.env.API_URI

        const response = await fetch(`${apiUri}/Alert/${key}`)

        if (!response.ok){
            throw Error('Something went wrong')
        }

        return await response.json()
    }
}