import React from 'react'
// import './Navbar.scss'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
      <Link to='/'><a className="brand-logo">Logo</a></Link>
        
        <ul id="nav-mobile" className="right">
          <li><Link to='/weight'>Weight</Link></li>
          <li><Link to='/diet'>Diet</Link></li>
          <li><Link to='/goals'>Goals</Link></li>
        </ul>

      </div>
    </nav>
  )
}