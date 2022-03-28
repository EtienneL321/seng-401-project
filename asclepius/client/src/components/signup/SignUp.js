import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { TextField } from "@material-ui/core";
import GreetingBanner from "../GreetingBanner";
import axios from "axios";
import "../../App.css";
import "../LoginSignup.css";

const SignUp = () => {
  const ROUTES = {
    1: ["D", "/doctor"],
    2: ["N", "/nurse"],
    3: ["P", "/pharmacist"],
    0: ["A", "/administrator"],
  };

  const navigate = useNavigate();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [secondaryPassword, setSecondaryPassword] = useState("");
  const [enteredName, setEnteredName] = useState('');
  const [enteredAddress, setEnteredAddress] = useState(null);
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredContactNumber, setEnteredContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitalKey, setHospitalKey] = useState("");

  

  /*
   * When values are reset, useEffect is triggered and removes the
   * error message before the user can view it.
   */
    useEffect(() => {
      setErrorMessage("");
    }, [enteredUsername, enteredPassword, secondaryPassword, hospitalKey]);

  const reset = () => {
    setEnteredUsername("");
    setEnteredPassword("");
    setSecondaryPassword("");
    setHospitalKey("");
  };

  const checkHospitalKey = () => {
    const keyRegex = /^00[1-4]\-[1-5]\-[0-9]{4}$/;
    return keyRegex.test(hospitalKey);
  };

  const addStaff = async (staffData) => {
    console.log("This is from signup ", staffData);
    await axios.post("http://localhost:3001/api/post/staff/newstaff", staffData).then((response) => {
        console.log("This is the response from catch: ", response);
    }).then(() => {
        // setSuccessMessage("Patient has been added!");
    }).catch((err) => {
        // setErrorMessage(err.response.data.error);
    });
}

  const signUpHandler = async (e) => {
    e.preventDefault();
    let user = {
      username: enteredUsername,
      password: enteredPassword,
    };
    setErrorMessage("");

    try {
      if (enteredPassword !== secondaryPassword) {
        console.log("Password does not match");
        setErrorMessage("Password does not match");
        return;
      }
      if (!checkHospitalKey()) {
        console.log("Invalid Hospital Key");
        setErrorMessage("Invalid Hospital Key");
        return;
      }
      if (enteredPassword.length === 0 || enteredUsername.length === 0) {
        console.log("Invalid Combination");
        setErrorMessage("Enter username and password");
        return;
      }
      console.log("New user added to database");
      const type = [ROUTES[hospitalKey.slice(2, 3)][0]];
      console.log("This is the type", type);

      const clearanceLevel = hospitalKey.slice(4, 5);
      console.log("This is the clearanceLevel", clearanceLevel);

      let staffData = {
        username: enteredUsername,
        password: enteredPassword,
        Name: enteredName,
        Phone: enteredPhone,
        Address: enteredAddress,
        ContactNumber: enteredContactNumber,
        staffType: type,
        clearanceLevel: clearanceLevel
      }
      addStaff(staffData);

      alert("Sign Up Succesfull");
      navigate("/login", { replace: true });
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
          <form onSubmit={signUpHandler}>
            <h2>Signup</h2>
            <div>
              <TextField
                  required
                  id="filled-required"
                  label="Name"
                  type="text" 
                  value={enteredName} 
                  onChange={(e) => setEnteredName(e.target.value)}
                  size="small"
              />
            </div>
            <div>
              <TextField
                  required
                  id="filled-required"
                  label="Address"
                  type="text" 
                  multiline
                  rows={4}
                  value={enteredAddress} 
                  onChange={(e) => setEnteredAddress(e.target.value)}
                  size="small"
              />
            </div>
            <div>
              <TextField
                  required
                  id="filled-required"
                  label="Phone Number"
                  type="number" 
                  value={enteredPhone} 
                  onChange={(e) => setEnteredPhone(e.target.value)}
                  size="small"
              />
            </div>
            <div>
              <TextField
                  required
                  id="filled-required"
                  label="Contact Number"
                  type="number" 
                  value={enteredContactNumber} 
                  onChange={(e) => setEnteredContactNumber(e.target.value)}
                  size="small"
              />
            </div>
            <div className="input-container">
              <Input
                required
                placeholder="Username"
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <Input
                required
                placeholder="Password"
                value={enteredPassword}
                type="password"
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <Input
                required
                placeholder="Confirm Password"
                value={secondaryPassword}
                type="password"
                onChange={(e) => setSecondaryPassword(e.target.value)}
              />
            </div>
            <div className="login-item">
              <p>Hospital Key</p>
              <div className="input-container">
                <Input
                  required
                  placeholder="000-0-0000"
                  value={hospitalKey}
                  onChange={(e) => setHospitalKey(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" variant="outlined" color="primary" className="login-signup-button">
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
