import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

//Assets
import './style.css'
import homeImage from '../../assets/images/home.jpeg'

const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;

export default function Home(){

    const location = useLocation()
    
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const spotifyCode = urlParams.get("code")
        console.log(spotifyCode);
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