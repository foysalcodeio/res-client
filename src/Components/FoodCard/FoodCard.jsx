const FoodCard = ({ item }) => {
const {name, image, price, recipe} = item;
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
          <button className='btn btn-accent'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
