import './App.css'
import React from 'react'
import Todos from './views/Todos'
import Users from './views/Users'
import User from './views/User'
import Home from './views/Home'
import AppLayout from './components/AppLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter( [
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/todos',
        element: <Todos/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/:id',
        element: <User/>
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App