import React from 'react'
import { NavLink } from "react-router-dom";

function Nav({currentUser, handleLogout}) {
    return (
        <nav className="nav-bar">
            {!currentUser ? null : <NavLink exact to={`/users/${currentUser.id}`} className="button">
                {currentUser.username}
            </NavLink>}
            <NavLink exact to="/games" className="button">
                All Games
            </NavLink>

            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Nav
