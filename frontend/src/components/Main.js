import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import Profile from './Profile/Profile';

class Main extends Component{
    render(){
        return(
            <div>
        <BrowserRouter>
          <Routes>
            <Route  path="/home" element = {<Home />}/>
            <Route  path="/signup" element = {<Signup />}/>
            <Route  path="/login" element = {<Login />}/>
            <Route  path="/profile" element = {<Profile />}/>
            <Route  path="/" element = {<Home />}/>
          </Routes>
        </BrowserRouter>
            </div>
        )
    }
}
export default Main;
