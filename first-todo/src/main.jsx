import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Todos from './views/Todos'
import Users from './views/Users'
import './App.css'
import AppLayout from './components/AppLayout'
import User from './views/User'
import Home from './views/Home'

const router = createBrowserRouter( [
  {
    path: '/',
    element: <AppLayout/>,
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)