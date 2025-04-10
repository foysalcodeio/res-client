import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../providers/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onTouched' })

  const {createUser, updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data)
    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log('user profile info updated')
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfull",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/');
        })
        .catch(error => console.log(error))
    })
  }


  return (
    <>
      <Helmet>
        <title>Bistro Boss | Signup</title>
      </Helmet>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>Sign Up now!</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
            <form onSubmit={handleSubmit(onSubmit)} className='card-body'>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  name='name'
                  {...register('name', { required: true })}
                  placeholder='Foysal Ahmed'
                  className='input input-bordered'
                  required
                />
                {errors.name && (
                  <span className='text-red-500'>This field is required</span>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Photo URL</span>
                </label>
                <input
                  type='text'
                  {...register('photoURL', { required: true })}
                  placeholder='Photo URL'
                  className='input input-bordered'
                  required
                />
              </div>



              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  {...register('email', { required: true })}
                  placeholder='foysaldev1996@gmail.com'
                  className='input input-bordered'
                  required
                />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i
                  })}
                  placeholder='password'
                  className='input input-bordered'
                  required
                />
                {errors.password?.type === 'minLength' && (
                  <p className='text-red-600'>
                    password length min 6 required{' '}
                  </p>
                )}
                {errors.password?.type === 'maxLength' && (
                  <p className='text-red-600'>
                    password length max 20 required{' '}
                  </p>
                )}

                <label className='label'>
                  <a href='#' className='label-text-alt link link-hover'>
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className='form-control mt-6'>
                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Sign Up'
                />
              </div>
            </form>
            <div className='card-body'>
            <p>Already have an account <Link className='text-blue-700 font-bold' to="/login">Login</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
