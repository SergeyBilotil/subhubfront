import React from 'react';
import './App.css';
import 'typeface-roboto';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./components/RegisterPage/PrivateRoute"
import TopNav from './components/TopNav/TopNav';
import {LoginPage} from './components/RegisterPage/LoginPage'

function App() {
  return (
    <Router>
    <div>
        <PrivateRoute exact path="/" component={TopNav} />
        <Route path="/login" component={LoginPage} />
    </div>
</Router>
  );
}

export default App;
