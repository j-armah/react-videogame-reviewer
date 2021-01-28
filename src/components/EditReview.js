import React, {useState} from 'react'

function EditReview({ id, rating, content, reviews, setReviews, setIsEditing, isEditing}) {
    const [editContent, setContent] = useState(content)
    const [editRating, setRating] = useState(rating)

    function handleSubmit(event) {
        event.preventDefault()

        const data = {
            content: editContent,
            rating: parseFloat(editRating)
        }

        console.log(data)
        //onUpdateReview(id, data)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                // Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const updatedReviews = reviews.map(review => {
                if (review.id === data.id) {
                    return {...review, content: data.content, rating: data.rating}
                } else {
                    return review
                }
            })
            console.log(updatedReviews)
            setReviews(updatedReviews)
            setIsEditing(!isEditing)
        })
    }

    // function handleUpdateReview(id, reviewObj) {
    //     console.log(id, reviewObj)
    //     fetch(`http://localhost:4000/reviews/${id}`, {
    //         method: 'PATCH',
    //         header: {
    //             "Content-Type": "application/json",
    //             // Accept: "application/json"
    //         },
    //         body: JSON.stringify(reviewObj)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         const updatedReviews = reviews.map(review => {
    //             if (review.id === data.id) {
    //                 return {...review, content: data.content, rating: data.rating}
    //             } else {
    //                 return review
    //             }
    //         })
    //         //console.log(updatedReviews)
    //         setReviews(updatedReviews)
    //     })
    // }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Edit your review:<br/>
                    <textarea name="content" value={editContent} onChange ={event => setContent(event.target.value)}/>
                    <br/>
                    Rate: <select name="rating" id="rating" form="review" value={editRating} onChange={event => setRating(event.target.value)}>
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
                <button type="submit" className="submit-button">Edit Review</button>
            </form>
        </div>
    )
}

export default EditReview
