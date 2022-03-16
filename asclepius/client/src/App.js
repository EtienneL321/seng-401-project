// Controller 

import Axios from 'axios';
import React, { useState, useEffect } from 'react';
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

const App = () => {

  useEffect(() => {
    let info = { id: parameters.pid };
    console.log(notifications);
    Axios.get("http://localhost:3001/api/get/info", {params: info}).then((response) => {
      setPatientInfo(response.data[0]);
      checkNotifications(response.data[0].last_visit,response.data[0].followup_visit);
      setDateLV(myToDate(response.data[0].last_visit));
      setDateFV(myToDate(response.data[0].followup_visit));
      getTreatmentInformation();
    });
  }, []);

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
