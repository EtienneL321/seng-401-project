// Controller

import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import HomePage from "./components/home/HomePage";
import Doctor from "./components/doctor/Doctor";
import Nurse from "./components/nurse/Nurse";
import Pharmacist from "./components/pharmacist/Pharmacist";
import Administrator from "./components/administrator/Administrator";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

const USERS = [
  {
    username: "Etienne",
    password: "chocolate",
  },
  {
    username: "Ishan",
    password: "strawberry",
  },
  {
    username: "Girimer",
    password: "apple",
  },
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles={["D"]} />}>
            <Route path="/doctor" element={<Doctor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["N"]} />}>
            <Route path="/nurse" element={<Nurse />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["P","A"]} />}>
            <Route path="/pharmacist" element={<Pharmacist />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["A"]} />}>
            <Route path="/administrator" element={<Administrator />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
