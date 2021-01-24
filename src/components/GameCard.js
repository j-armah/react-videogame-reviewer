import React from 'react';
import { Link, useHistory } from "react-router-dom";

function GameCard({game}) {
    const {id, title, genre, maturity_rating, description, image} = game

    //let history = useHistory()

    return (
        <div className="card">
            {/* <a href={`/games/${id}`}>
                <img className="poster" src={image} alt={title}/>
            </a> */}
            {/* <h4 className="card-header">{title}</h4>
            <p>{genre}, {maturity_rating}</p>
            <p>{description}</p> */}
        
            <Link to={`/games/${id}`}>
                <img className="poster" src={image} alt={title}/>
            </Link>
        </div>
    )
}

export default GameCard;
