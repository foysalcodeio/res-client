import {
  FaAddressBook,
  FaAddressCard,
  FaBook,
  FaComment,
  FaHome,
  FaList,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils
} from 'react-icons/fa'
import { IoFastFood } from 'react-icons/io5'
import { NavLink, Outlet } from 'react-router-dom'
import useCart from '../hooks/useCart'
import useAdmin from '../hooks/useAdmin'

const Dashboard = () => {
  const [cart] = useCart()

  // TODO : get admin value from the database

  const [isAdmin] = useAdmin()

  return (
    <div className='flex'>
      {/* side bar */}
      <div className='w-64 mt-2 min-h-full bg-gray-200'>
        <ul className='menu p-4'>
          {isAdmin ? (
            <>
              <li>
                <NavLink to='/dashboard/adminhome'>
                  {' '}
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/addItems'>
                  {' '}
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/items'>
                  {' '}
                  <FaList /> ManageItems
                </NavLink>
              </li>

              <li>
                <NavLink to='/dashboard/bookings'>
                  {' '}
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to='/dashboard/users'>
                  {' '}
                  <FaUsers /> All Users
                </NavLink>
              </li>

              <li>
                <NavLink to='/dashboard/payhistory'>
                  {' '}
                  <FaAddressCard />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/cart'>
                  <FaShoppingCart />
                  My Cart {cart.length}
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/review'>
                  <FaComment /> My Review{' '}
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/bookings'>
                  {' '}
                  <FaList /> My Bookings{' '}
                </NavLink>
              </li>
              <div className='divider'></div>
            </>
          ) : (
            <>
              
            </>
          )}

          {/* shared dedicated bar */}
          <li>
            <NavLink to='/'>
              {' '}
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/salad'>
              {' '}
              <IoFastFood /> Menu{' '}
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/salad'>
              {' '}
              <FaShoppingBag /> Shop{' '}
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/salad'>
              {' '}
              <FaAddressBook /> Contact{' '}
            </NavLink>
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

//https://www.facebook.com/photo/?fbid=1318659146286847&set=a.397176341768470
