export default function TodoItem({item, handleClick, STATE }) {

  return (
    <li>
      <span>{item.title}</span>
      <button type='button' onClick={() => handleClick(item)}>{item.state === STATE.TODO ? 'Done' : 'Todo'}</button>
    </li>
  )
}