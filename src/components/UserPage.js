import React from 'react'

function UserPage() {
    return (
        <div>
            <h1> User 1 </h1>
            {/* Shows username and user info, shows a list of games they've played, a list of their favorite games, and a list of their reviews */}
            <div className="user-page-info">
                <div className="game-list">
                    Gamelist 
                    {/* Can sort by favorites */}
                </div>
                <div className="reviewed">
                    Reviewed games
                </div>
            </div>
        </div>
    )
}

export default UserPage
