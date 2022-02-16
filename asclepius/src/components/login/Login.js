import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Login = (props) => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const loginHandler = () => {
        // console.log("login");
        // console.log(enteredUsername);
        // console.log(enteredPassword);
        let user = {
            username: enteredUsername,
            password: enteredPassword
        }
        props.logUser(user);
        setEnteredUsername("");
        setEnteredPassword("");
    }

    return (
        <div>
            <h2>Username</h2>
            <div className="questionBox">
                <input
                    type="text"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                />
            </div>
            <h2>Password</h2>
            <div className="questionBox">
            <input
                    type="password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                />
            </div>
            <button onClick={loginHandler}>Login</button>
        </div>
    )
}

export default Login;