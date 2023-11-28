import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1>TaskManager</h1>
      <Link to='/'>Home</Link>
      <Link to='/tasklist'>Tasks</Link>
    </div>
  )
}

export default Navbar
