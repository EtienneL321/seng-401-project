import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import GreetingBanner from '../GreetingBanner';
import '../../App.css';
import '../LoginSignup.css'


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
        <div className='App'>
            <GreetingBanner />
            <div className='rightLoginContainer'>
                <div className='loginDetialsContainer'>
                    <h2>Login</h2>
                    <div className="login-item">
                        <p>Username</p>
                        <div className='input-container'>
                            <Input 
                                placeholder="Username" 
                                value={enteredUsername} 
                                onChange={usernameChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="login-item">
                        <p>Password</p>
                        <div className='input-container'>
                            <Input 
                                placeholder="Password" 
                                value={enteredPassword}
                                type="password"
                                onChange={passwordChangeHandler}
                            />
                        </div>
                        

                    </div>
                    <Link onClick={loginHandler} to={props.auth ? ("/home") : ("/")}>
                        <Button variant="outlined" color="primary" >
                            Login
                        </Button>
                    </Link>

                    <div className='switch-sign-up-login-container'>
                        <p>Need to Sign up?</p>
                        <Link to='/signup'>
                            <Button variant="contained" color="primary" >
                                Click here to Sign Up!
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Login;