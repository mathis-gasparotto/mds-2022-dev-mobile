import { useState } from 'react'
import TodoItem from '../components/TodoItem'
import React from 'react'
import Modal from '../components/Modal'

const STATE = {
  TODO: 'todo',
  DONE: 'done'
}

export default function Todos() {
  const [form, setForm] = useState({todo: ''})
  const [todos, setTodos] = useState([])
  const [id, setId] = useState(1)
  const [modaleIsOpen, setModaleIsOpen] = useState(false);
  const [todoItem, setTodoItem] = useState({});
  

  function deleteTodo () {
    const newTodos = todos.filter( (e) => {
      return e.id !== todoItem.id
    })
  
    setTodos(newTodos)
    handleClose()
  }
  
  function handleClose () {
    setModaleIsOpen(false)
    setTodoItem({})
  };
    
  function handleOpen (item) {
    setModaleIsOpen(true)
    setTodoItem(item)
  };

  
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

function handleClickDone (item) {
  const newTodos = todos.map( (e) => {
    if(e.id !== item.id) return e

    return {
      ...e,
      state: item.state === STATE.DONE ? STATE.TODO : STATE.DONE
    }
  })

  setTodos(newTodos)
}

function handleClickDelete (item) {
  handleOpen(item)
}

  return (
    <div className="todos">
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" onChange={handleChange} value={form.todo} />
        <button type="submit">ADD</button>
      </form>
      <h2>TODOS</h2>
      <ul>
        {todos
          .filter( (item) => {
            return item.state === STATE.TODO
          })
          .map( (item) => {
            return <TodoItem key={item.id} item={item} handleClickDone={handleClickDone} handleClickDelete={handleClickDelete} STATE={STATE} />
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
            return <TodoItem key={item.id} item={item} handleClickDone={handleClickDone} handleClickDelete={handleClickDelete} STATE={STATE} />
          })
        }
      </ul>
      <Modal
        onClose={handleClose}
        open={modaleIsOpen}
      >
        <h2>Do you want delete '{todoItem.title}' todo?</h2>
        <button onClick={() => deleteTodo()}>Yes</button>
        <button onClick={() => handleClose()}>No</button>
      </Modal>
    </div>
  )
}
