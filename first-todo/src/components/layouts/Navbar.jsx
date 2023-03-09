import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <nav className="navbar">
      <Link to='/'>Home</Link>
      <Link to='/todos'>Todos</Link>
      <Link to='/users'>Users</Link>
    </nav>
  )
}