import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {

const {name, image, price, recipe, _id} = item;
const {user} = useAuth(); //own create hooks
const navigate = useNavigate();
const location = useLocation();
const axiosSecure = useAxiosSecure();
const [, refetch] = useCart() // when you handle 


const handleAddtoCart = () => {
  if (user && user.email) {
    const cartItem = {
      menuId: _id,
      email: user.email,
      name,
      image,
      price
    }

    axiosSecure.post('/carts', cartItem)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to cart`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch(); // Refresh the cart data
        }
      });
  } else {
    Swal.fire({
      title: "You are not logged in",
      text: "Please login to add items to your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, login!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login', { state: { from: location } })
      }
    });
  }
}


  return (
    <div className='card w-96 shadow-xl py-4'>
      <figure className='px-0 pt-0'>
        <img
          src={image}
          alt='food'
          className='rounded-xl'
        />
      </figure>
      <p className="absolute p-1 mr-4 mt-4 px-4 rounded-md shadow-xl bg-black text-white right-0">${price}</p>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{name}</h2>
        <p>
          {recipe}
        </p>
        <div className='card-actions'>
          <button
          onClick={handleAddtoCart}
          className='btn btn-accent'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
