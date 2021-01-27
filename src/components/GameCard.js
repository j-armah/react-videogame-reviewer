import React from 'react';
import { Link, useHistory } from "react-router-dom";

function GameCard({game}) {
    const {id, title, genre, maturity_rating, description, image} = game
    let sumRating = game.reviews.map(review => review.rating).reduce((a, b) => a + b, 0)
    let averageRating = sumRating / game.reviews.length
    console.log(averageRating === NaN)

    return (
        <div className="card">
            <Link to={`/games/${id}`}>
                <img className="poster" src={image} alt={title}/>
            </Link>
            <div className='card-content'>
                <div className="card-title">
                    {game.title}
                </div>
                <div className="card-rating">
                    ⭐ {isNaN(averageRating) ? "0" : averageRating} ({game.reviews.length})
                </div>
            </div>
            
            {/* <a href={`/games/${id}`}>
                <img className="poster" src={image} alt={title}/>
            </a> */}
            {/* <h4 className="card-header">{title}</h4>
            <p>{genre}, {maturity_rating}</p>
            <p>{description}</p> */}
        
            
        </div>
    )
}

export default GameCard;
