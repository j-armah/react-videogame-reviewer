import React, {useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import ReactPlayer from "react-player"
import EditReview from './EditReview'

function GamePage({ addGame, currentUser, setGameAvg}) {
    const [game, setGame] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(1)
    const [reviews, setReviews] = useState([])
    const [average, setAverage] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
  

    const params = useParams()
    
    //console.log(params.id)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/`)
          .then((r) => r.json())
          .then((reviews) => {
            
            const gameReviews = reviews.filter(review => review.game_id === parseInt(params.id))
            //console.log(gameReviews)
            setReviews(gameReviews.reverse());
          });
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
          .then((r) => r.json())
          .then((game) => {
              //console.log(game)
            setGame(game);
            setIsLoaded(true);
            let sumRating = game.reviews.map(review => review.rating).reduce((a, b) => a + b, 0)
            let averageRating = sumRating / game.reviews.length
            isNaN(averageRating) ? setAverage(0) : setAverage(averageRating.toFixed(1))
          });
    }, [params.id]);

    
    function handleAddReview(newReview) {
        const newReviews = [newReview, ...reviews]
        setReviews(newReviews)
        
        // let sumRating = newReviews.reviews.map(review => review.rating).reduce((a, b) => a + b, 0)
        // let averageRating = sumRating / newReviews.reviews.length
        // // isNaN(averageRating) ? setAverage(0) : setAverage(averageRating)
        // // setAverage(averageRating)
        // console.log(reviews)
    }

    function handleSubmit(event) {
        event.preventDefault()
        //console.log(content, rating)
        fetch("http://localhost:4000/reviews", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                game_id: game.id,
                content: content,
                rating: parseFloat(rating),
                user_id: currentUser.id
            })
        })
        .then(response => response.json())
        .then(newReview => {
            if (newReview.id !== null) {
                handleAddReview(newReview)
                
                // setAverage(newAvg)
            } else {
                alert("Already reviewed game!")
            } 
        })
    }

    function handleDeleteReview(reviewObj) {
        //console.log(key)
        fetch(`http://localhost:4000/reviews/${reviewObj.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            const newReviews = reviews.filter(review => review.id !== reviewObj.id)
            setReviews(newReviews)
            // let newSum = newReviews.reviews.map(review => review.rating).reduce((a, b) => a + b, 0)
            //let newAvg = newSum - reviewObj.rating
            
            //setAverage(newAvg)
            // console.log(newSum)
        })
    }



    // console.log(average)

    useEffect(() => {
        let newSum = reviews.map(review => review.rating).reduce((a, b) => a + b, 0)
        let newAvg = newSum / reviews.length
        //console.log(newAvg)
        {isNaN(newAvg) ? setAverage(0) : setAverage(newAvg.toFixed(1))} 
        {isNaN(newAvg) ? setGameAvg(0) : setGameAvg(newAvg.toFixed(1))}
    }, [reviews])


    if (!isLoaded) return <h2>Loading...</h2>;
    
    return (
        <div className="gamepage-div">
            {/* <h1>{game.title}</h1> */}
            <div className="game-page-info">
                <div className="video">
                    <ReactPlayer
                        width={1100}
                        height={460}
                        controls={true}
                        volume={0.2}
                        playing={true}
                        muted={true}
                        url={game.video}
                    />
                </div>
                <div className="game-banner">
                    <img src={game.banner}/>
                </div>
                <div className="game-info">
                    <div className="score-div">
                        <div className="game-score">{average} </div>
                        <div className="score-div-content">
                            <p style={{fontSize: 20}}>Score </p>
                            <p>{reviews.length} User reviews</p>
                        </div>
                    </div>
                    <div className="page-review-head">{game.title}</div>
                        <div className="game-info-div">
                            <p>{game.description}</p>
                            <p style={{fontSize: 16}}>{game.genre}</p>
                            <p style={{fontSize: 16}}>{game.maturity_rating}</p>
                        </div>
                        {!currentUser ? null : <button className="submit-button" onClick={() => addGame(game)}> Add to Game List</button>}
                    </div>
                
                <div className="game-review">
                    <div className="page-review-head">Reviews</div>
                    <ul>
                        {reviews.map(review => 
                            <div className="review-info" key={review.id}>
                                {isEditing ? null : <div>
                                    <div className="review-head">
                                        <div className={review.rating <= 3 ? "rating-circle-red" : review.rating <= 7 ? "rating-circle-yellow" : "rating-circle"}>{review.rating}</div> 
                                        <div className="review-username"><NavLink exact to={`/users/${review.user.id}`}>{review.user.username}</NavLink></div>
                                    </div>
                                    <div className="review-content">{review.content}</div>
                                </div>}
                                {!currentUser ? 
                                null
                                : currentUser.id === review.user_id
                                ? 
                                <div>
                                    {/* onUpdateReview={handleUpdateReview} */}
                                    {isEditing ? <EditReview 
                                                    id={review.id} 
                                                    content={review.content} 
                                                    rating={review.rating} 
                                                    reviews={reviews} 
                                                    setReviews={setReviews}
                                                    setIsEditing={setIsEditing}
                                                    isEditing={isEditing}
                                                />
                                    :  null}
                                    <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>📝</button>
                                    <button className="delete-button" onClick={() => handleDeleteReview(review)}>🗑</button>
                                </div>
                                : null}
                            </div>
                        )}
                    </ul>
                    {/* Flip div ? */}
                    {!currentUser ? 
                        <div style={{textAlign: "center"}}>Sign in to leave a review</div>
                        : !reviews.map(review => review.user_id).includes(currentUser.id)
                        ? 
                        <div className="review-form">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Write a review:<br/>
                                    <textarea name="content" value={content} onChange ={event => setContent(event.target.value)}/>
                                    <br/>
                                    Rate: <select name="rating" id="rating" form="review" value={rating} onChange={event => setRating(event.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    
                                    </select>
                                </label>
                                <br/>
                                <button type="submit" className="submit-button">Submit Review</button>
                            </form>
                        </div> : null}
                </div>
            </div>
        </div>
    )
}

export default GamePage
