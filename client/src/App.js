import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import { SET_USERS } from './reducers/dataReducer';

import { authenticateUser, fetchUser, generateId } from "./helpers";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Weight from './Weight'
import Home from './Home'
import Diet from './Diet'
import Goals from './Goals'
import Login from './Login'
import Register from './Register'

function App() {

  const { state, dispatch } = useApplicationData();

  useEffect(() => {

    axios({
      method: 'GET',
      url: '/api/users'
    })
      .then(result => dispatch({ type: SET_USERS, users: result.data }))
      .catch(err => console.log(err.message))

  }, [])
  const userList = state.users.map((user) => (<li key={user.id}> {user.first_name} {user.last_name} {user.email}</li>));


  return (
    <div className="App" >
      
      <Router>
        <Navbar />
        
        <Switch>          
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/weight'>
            <Weight />
          </Route>

          <Route path='/diet'>
            <Diet />
          </Route>

          <Route path='/goals'>
            <Goals />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='*'>
            <h1>404 - Not Found</h1>
          </Route>
        </Switch>
      </Router>


      <h1> Users </h1>

      <ul> {userList} </ul>


    </div >
  );
}

export default App;
