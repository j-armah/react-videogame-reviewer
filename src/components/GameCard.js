import React from 'react';

function GameCard({game}) {
    const {id, title, genre, maturity_rating, description, image} = game

    return (
        <div className="card">
            <img src={image} alt={title} />
            <h4>{title}</h4>
            <p>{genre}, {maturity_rating}</p>
            <p>{description}</p>
        </div>
    )
}

export default GameCard;
