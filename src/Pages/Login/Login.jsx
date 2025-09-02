import { useContext, useEffect, useState } from 'react'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from 'react-simple-captcha'
import { AuthContext } from '../../providers/AuthProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import SocialLogin from '../../Components/SocialLogin/SocialLogin'




const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/';
  // console.log('user access location ', location.state);
  console.log('user access location: ', location.state?.from?.pathname ?? 'direct access');


  useEffect(() => {
    loadCaptchaEnginge(6)
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    console.log(email, password)
    signIn(email, password).then(result => {
      const user = result.user
      console.log(user)
      Swal.fire({
        title: 'User Login Succussfully!',
        icon: 'success',
        draggable: true
      })
      navigate(from, { replace: true })
    })
  }

  const handleValidateCapcha = e => {
    // const user_value = captchaRef.current.value
    const user_value = e.target.value
    if (validateCaptcha(user_value)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content flex-col md:flex-row-reverse'>
          <div className='text-center md:w-1/2 lg:text-left'>
            <h1 className='text-5xl font-bold'>Login now!</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className='card bg-base-100 md:w-1/2 max-w-sm shadow-2xl'>

            <form onSubmit={handleLogin} className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='email'
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
                  name='password'
                  placeholder='password'
                  className='input input-bordered'
                  required
                />
                <label className='label'>
                  <a href='#' className='label-text-alt link link-hover'>
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <LoadCanvasTemplate />
                </label>
                <input
                  type='text'
                  name='captcha'
                  onBlur={handleValidateCapcha}
                  placeholder='type described text'
                  className='input input-bordered'
                  required
                />
              </div>

              <div className='form-control mt-4'>
                <input
                  // disabled={disabled}
                  disabled={false}
                  className='btn btn-primary'
                  type='submit'
                  value='Login'
                />
              </div>
            </form>
            
            <div className='card-body'>
              <p className='px-4'>
                Already have an account{' '}
                <Link className='text-blue-700 font-bold' to='/signup'>
                  Create an account
                </Link>{' '}
                
              </p>
              <SocialLogin />
            </div>


          </div>
        </div>
        
      </div>
    </>
  )
}

export default Login
