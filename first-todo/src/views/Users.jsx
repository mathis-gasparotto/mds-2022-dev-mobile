import { useState } from 'react'
import React from 'react'
import UserItem from '../components/UserItem'

export default function Users() {
  const [form, setForm] = useState({todo: ''})
  const [users, setUsers] = useState([])
  const [id, setId] = useState(1)

  
function handleSubmit (event) {
  event.preventDefault()

  setUsers([
    ...users,
    {
      id,
      name: form.name
    }
  ])

  setForm({
    ...form,
    name: ''
  })

  setId((id) => id += 1)
}

function handleChange (event) {
  setForm({
    ...form,
    [event.target.name]: event.target.value
  })
}

function handleClick (item) {
  const newUsers = users.filter( (e) => {
    return e.id !== item.id
  })

  setUsers(newUsers)
}

  return (
    <div className="users">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} value={form.name} />
        <button type="submit">Ajouter</button>
      </form>
      <h2>Users</h2>
      <ul>
        {users
          .map( (item) => {
            return <UserItem key={item.id} item={item} handleClick={handleClick} />
          })
        }
      </ul>
    </div>
  )
}
