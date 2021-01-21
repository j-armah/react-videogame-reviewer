import './App.css';
import React, {useState, useEffect} from 'react';
import GameList from './components/GameList';

function App() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/games")
    .then(response => response.json())
    .then(gamesArray => {
        setGames(gamesArray)
    })
  }, []);

  console.log(games)

  return (
   <div>
     <header>LOGO HEADER</header>
     <nav className="nav-bar"> NAV BAR</nav>
     <main> 
       <GameList games={games}/>
     </main>
   </div>
  );
}

export default App;
