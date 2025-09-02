import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../../providers/AuthProvider'
import { FaShoppingCart } from 'react-icons/fa'
import { SlLogin } from 'react-icons/sl'
import useCart from '../../../../../hooks/useCart'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [cart] = useCart()

  const handleLogOut = () => {
    logOut().catch(error => console.log(error))
  }

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/menu">Our Menu</Link></li>
      <li><Link to="/order/salad">Order Food</Link></li>
      <li><Link to="/secret">Secret</Link></li>
      <li>
        <Link to="/dashboard/cart">
          <div className="relative">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {cart.length}
            </span>
          </div>
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <button onClick={handleLogOut} className="btn btn-sm btn-error text-white">Logout</button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login" className="text-lg"><SlLogin /></Link>
        </li>
      )}
    </>
  )

  return (
    <div className="navbar bg-base-100 fixed z-20 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold ml-2">MyShop</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">
        {user && (
          <span className="mr-4 text-sm font-medium text-gray-600">
            {user.displayName}
          </span>
        )}
        <Link to="/dashboard" className="btn btn-sm btn-primary">Dashboard</Link>
      </div>
    </div>
  )
}

export default Navbar
