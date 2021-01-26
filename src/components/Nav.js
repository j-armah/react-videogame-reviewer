import React from 'react'
import { NavLink, useHistory } from "react-router-dom";

function Nav({currentUser, handleLogout, setSearch}) {

    //console.log(window.location.pathname)
    const history = useHistory()
    
    return (
        <nav className="nav-bar">
            <div className="user-nav-div">
                {!currentUser ?
                    <div>
                        <NavLink exact to={"/"}>
                            Login
                        </NavLink>
                    </div> 
                    :
                    <div>
                        <NavLink exact to={`/users/${currentUser.id}`} className="nav-button">
                            {currentUser.username}
                        </NavLink>
                        <button className="nav-button" onClick={handleLogout}>Logout</button>
                    </div>}
            </div>
            <div className="game-filter-div">
                <NavLink exact to="/games" className="nav-button">
                    All Games
                </NavLink>
                {false ? null : 
                <div className="nav-search">
                    <input type="text" placeholder="search games..." onChange={(e) => setSearch(e.target.value)}/>
                </div>
                }
            </div>
        </nav>
    )
}

export default Nav
