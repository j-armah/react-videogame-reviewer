import React from 'react';
import { Link } from "react-router-dom";

function GameCard({game}) {
    const {id, title, genre, maturity_rating, description, image} = game

    return (
        <div className="card">
            <img className="poster" src={image} alt={title} />
            <h4>{title}</h4>
            <p>{genre}, {maturity_rating}</p>
            {/* <p>{description}</p> */}
            <p>
                <Link to={`/games/${id}`}>See Details</Link>
            </p>
        </div>
    )
}

export default GameCard;
