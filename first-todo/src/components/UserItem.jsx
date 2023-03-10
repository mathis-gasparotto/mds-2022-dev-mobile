import { Link } from 'react-router-dom'

export default function UserItem({item, handleClick}) {

  return (
    <li>
      <span>{item.name}</span>
      <button type='button' onClick={() => handleClick(item)}>Delete</button>
      <Link to={`/users/${item.id}`}>User page</Link>
    </li>
  )
}