import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({children}) => {
    const {user,loading} = useContext(authContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading){
        return <span className="loading loading-spinner loading-lg "></span>
    }

    if(user && isAdmin){
        return children;
    }
    // todo: don't go to home page
    return <Navigate to='/' state={{from:location}} replace></Navigate> ;
};
export default AdminRoute;