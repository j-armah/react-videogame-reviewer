import React, {useState} from 'react'

function Login({ setCurrentUser }) {
    function login() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/`, {
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


    return (
        <div className="login">
            <div className="login-form">
                <h3>LOGIN!!!!!</h3>
                <button onClick={login}> Login </button>
            </div>
            {/* Login Form here, button hit to switch to sign up form... Probably use fake auth for now */}
        </div>
    )
}

export default Login
