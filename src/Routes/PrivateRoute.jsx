
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAdmin();

    const location = useLocation();
    

    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user){
       return children; 
    }
    return <Navigate to="/login" state={{from: location}} replace />
   
};

export default PrivateRoute;