export function TodoItem({item, handleClick }) {

  const STATE = {
    TODO: 'todo',
    DONE: 'done'
  }

  return (
    <li>
      <span>{item.title}</span>
      <button type='button' onClick={() => handleClick(item)}>{item.state === STATE.TODO ? 'Done' : 'Todo'}</button>
    </li>
  )
}