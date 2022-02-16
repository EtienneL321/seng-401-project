import React, { useState } from 'react';
import { Route, Routes } from "react-router";
import './App.css';
import Login from './components/login/Login';

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

const App = () => {
  const [isUser, setIsUser] = useState(false);
  const [userList, setUserList] = useState(USERS);

  const loginHandler = (enteredUser) => {
    if (enteredUser in userList) {
      setIsUser(true);
    }
    console.log(isUser);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Login logUser={loginHandler}/>
      </header>
    </div>
  );
}

export default App;
