import { useCallback, useEffect, useState } from "react";
import { audience, auth0Domain, clientId, clientSecret, grantType } from "../../variables/ApiVariables";

export type Auth0Token = {
    access_token: string,
    expires_in: number,
    token_type: string
}

const useAccessToken = () : Auth0Token => {
    const [token, setToken] = useState<Auth0Token>({access_token : "", expires_in: 0, token_type: ""})
    
    const fetchToken = useCallback( async () : Promise<Auth0Token> => {
        const response = await fetch(auth0Domain, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          "client_id":clientId,
          "client_secret":clientSecret,
          "audience":audience,
          "grant_type":grantType
        }),
      });

      return await response.json()
    }, [])

    useEffect(() => {

        const assign = async () => {
            await fetchToken().then((token : Auth0Token) => setToken(token))
        }
        assign()

    }, [])
    
    return token
}

export default useAccessToken