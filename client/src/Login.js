import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

export default function Login() {

  return (
    <>
      <h1>Login</h1> 

      <form>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />

        <input type="submit" value="Login" />
      </form>

      <ul className='login'></ul>
    </>
  )
}