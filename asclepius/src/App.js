import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import './App.css';
import Login from './components/login/Login';
import HomePage from './components/home/HomePage';

const USERS = [
  {
    username: "Etienne",
    password: "chocolate"
  },
  {
    username: "Ishan",
    password: "strawberry"
  },
  {
    username: "Girimer",
    password: "apple"
  }
]

const mysql = require("mysql");

const db = mysql.createConnnection({
  host: "seng401.c8o5onccwnvz.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "njoy",
  password: "Joy12345~!",
  database: "seng401",

});

const App = () => {
  const [isUser, setIsUser] = useState(false);
  const [userList, setUserList] = useState(USERS);

  const loginHandler = (enteredUser) => {
    for(let i of userList) {
      console.log(i);
      console.log(enteredUser);
      if ((enteredUser.username === i.username) && (enteredUser.password === i.password)) {
        setIsUser(true);
        break;
      } else {
        setIsUser(false);
      }
    }

    console.log(isUser);
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login logUser={loginHandler} auth={isUser}/>}/>
            <Route path="/home" element={<HomePage/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
