
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';


const SocialLogin = () => {

 const {googleSignIn} = useAuth();

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then((res) => {
        console.log(res.user)
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
