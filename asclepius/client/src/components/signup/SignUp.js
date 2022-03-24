import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import GreetingBanner from '../GreetingBanner';
import '../../App.css';
import '../LoginSignup.css'


const SignUp = () => {
    // Commented out, copied directly from login

    // const [enteredUsername, setEnteredUsername] = useState("");
    // const [enteredPassword, setEnteredPassword] = useState("");

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value);
    // }

    // const passwordChangeHandler = (event) => {
    //     setEnteredPassword(event.target.value);
    // }

    // const loginHandler = () => {
    //     let user = {
    //         username: enteredUsername,
    //         password: enteredPassword
    //     }
    //     props.logUser(user);
    //     setEnteredUsername("");
    //     setEnteredPassword("");
    //     console.log(props.auth);
    // }

    return (
        <div className='App'>
            <GreetingBanner />
            <div className='rightLoginContainer'>
                <div className='loginDetialsContainer'>
                    <h2>Signup</h2>
                    <div className="login-item">
                        <p>Username</p>
                        <div className='input-container'>
                            <Input 
                                placeholder="Username" 
                            />
                        </div>
                    </div>
                    <div className="login-item">
                        <p>Password</p>
                        <div className='input-container'>
                            <Input 
                                placeholder="Password" 
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="login-item">
                        <p>Confirm Password</p>
                        <div className='input-container'>
                            <Input 
                                placeholder="Re-enter password" 
                                type="password"
                            />
                        </div>
                    </div>
                    {/* <Link > */}
                        <Button variant="outlined" color="primary" >
                            Sign Up
                        </Button>
                    {/* </Link> */}

                    <div className='switch-sign-up-login-container'>
                        <p>Already have an account?</p>
                        <Link to='/'>
                            <Button variant="contained" color="primary" >
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default SignUp;