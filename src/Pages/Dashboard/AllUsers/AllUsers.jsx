import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaTrash, FaUsers } from 'react-icons/fa'
import Swal from 'sweetalert2'

const AllUsers = () => {
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data;
    }
  })

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is now an Admin!`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire('Deleted!', `${user.name} has been removed.`, 'success')
            }
          })
      }
    })
  }

  if (isLoading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading users...</div>
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-semibold">All Users</h2>
        <h2 className="text-xl">Total: {users.length}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photo || 'https://img.daisyui.com/images/profile/demo/2@94.webp'}
                          alt="User avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.role === 'admin' ? (
                    <span className="font-semibold text-green-500">Admin</span>
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm btn-outline">
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user)} className="btn btn-sm btn-error text-white">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers;
