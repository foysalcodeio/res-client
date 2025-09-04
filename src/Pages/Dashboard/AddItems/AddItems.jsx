import { useForm } from 'react-hook-form'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import { FaUtensils } from 'react-icons/fa'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm(); // added reset
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);

    // prepare image for imgbb
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log(res.data);

      if (res.data.success) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url
        };

        const menuRes = await axiosSecure.post('/menu', menuItem);
        console.log(menuRes.data);

        if (menuRes.data.insertedId) {
          alert('Item added successfully');
          reset(); // reset form fields after success
        }
      }
    } catch (error) {
      console.error('Error uploading or saving menu item:', error);
    }
  };

  return (
    <div>
      <SectionTitle heading='add an item' subHeading="What's new?" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control w-full my-6'>
            <div className="label">
              <span className="label-text">Recipe Name *</span>
            </div>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register('name', { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className='flex gap-4'>
            {/* category */}
            <div className='form-control w-full my-4'>
              <label className="label">
                <span className="label-text">Category *</span>
              </label>
              <select
                defaultValue=""
                {...register('category', { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="">Select a category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}
            <div className='form-control w-full my-4'>
              <div className="label">
                <span className="label-text">Price *</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                {...register('price', { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* recipe details */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              {...register('recipe', { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
          </label>

          <div className='form-control w-full my-4'>
            <input
              {...register('image', { required: true })}
              type="file"
              className='file-input w-full max-w-xs'
            />
          </div>

          <button className='btn'>
            Add Items <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddItems;
