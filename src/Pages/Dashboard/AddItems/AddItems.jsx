import { useForm } from 'react-hook-form'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import { FaUtensils } from 'react-icons/fa'
import useAxiosPublic from '../../../hooks/useAxiosPublic';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// console.log(image_hosting_key)
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddItems = () => {
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data)
        //image upload to imgdbb and then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data)
    }


    return (
        <div>
            <SectionTitle heading='add an item' subHeading="What's new?" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='form-control w-full my-6'>
                        <div className="label">
                            <span className="label-text">Recipe Name *</span>
                        </div>

                        <input type="text" placeholder="Recipe Name"
                            {...register('name')}
                            className="input input-bordered w-full" />
                    </div>

                    <div className='flex gap-4'>
                        {/* category */}
                        <div className='form-control w-full my-4'>
                            <label className="label">
                                <span className="label-text">Category *</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })} className="select select-bordered w-full">
                                <option disabled value="default">Select a catorgy</option>
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
                            <input type="number" placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe', { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </label>

                    <div className='form-control w-full my-4'>
                        <input {...register('image')}  type="file" className='file-input w-full max-w-xs' />
                    </div>
                    <button className='btn'>Add Items <FaUtensils /> </button>
                </form>
            </div>
        </div>
    )
}

export default AddItems
