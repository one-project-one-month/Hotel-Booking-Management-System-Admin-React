
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='relative h-[100vh]'>
      <div className='absolute top-[37%] left-[37%] flex justify-center items-center flex-col'>
        <h3 className='text-5xl py-5'>404 Not Found Page</h3>
        <Link to='/auth/login' className='text-3xl text-center underline text-red-500 mt-4'>Back To Login Again</Link>
      </div>
    </div>
  )
}

export default NotFound
