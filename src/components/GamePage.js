import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

function GamePage() {
    const [game, setGame] = useState(null)

    // const params = useParams()
    // console.log(params)

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
    //       .then((r) => r.json())
    //       .then((game) => {
    //         setGame(game);
    //         //setIsLoaded(true);
    //       });
    // }, []);

    console.log(game)

    return (
        <div>
            <h1> Game Page!!</h1>
            {/* 
            Video and game description here, or just game description for now on One side
            Reviews on right, if Logged in there should be some way to write a review here if you've added this game to your played game list
            Would have to fetch usergames and determine whether user has played game? If yes they can write a review, which would Post a new review obj
            */}
        </div>
    )
}

export default GamePage
