import { useParams } from 'react-router-dom'
import React from 'react'
import UserItem from '../components/UserItem'

export default function User() {
  const {id} = useParams()
  const user = {
    id: 1,
    name: 'Toto'
  }
  return (
    <>
    <p>User n° {id}</p>
      <UserItem item={user} />
    </>
  )
}