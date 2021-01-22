import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

function GamePage() {
    const [game, setGame] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const params = useParams()
    console.log(params.id)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
          .then((r) => r.json())
          .then((game) => {
              console.log(game)
            setGame(game);
            setIsLoaded(true);
          });
    }, [params.id]);

    //console.log(game)
    if (!isLoaded) return <h2>Loading...</h2>;
    return (
        <div>
            <h1>{game.title}</h1>
            <div className="game-page-info">
                <div className="video">
                    Video/Poster
                </div>
                <div className="game-info">
                    Description/Info
                </div>
                <div className="game-review">
                    Reviews/Review Form
                </div>
            </div>
            {/* 
            Video and game description here, or just game description for now on One side
            Reviews on right, if Logged in there should be some way to write a review here if you've added this game to your played game list
            Would have to fetch usergames and determine whether user has played game? If yes they can write a review, which would Post a new review obj
            */}
        </div>
    )
}

export default GamePage
