
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h3>404 Not Found</h3>
      <Link to='/dashboard'>Back to Home</Link>
    </div>
  )
}

export default NotFound
