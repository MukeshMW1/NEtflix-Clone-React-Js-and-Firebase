import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {
    const { id } = useParams();
    const api_key = import.meta.env.VITE_API_KEY;
    const api_url = import.meta.env.VITE_API_URL;



    const navigate = useNavigate();



    const [apiData, setapiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""

    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${api_key}`
        }
    }

    useEffect(() => {
        ;

        fetch(`${api_url}/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setapiData(response.results[0]))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={() => { navigate(-1) }} />
            <iframe src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" allow="true" width="90%" height="90%" title="Trailer" frameBorder="0" allowFullScreen />
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p className='desc'>{apiData.name}</p>
                <p >{apiData.type}</p>
            </div>
        </div >
    )
}

export default Player
