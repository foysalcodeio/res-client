import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home/Home'
import Menu from '../Pages/Menu/Menu'
import Order from '../Pages/Order/Order/Order'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/SignUp/SignUp'
import Secret from '../Pages/Home/Home/Shared/Secret/Secret'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../Layout/Dashboard'
import Cart from '../Pages/Dashboard/Cart/Cart'
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'menu',
        element: <Menu></Menu>
      },
      {
        path: 'order',
        element: <Order></Order>
      },
      {
        path: 'order/:category',
        element: <Order></Order>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path: 'cart',
        element: <Cart></Cart>
      },

      //admin routes
      {
        path : 'users',
        element: <AllUsers></AllUsers>
      }
    ]
  }
])
