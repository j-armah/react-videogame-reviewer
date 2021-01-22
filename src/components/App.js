
import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import GameList from './GameList';
import GamePage from './GamePage'
import Login from './Login'
import UserPage from './UserPage'
import Nav from './Nav'

function App() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);

  console.log(games)

  return (
   <div>
     <Route>
      <header>LOGO HEADER</header>
      {/* Navbar prob need its own component? for search and filter, but only when on /games */}
      <Nav />
     </Route>
     <Switch>
        <Route exact path="/games">
          <main className="game-library">
            <GameList games={games}/>
          </main>
        </Route>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path="/games/:id">
          <GamePage />
        </Route>
        <Route exact path="/users/:id">
          <UserPage />
        </Route>
     </Switch>
   </div>
  );
}

export default App;

// {/* <Switch>
// <Route exact path="/">
//   <Home />
// </Route>
// <Route path="/projects/add">
//   <ProjectForm onAddProject={handleAddProject} />
// </Route>
// <Route exact path="/projects/:id">
//   <ProjectDetail />
// </Route>
// <Route path="/projects">
//   <ProjectList />
// </Route>
// <Route path="*">
//   <Redirect to="/" />
// </Route>
// </Switch> */}
