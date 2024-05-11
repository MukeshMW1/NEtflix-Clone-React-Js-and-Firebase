import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
    const api_key = import.meta.env.VITE_API_KEY;
    const api_url = import.meta.env.VITE_API_URL;




    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();
    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY

    }


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer  ${api_key}`
        }
    };


    useEffect(() => {




        fetch(`${api_url}/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results))
            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular On Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((data, i) => {
                    return <Link to={`/player/${data.id}`} className="card" key={i}>
                        <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt="" />
                        <p>{data.original_title}</p>

                    </Link>
                })}
            </div>

        </div>
    )
}

export default TitleCards
