import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../providers/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import SocialLogin from '../../Components/SocialLogin/SocialLogin'

const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onTouched' })

  const { createUser, updateUserProfile } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = data => {
    console.log(data)
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user
        console.log(loggedUser)
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            //console.log('user profile info updated')

            //create user entry in the database
            const userInfo = {
              name: 'data.name',
              photo: 'data.photoURL'
            }
            axiosPublic.post('/users', userInfo).then(res => {
              if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User created successfully',
                  showConfirmButton: false,
                  timer: 1500
                })
                navigate('/')
              }
            })
          })
          .catch(error => {
            console.error('Profile update error:', error)
          })
      })
      .catch(error => {
        console.error('Signup error:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
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
              {/* Name Field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  placeholder='Foysal Ahmed'
                  className='input input-bordered'
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <span className='text-red-500'>{errors.name.message}</span>
                )}
              </div>

              {/* Photo URL Field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Photo URL</span>
                </label>
                <input
                  type='text'
                  placeholder='https://example.com/photo.jpg'
                  className='input input-bordered'
                  {...register('photoURL', {
                    required: 'Photo URL is required'
                  })}
                />
                {errors.photoURL && (
                  <span className='text-red-500'>
                    {errors.photoURL.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  placeholder='foysaldev1996@gmail.com'
                  className='input input-bordered'
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <span className='text-red-500'>{errors.email.message}</span>
                )}
              </div>

              {/* Password Field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  className='input input-bordered'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Password must be less than 20 characters'
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/,
                      message: 'Password must contain letters and numbers'
                    }
                  })}
                />
                {errors.password && (
                  <p className='text-red-600'>{errors.password.message}</p>
                )}

                <label className='label'>
                  <a href='#' className='label-text-alt link link-hover'>
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className='form-control mt-6'>
                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Sign Up'
                />
              </div>
            </form>

            {/* Link to Login */}
            <div className='card-body'>
              <p className='px-4'>
                Already have an account?{' '}
                <Link className='text-blue-700 font-bold' to='/login'>
                  Login
                </Link>
              </p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
