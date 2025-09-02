import { FaTrash } from 'react-icons/fa'
import useCart from '../../../hooks/useCart'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const Cart = () => {
  const [cart, refetch] = useCart()
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  const axiosSecure = useAxiosSecure()

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            })
          }
        })
      }
    })
  }
  return (
    <div className='font-poppins'>
      <div className='flex justify-evenly'>
        <h2 className='text-3xl'>Item : {cart.length}</h2>
        <h2 className='text-3xl'>Total Price : {totalPrice}</h2>
        <button className='btn btn-primary'>Pay</button>
      </div>

      <div className='overflow-x-auto md:mt-3'>
        <table className='table w-full'>
          {/* head */}
          <thead className='bg-gray-200 '>
            <tr>
              <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Pirce</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item._id}>
                <th>
                  <label>
                    <input type='checkbox' className='checkbox' />
                  </label>
                </th>
                <th>{idx + 1}</th>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-10'>
                        <img
                          src={item.image}
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn btn-ghost btn-lg'
                  >
                    <FaTrash className='text-red-500' />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cart
