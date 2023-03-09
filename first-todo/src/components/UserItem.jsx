import { Link } from 'react-router-dom'

export default function UserItem({item}) {

  return (
    <li>
      <span>{item.name}</span>
      <Link to={`/users/${item.id}`}>User page</Link>
    </li>
  )
}