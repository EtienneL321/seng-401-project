import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import GreetingBanner from '../GreetingBanner';
import Axios from 'axios';
import './Login.css';
import '../../App.css';
import '../LoginSignup.css';

const Login = (props) => {

    const ROUTES = {
        'D':'/doctor',
        'N':'/nurse',
        'P':'/pharmacist',
        'A':'/administrator'
    }

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const userRef = useRef();
    const errRef = useRef();

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setErrorMessage("");
    },[enteredUsername, enteredPassword]);

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

     const loginHandler = async (e) => {
        e.preventDefault();
        let user = {
            username: enteredUsername,
            password: enteredPassword
        }
        
        try {
            const response = await Axios.get("http://localhost:3001/api/get/staff/password", {params: user});
            console.log("THIS IS RESONSE", response.data);
            if(response?.data.length == 0){
                console.log("Invalid Combination");
                setErrorMessage("Invalid Combination");
                return;
            }
            const id = response?.data[0]?.staffID;
            const type = [response?.data[0]?.staffType];
            const clearanceLevel = response?.data[0]?.clearanceLevel;
            setAuth({id, type, clearanceLevel});
            navigate(ROUTES[type], {replace : true});
        } catch (error) {
            setErrorMessage("There was an error");
        }
        setEnteredUsername("");
        setEnteredPassword("");
    }

    return (
        <div className='App'>
            <GreetingBanner />
            <div className='rightLoginContainer'>
                <div className='loginDetialsContainer'>
                    <form onSubmit={loginHandler}>
                        <h2>Login</h2>
                        <div className="login-item">
                            <p>Username</p>
                            <div className='input-container'>
                                <Input 
                                    placeholder="Username" 
                                    value={enteredUsername} 
                                    onChange={usernameChangeHandler}
                                    inputRef={userRef}
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
                        <Button type="submit" variant="outlined" color="primary" >
                            Login
                        </Button>
                        <div>
                            <p id="errorMessage" ref={errRef} style={errorMessage ? {display:'block'} : {display:'none'}} aria-live="assertive">{errorMessage}</p>
                        </div>
                    </form>
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