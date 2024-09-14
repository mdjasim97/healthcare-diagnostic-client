import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from './../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    if (loading) {
        return <div className='min-h-screen flex flex-col justify-center items-center'>
            <progress className="progress w-56"></progress>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>
}

export default PrivateRoute