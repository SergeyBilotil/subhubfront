import React from 'react';
import './App.css';
import 'typeface-roboto';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./components/RegisterPage/PrivateRoute"
import TopNav from './components/TopNav/TopNav';
import {LoginPage} from './components/RegisterPage/LoginPage'

function App() {
  return (
    <div className="app-block">
      
    <TopNav />
    </div>
  );
}

export default App;
