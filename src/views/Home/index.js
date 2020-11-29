import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from  'recoil'

//Import atoms
import { isAuthenticated as isAuthenticatedAtom, spotifyRefreshToken as spotifyRefreshTokenAtom, spotifyTokenResponse as spotifyTokenResponseAtom } from "../../recoil/auth/atoms"

//Components and more

import { spotifyAuthCall } from '../../utils'

//Assets
import './style.css'
import homeImage from '../../assets/images/home.jpeg'

const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;

export default function Home(){

    const location = useLocation()
    //const [isAuthenticated, setIsAuthenticated] = useState() old useState way
    const [isAuthenticated, setIsAuthenticated  ] = useRecoilState(isAuthenticatedAtom)
    const [spotifyRefreshToken, setSpotifyRefreshToken ] = useRecoilState(spotifyRefreshTokenAtom)
    const [spotifyTokenResponse, setspotifyTokenResponse ] = useRecoilState(spotifyTokenResponseAtom) 

    const authenticateUser = useCallback(async (code) => {

        try {
            
            let response;
            // isAuthenticated, responseToken, responseRefresh cada uno de estos seria un atomo
            // Si refreshToken existe, entonces haz una llamada a refreshToken, de lo contrario solicita un token nuevo.

            if(spotifyRefreshToken){
                response = await  spotifyAuthCall({ refresh_token: spotifyRefreshToken })
            }else {
                response = await spotifyAuthCall({code})
            }

            console.log(response)

            setSpotifyRefreshToken(response?.refresh_token)
            setspotifyTokenResponse(response)
            setIsAuthenticated(true)

            //TODO redirijir a pantalla de buscador
        } catch (error) {
            console.log("Error en authenticateUser" + error)
        }



    }, [setSpotifyRefreshToken, setspotifyTokenResponse, setIsAuthenticated, spotifyRefreshToken])
    
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const spotifyCode = urlParams.get("code")
        if (spotifyCode) authenticateUser(spotifyCode) // evitamos llamadas innecesarias
        
    },[location.search]) //este hook se llama cuando algun elemento dentro del array cambia

    const handleLoginClick = () => {
            window.location.replace(spotifyUrl)
    }

    return(
        <div className="home-container">

            <div className="home-left-child">
                <h3>Bienvenido de nuevo</h3>
                <h6>Identificate para encontrar tu musica favorita.</h6>
                <button onClick={handleLoginClick} >Iniciar sesion</button>
            </div>
            <div className="home-right-child" style={{ backgroundImage: `url(${homeImage})` }} />


        </div> // end home-container
        
    );
}