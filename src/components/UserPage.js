import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function UserPage({userGames, handleFavorite, setUserGames}) {
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    //const [isFavorited, setIsFavorited] = useState(false)
    //const [userGames, setUserGames] = useState([])

    const params = useParams()
    console.log(userGames)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
          .then((r) => r.json())
          .then((user) => {
              //console.log(user)
            setUser(user);
            setIsLoaded(true);
          });
    }, [params.id]);

    const toggleFavorite = (userGameObj) => {
        console.log(!userGameObj.favorite)
        //setIsFavorited(isFavorited => !isFavorited)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/${userGameObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                favorite: !userGameObj.favorite
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            handleFavorite(data)
        })
    }

    function handleDeleteGame(key) {
        //console.log(key)
        fetch(`http://localhost:4000/user_games/${key}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            const newGames = userGames.filter(user_game => user_game.id != key)
            setUserGames(newGames)
        })
    }

    //console.log(filteredUserGames)
    if (!isLoaded) return <h2>Loading...</h2>;
    return (
        <div>
            <h1> User 1 </h1>
            {/* Shows username and user info, shows a list of games they've played, a list of their favorite games, and a list of their reviews */}
            <div className="user-page-info">
                <div className="game-list">
                    <h3>Game List</h3> 
                    {/* Can sort by favorites */}
                    <ul>
                        {userGames.filter(user_game =>
                            user_game.user_id === user.id
                        )
                        .map(user_game => 
                        <li key={user_game.id}>
                            {user_game.game.title}
                            {/* {game.user_games.favorite? "favorited": "not favorited"} */}
                            {user_game.favorite ? (
                                <button className="emoji-button favorite active" onClick={() => toggleFavorite(user_game)}>★</button>
                                ) : (
                                <button className="emoji-button favorite" onClick={() => toggleFavorite(user_game)}>☆</button>
                                )}
                            <button className="delete-button" onClick={() => handleDeleteGame(user_game.id)}>🗑</button>  
                        </li>)}
                    </ul>
                </div>
                <div className="reviewed">
                    <h3>Reviewed Games</h3>
                    <ul>
                        {user.reviews.map(review => 
                            <div key={review.id} className="user-review">
                                <div className="user-review-head ">
                                    <div className="user-rating-circle">{review.rating}</div>
                                    <div className="user-game-title">{review.game.title}</div>
                                </div>
                                <div className="user-review-content">{review.content}</div>
                            </div>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserPage
