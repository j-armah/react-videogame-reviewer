import React, {useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom';
// import Modal from 'react-modal'
// Modal.setAppElement('#root');



function GamePage({ addGame, currentUser}) {
    const [game, setGame] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([])
    // const [modalIsOpen, setIsOpen] = React.useState(false)
    // var subtitle;


    const params = useParams()
    //console.log(params.id)

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-20%, -50%)',
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/`)
          .then((r) => r.json())
          .then((reviews) => {
            
            const gameReviews = reviews.filter(review => review.game_id === parseInt(params.id))
            //console.log(gameReviews)
            setReviews(gameReviews);
          });
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
          .then((r) => r.json())
          .then((game) => {
              //console.log(game)
            setGame(game);
            setIsLoaded(true);
          });
    }, [params.id]);

    
    // function openModal() {
    //     setIsOpen(true);
    // }
    // function afterOpenModal() {
    //     subtitle.style.color = 'white';
    // }
    // function closeModal() {
    //     setIsOpen(false);
    // }
    function handleAddReview(newReview) {
        const newReviews = [...reviews, newReview]
        setReviews(newReviews)
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
            } else {
                alert("Already reviewed game!")
            } 
        })
    }

    function handleDeleteReview(key) {
        //console.log(key)
        fetch(`http://localhost:4000/reviews/${key}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            const newReviews = reviews.filter(review => review.id !== key)
            setReviews(newReviews)
        })
    }

    function handleEditReview(event) {
        event.preventDefault()

        console.log(event)
    }

    // function addEditForm(reviewObj) {
    //     return (
    //         <div>
    //             <form onSubmit={handleEditReview}>
    //                     <label>
    //                         Edit Review:<br/>
    //                         <textarea name="content" value={reviewObj.content} onChange ={event => setContent(event.target.value)}/>
    //                         <br/>
    //                         Rating: <select name="rating" id="rating" form="review" value={reviewObj.rating} onChange={event => setRating(event.target.value)}>
    //                             <option value="1">1</option>
    //                             <option value="2">2</option>
    //                             <option value="3">3</option>
    //                             <option value="4">4</option>
    //                             <option value="5">5</option>
    //                             <option value="6">6</option>
    //                             <option value="7">7</option>
    //                             <option value="8">8</option>
    //                             <option value="9">9</option>
    //                             <option value="10">10</option>
    //                         </select>
    //                     </label>
    //                     <button type="submit">Submit Review</button>
    //                 </form>
    //         </div>
    //     );
    // }

    function editForm (review) {
        console.log(review)
    }

    function handleEditReview(key) {
        fetch(`http://localhost:4000/reviews/${key}`, {
            method: 'PATCH',
            header: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                content: content,
                rating: rating
            })
        })
        .then(response => response.json())

    }
    //console.log(game)
    if (!isLoaded) return <h2>Loading...</h2>;
    
    return (
        <div className="gamepage-div">
            <div></div>
            <h1>{game.title}</h1>
            <div className="game-page-info">
                <div className="video">
                    Video/Poster
                    
                </div>
                <div className="game-info">
                    <h3>{game.title}</h3>
                    <p>{game.genre}</p>
                    <p>{game.maturity_rating}</p>
                    <p>{game.description}</p>
                    {!currentUser ? null : <button onClick={() => addGame(game)}> Add to Game List</button>}
                </div>
                
                <div className="game-review">
                    <div className="page-review-head">Reviews</div>
                    <ul>
                        {reviews.map(review => 
                            <div className="review-info" key={review.id}>
                                <div className="review-head">
                                    <div className="rating-circle">{review.rating}</div> 
                                    <div className="review-username"><NavLink exact to={`/users/${review.user.id}`}>{review.user.username}</NavLink></div>
                                </div>
                                <div className="review-content">{review.content}</div>
                                {!currentUser ? 
                                null 
                                : currentUser.id === review.user_id
                                ? 
                                <div>
                                    <button className="edit-button" >📝</button>
                                    
                                    {/* <Modal
                                        isOpen={modalIsOpen}
                                        onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                        className="Modal"
                                        overlayClassName="Overlay"
                                        setContent={setContent}
                                    >
                                    
                                        <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Review</h2>
                                        <form onSubmit={handleEditReview}>
                                            <label>
                                            Edit Review:<br/>
                                            <textarea name="content" value={review.content} onChange ={event => setContent(event.target.value)}/>
                                            <br/>
                                            Rating: <select name="rating" id="rating" form="review" value={review.rating} onChange={event => setRating(event.target.value)}>
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
                                                    <input type="submit" value="Edit Review"/>
                                            </label>
                                            
                                        </form>
                                    
                                    </Modal> */}
                                    <button className="delete-button" onClick={() => handleDeleteReview(review.id)}>🗑</button>
                                </div>
                                : null}
                            </div>
                        )}
                    </ul>
                    {/* Flip div ? */}
                    {!currentUser ? 
                        null 
                        : !reviews.map(review => review.user_id).includes(currentUser.id)
                        ? 
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Write a review:<br/>
                                    <textarea name="content" value={content} onChange ={event => setContent(event.target.value)}/>
                                    <br/>
                                    Rating: <select name="rating" id="rating" form="review" value={rating} onChange={event => setRating(event.target.value)}>
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
                                <button type="submit">Submit Review</button>
                            </form>
                        </div> : null}
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
