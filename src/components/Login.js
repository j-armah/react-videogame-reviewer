import React, {useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'

function Login({ handleLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        const formData = { username, password };
        //console.log(formData)
    
        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            // then set that user in state in our App component
            console.log(data.user)
            if (data.user) {
              handleLogin(data.user)
              localStorage.setItem("token", data.token)
            } else {
              console.log(data)
              setErrors(data.error)
              // alert('Incorret username or password')
            }
          });
      }

    return (
        <div className="login">
          <audio src='http://soundimage.org/wp-content/uploads/2017/05/Nighttime-Escape.mp3' type='audio/mpeg' controls autoplay loop>Chill Music</audio>
            <div className="login-form-box">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Welcome to GamesRx!</h3>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    />
                    <button type="submit" className='submit-button'>Login</button>
                </form>
                <div className="errors">{errors}</div>
                <button className="submit-button"> <NavLink exact to="/signup" className='submit-button'>Sign Up</NavLink></button>
                <button className="submit-button" onClick={() => history.push("/games")}> Continue as Guest</button>
            </div>
        </div>
    )
}

export default Login
