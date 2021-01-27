import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom'

function SignUp({handleLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("")
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    
    const formData = { username, password };
    console.log(formData)

    fetch(`${process.env.REACT_APP_API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      if (data.user) {
        handleLogin(data.user);
        localStorage.setItem("token", data.token)
      } else {
        setErrors(data.error)
      }
    })
  }

  return (
    <div className="login">
      <div className="login-form-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Welcome to GameRx</h3>

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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Signup" />
        </form>
        <div className="errors">{errors}</div>
        <button> <NavLink exact to="/">Login</NavLink></button>
        <button onClick={() => history.push("/games")}> Continue as Guest</button>
      </div>
    </div>
  );
}

export default SignUp;