
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';


const SocialLogin = () => {

 const {googleSignIn} = useAuth();
 const axiosPublic = useAxiosPublic()
 const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then((res) => {
        console.log(res.user);
        const userInfo = {
            email: res.user?.email,
            name: res.user?.displayName,
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
            console.log(res.data);
            navigate('/');
        })
    }).catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
    })
  };

  return (
    <div className="p-4">
      <div className="divider">or continue with</div>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
        <FaGoogle className="mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
