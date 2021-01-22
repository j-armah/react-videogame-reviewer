import React from 'react'
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav className="nav-bar">
            <NavLink exact to="/users/1" className="button">
                User1
            </NavLink>
            <NavLink exact to="/games" className="button">
                All Games
            </NavLink>
        </nav>
    )
}

export default Nav
