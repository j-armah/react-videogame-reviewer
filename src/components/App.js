
import React, {useState, useEffect} from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import GameList from './GameList';
import GamePage from './GamePage'
import Login from './Login'
import UserPage from './UserPage'
import Nav from './Nav'
import SignUp from './SignUp'

function App() {
  const [games, setGames] = useState([])
  //const [currentUser, setCurrentUser] = useState({id: 8, username: "test user 1"})
  const [currentUser, setCurrentUser] = useState(null)
  const [userGames, setUserGames] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          console.log(user)
          setCurrentUser(user);
        });
    }
  }, []);

  //console.log(currentUser)

  const handleLogin = (user) => {
    console.log(user)
    setCurrentUser(user)
    history.push("/games")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    history.push("/")
  }

  const handleAddGame = (gameObj) => {
    console.log(gameObj)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        game_id : gameObj.id,
        user_id: currentUser.id,
        favorite: false
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.id !== null) {
        setUserGames([...userGames, data])
      } else {
          alert("Already added game!")
      } 
      
    })
  }

  const handleFavorite = (updatedUserGame) => {
    const updatedUserGames = userGames.map(userGame => {
      if (userGame.id === updatedUserGame.id) {
        return {...userGame, favorite: updatedUserGame.favorite}
      } else {
        return userGame
      }
    })
    setUserGames(updatedUserGames)
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games`)
      .then(response => response.json())
      .then(data => {
        setUserGames(data)
      })
  }, []);

  const randomGame = () => {
    let game = games[Math.floor(Math.random() * games.length)]
    history.push(`/games/${game.id}`)
  }

  
  let filteredGames = games.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))

  if (filter !== "all") {
    filteredGames = filteredGames.filter(game => game.genre === filter)
  }
  

  console.log(currentUser)
  // if (!currentUser) {
  //   return (

  //   )
  // } else {
    return (
    <div className="root">
        <Route>
            <header>LOGO HEADER</header>
            {/* Navbar prob need its own component? for search and filter, but only when on /games */}
            <Nav randomGame={randomGame} filter={filter} setFilter={setFilter} setSearch={setSearch} currentUser={currentUser} handleLogout={handleLogout}/>
        </Route>
        <Switch>
          <Route exact path="/games">
            <main className="game-library">
              <GameList games={filteredGames}/>
            </main>
          </Route>
          <Route exact path="/games/:id">
            <GamePage currentUser={currentUser} addGame={handleAddGame}/>
          </Route>
          <Route exact path="/users/:id">
            <UserPage currentUser={currentUser} setUserGames={setUserGames} userGames={userGames} handleFavorite={handleFavorite}/>
          </Route>
          {/* <Route path="*">
            <Redirect to="/games" />
          </Route> */}
          <Route exact path='/'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path='/signup'>
            <SignUp handleLogin={handleLogin} />
          </Route>
      </Switch>
    </div>
    );
  //}
}

export default App;

