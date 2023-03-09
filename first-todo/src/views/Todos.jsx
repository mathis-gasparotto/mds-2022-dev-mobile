import { useState } from 'react'
import TodoItem from '../components/TodoItem'
import React from 'react'

const STATE = {
  TODO: 'todo',
  DONE: 'done'
}

export default function Todos() {
  const [form, setForm] = useState({todo: ''})
  const [todos, setTodos] = useState([])
  const [id, setId] = useState(1)

  
function handleSubmit (event) {
  event.preventDefault()

  setTodos([
    ...todos,
    {
      id,
      title: form.todo,
      state: STATE.TODO
    }
  ])

  setForm({
    ...form,
    todo: ''
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
  const newTodos = todos.map( (e) => {
    if(e.id !== item.id) return e

    return {
      ...e,
      state: item.state === STATE.DONE ? STATE.TODO : STATE.DONE
    }
  })

  setTodos(newTodos)
}

  return (
    <div className="todos">
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" onChange={handleChange} value={form.todo} />
        <button type="submit">Ajouter</button>
      </form>
      <h2>TODOS</h2>
      <ul>
        {todos
          .filter( (item) => {
            return item.state === STATE.TODO
          })
          .map( (item) => {
            return <TodoItem key={item.id} item={item} handleClick={handleClick} STATE={STATE} />
          })
        }
      </ul>
      <h2>DONE</h2>
      <ul>
        {todos
          .filter( (item) => {
            return item.state === STATE.DONE
          })
          .map( (item) => {
            return <TodoItem key={item.id} item={item} handleClick={handleClick} STATE={STATE} />
          })
        }
      </ul>
    </div>
  )
}
