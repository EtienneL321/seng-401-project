import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import GreetingBanner from "../GreetingBanner";
import "../../App.css";
import "../LoginSignup.css";

const SignUp = () => {
  const ROUTES = {
    1: "/doctor",
    2: "/nurse",
    3: "/pharmacist",
    0: "/administrator",
  };

  const navigate = useNavigate();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [secondaryPassword, setSecondaryPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitalKey, setHospitalKey] = useState("");

  /*
   * When values are reset, useEffect is triggered and removes the
   * error message before the user can view it.
   */
  //   useEffect(() => {
  //     setErrorMessage("");
  //   }, [enteredUsername, enteredPassword, secondaryPassword, hospitalKey]);

  const reset = () => {
    setEnteredUsername("");
    setEnteredPassword("");
    setSecondaryPassword("");
    setHospitalKey("");
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    let user = {
      username: enteredUsername,
      password: enteredPassword,
    };
    setErrorMessage("");

    try {
      if (enteredPassword != secondaryPassword) {
        console.log("Password does not match");
        setErrorMessage("Password does not match");
        reset();
        return;
      }
      if (hospitalKey.slice(0, 3) < 0 || hospitalKey.slice(0, 3) > 3) {
        console.log("Invalid Hospital Key");
        setErrorMessage("Invalid Hospital Key");
        reset();
        return;
      }
      if (enteredPassword.length === 0 || enteredUsername.length === 0) {
        console.log("Invalid Combination");
        setErrorMessage("Invalid Combination");
        reset();
        return;
      }
      console.log("New user added to database");
      /* Still need to add authentication */
      navigate(ROUTES[hospitalKey.slice(2, 3)], { replace: true });
    } catch (error) {
      setErrorMessage("There was an error");
    }
    reset();
  };

  return (
    <div className="App">
      <GreetingBanner />
      <div className="rightLoginContainer">
        <div className="loginDetialsContainer">
          <form onSubmit={loginHandler}>
            <h2>Signup</h2>
            <div className="login-item">
              <p>Username</p>
              <div className="input-container">
                <Input
                  placeholder="Username"
                  value={enteredUsername}
                  onChange={(e) => setEnteredUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="login-item">
              <p>Password</p>
              <div className="input-container">
                <Input
                  placeholder="Password"
                  value={enteredPassword}
                  type="password"
                  onChange={(e) => setEnteredPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="login-item">
              <p>Confirm Password</p>
              <div className="input-container">
                <Input
                  placeholder="Password"
                  value={secondaryPassword}
                  type="password"
                  onChange={(e) => setSecondaryPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="login-item">
              <p>Hospital Key</p>
              <div className="input-container">
                <Input
                  placeholder="000-12345"
                  value={hospitalKey}
                  onChange={(e) => setHospitalKey(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" variant="outlined" color="primary">
              Sign Up
            </Button>
            <div>
              <p
                id="errorMessage"
                style={
                  errorMessage ? { display: "block" } : { display: "none" }
                }
                aria-live="assertive"
              >
                {errorMessage}
              </p>
            </div>
            <div className="switch-sign-up-login-container">
              <p>Already have an account?</p>
              <Link to="/login">
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
