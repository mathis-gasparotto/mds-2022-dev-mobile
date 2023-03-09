import { Outlet } from 'react-router'
import Navbar from './layouts/Navbar'

export default function AppLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}