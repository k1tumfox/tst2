import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import { SET_USERS } from './reducers/dataReducer';

import { authenticateUser, fetchUser, generateId } from "./helpers";


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


  // <div className="App" >
  // {user && (
  //   <>
  //     <h2>Hi {user.fullname}, So the secrets are:</h2>
  //     <ul>
  //       <li>Caramilks are made upside down</li>
  //       <li>The tooth fairy is colluding with dentists</li>
  //     </ul>
  //     <a href="/logout">Logout?</a>
  //   </>
  // )}
  
  // { !user && (
  //   <div>
  //     <a href="/login">Do you want to login?</a> or <a href="/register">Register?</a>
  //   </div>
  // )}

  return (
    <div className="App" >

      { user ? (
        <>
          <h2>Hi {user.fullname}, So the secrets are:</h2>
          <ul>
            <li>Caramilks are made upside down</li>
            <li>The tooth fairy is colluding with dentists</li>
          </ul>
          <a href="/logout">Logout?</a>
        </>
      ) : (
        <div>
          <a href="/login">Do you want to login?</a> or <a href="/register">Register?</a>
        </div>
      )}
      
      <h1> Users </h1>

      <ul> {userList} </ul>
    </div >
  );
}

export default App;
