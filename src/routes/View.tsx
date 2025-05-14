import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Data from './Data';


const router = createBrowserRouter(Data)


const View = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default View;