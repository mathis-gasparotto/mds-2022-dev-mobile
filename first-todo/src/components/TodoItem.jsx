export default function TodoItem({item, handleClickDone, handleClickDelete, STATE }) {

  return (
    <li>
      <span>{item.title}</span>
      <button type='button' onClick={() => handleClickDone(item)}>{item.state === STATE.TODO ? 'Done' : 'Todo'}</button>
      <button type='button' onClick={() => handleClickDelete(item)}>Delete</button>
    </li>
  )
}