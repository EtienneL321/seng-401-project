import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
        console.log(props.auth);
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
            <Link onClick={loginHandler} to={props.auth ? ("/home") : ("/")}>
                <button type="button">
                    Login
                </button>
            </Link>
        </div>
    )
}

export default Login;