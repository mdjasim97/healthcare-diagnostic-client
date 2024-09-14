import { useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <div className='min-h-screen flex flex-col justify-center items-center'>
            <progress className="progress w-56"></progress>
        </div>
    }

    if (user && isAdmin || owner ) {
        return children
    }
    return <Navigate to="/login" state={{from:location} } replace></Navigate>

};

export default AdminRoute;