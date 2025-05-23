import { FaAddressBook, FaAddressCard, FaCalculator, FaComment, FaHome, FaList, FaShoppingBag, FaShoppingCart } from 'react-icons/fa'
import { IoFastFood } from 'react-icons/io5'
import { NavLink, Outlet } from 'react-router-dom'
import useCart from '../hooks/useCart'

const Dashboard = () => {
  const [cart] = useCart();

  return (
    <div className='flex'>
      {/* side bar */}
      <div className='w-64 mt-2 min-h-full bg-gray-200'>
        <ul className='menu p-4'>
          <li>  
            <NavLink to='/dashboard/userhome'> <FaHome /> User Home</NavLink>
          </li>
          <li>  
            <NavLink to='/dashboard/reservation'> <FaCalculator /> Reservation</NavLink>
          </li>
          <li>  
            <NavLink to='/dashboard/payhistory'> <FaAddressCard />Payment History</NavLink>
          </li>
          <li>  
            <NavLink to='/dashboard/cart'><FaShoppingCart />My Cart {cart.length}</NavLink>
          </li>
          <li>  
            <NavLink to='/dashboard/review'><FaComment /> My Review </NavLink>
          </li>
          <li>  
            <NavLink to='/dashboard/bookings'> <FaList /> My Bookings </NavLink>
          </li>
          <div className="divider"></div>
          <li>  
            <NavLink to='/'> <FaHome /> Home</NavLink>
          </li>
          <li>  
            <NavLink to='/order/salad'> <IoFastFood /> Menu </NavLink>
          </li>
          <li>  
            <NavLink to='/order/salad'> <FaShoppingBag /> Shop </NavLink>
          </li>
          <li>  
            <NavLink to='/order/salad'> <FaAddressBook /> Contact </NavLink>
          </li>

        </ul>
      </div>
      {/* dashboard content */}
      <div className='flex-1 p-8'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Dashboard
