import { Button, makeStyles } from "@material-ui/core";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import * as React from "react";
import { Navbar } from "./components/Navbar";
import { Leftbar } from "./components/Leftbar";
import { useContext, useState } from 'react'
import Context from './Context'
import { Grid } from "@mui/material";
import { Messages } from "./components/Messages";
import { Main } from "./components/Main";
import Login from "./components/Login";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Signup from "./components/SignUp";
const App = () => {
  const location = useLocation();
  const {oauth} = useContext(Context)

  const gochannels = (
    <Navigate
      to={{
        pathname: "/channels",    
        state: { from: location },
      }}
    />
  );
  const gohome = (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={oauth ? (gochannels) : (<Login />)}/>
        <Route path="/channels/*" element={oauth ? (<Main />) : (gohome)}/>
        <Route path="/Signup/*" element={<Signup />} />
      </Routes>
    </div>

    
  );
};

export default App;
