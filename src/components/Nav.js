import React from 'react'
import { NavLink } from "react-router-dom";

function Nav({currentUser, handleLogout}) {
    return (
        <nav className="nav-bar">
            <NavLink exact to={`/users/${currentUser.id}`} className="button">
                {currentUser.username}
            </NavLink>
            <NavLink exact to="/games" className="button">
                All Games
            </NavLink>
            {currentUser.username}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Nav
