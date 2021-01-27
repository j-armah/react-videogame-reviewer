import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

function Nav({currentUser, handleLogout, setSearch, setFilter, filter, randomGame}) {

    const location = useLocation()
    //console.log(location.pathname)
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
                    <div className="logged-in">
                        <div className="hey">
                            Hey!   
                        </div>
                        <div>
                            <NavLink exact to={`/users/${currentUser.id}`} className="nav-button">
                                {currentUser.username}
                            </NavLink>
                            <button className="nav-button" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>} 
            </div>
            <div className="game-filter-div">
                <NavLink exact to="/games" className="nav-button">
                    Home
                </NavLink>
                {location.pathname !== "/games" ? null : 
                <div className="nav-find-things">
                    <div className="nav-search">
                        <input type="text" placeholder="search games..." onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <div className="nav-filter">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="Action" >Action</option>
                            <option value="First-Person Shooter" >FPS</option>
                            <option value="Third-Person Shooter" >Third-Person Shooter</option>
                            <option value="Adventure" >Adventure</option>
                            <option value="Fighting" >Fighting</option>
                            <option value="Platform" >Platform</option>
                            <option value="Horror" >Horror</option>
                            <option value="Sports" >Sports</option>
                        </select>
                    </div>
                    <div>
                        <button className="nav-rdm-game" onClick={randomGame}>I'm Feeling Lucky</button>
                    </div>
                </div>
                }
            </div>
        </nav>
    )
}

export default Nav
