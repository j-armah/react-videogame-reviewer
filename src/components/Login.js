import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Login({ setCurrentUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    function login() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then((r) => r.json())
        .then(data => {
            setCurrentUser(data)
        });
    }

    function handleSubmit(e) {
        e.preventDefault()

        const formData = { username, password }

        console.log(formData)
    }


    return (
        <div className="login">
            <div className="login-form-box">
                <h3>Welcome to asdasdasd</h3>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Login</h3>
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
                    <input type="submit" value="Login" />
                </form>


                <h5>Scuffed buttons</h5>
                <button onClick={login}> Login </button>
                <button> Sign Up</button>
                <button onClick={() => history.push("/games")}> Continue as Guest</button>
            </div>
            
            {/* Login Form here, button hit to switch to sign up form... Probably use fake auth for now */}
        </div>
    )
}

export default Login
