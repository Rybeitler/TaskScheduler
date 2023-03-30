import { useWorktasksContext } from '../hooks/useWorktasksContext'
import { useAuth } from '../hooks/useAuth'

import { Link } from 'react-router-dom'

const WorktaskDetails = ({ worktask }) => {
  const {auth} = useAuth()
  return (
    <div className="WorktaskDetails-details">
      <p>{auth?.user?.firstName}</p>
      <p>{auth?.user?.lasstName}</p>
      <Link to={"/task?id=" + worktask._id}><h4>View</h4></Link>
    </div>
  )
}

export default WorktaskDetails