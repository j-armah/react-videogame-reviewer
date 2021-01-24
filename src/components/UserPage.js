import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function UserPage() {
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const params = useParams()
    //console.log(params.id)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
          .then((r) => r.json())
          .then((user) => {
              console.log(user)
            setUser(user);
            setIsLoaded(true);
          });
    }, [params.id]);

    console.log(user)
    if (!isLoaded) return <h2>Loading...</h2>;
    return (
        <div>
            <h1> User 1 </h1>
            {/* Shows username and user info, shows a list of games they've played, a list of their favorite games, and a list of their reviews */}
            <div className="user-page-info">
                <div className="game-list">
                    Gamelist 
                    {/* Can sort by favorites */}
                    <ul>
                        {user.games.map(game => <li key={game.id}>{game.title}</li>)}
                    </ul>
                </div>
                <div className="reviewed">
                    Reviewed games
                    <ul>
                        {user.reviews.map(review => <li key={review.id}>{review.content}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserPage
