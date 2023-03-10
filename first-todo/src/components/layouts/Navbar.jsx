import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/todos'>Todos</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
      </ul>
    </nav>
  )
}