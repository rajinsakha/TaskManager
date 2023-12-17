import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Menu = () => {

  // useLocation is used to find the active location and provide active class in order to style it.
  const location = useLocation();


  return (
    <div className='menu'>
      {/* Checking the pathname, if pathname is same, change the classname to active, else empty */}
      <Link to="/TaskManager/" className={location.pathname === '/' ? 'active' : ''} >All</Link>
      <Link to="/TaskManager/pending" className={location.pathname === '/pending' ? 'active' : ''}>Pending</Link>
      <Link to="/TaskManager/completed" className={location.pathname === '/completed' ? 'active' : ''}>Completed</Link>
    </div>
  )
}

export default Menu
