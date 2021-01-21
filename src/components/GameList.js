import React from 'react';
import GameCard from './GameCard';

function GameList({ games }) {
    

    const gamesArray = games.map(game => <GameCard key={game.id} game={game}/>);

    return (
        <div>
            {gamesArray}
        </div>
    )
}

export default GameList;
