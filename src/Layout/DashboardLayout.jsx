import { Link, NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaHome, FaListAlt, FaShoppingCart, FaUser, FaUtensils } from 'react-icons/fa'
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const DashboardLayout = () => {

    const { logOut, user } = useAuth()
    const [isAdmin] = useAdmin()

    return (
        <div className='flex'>
            {/* Sidebar  */}
            <div className="bg-orange-200 min-h-screen w-64">
                <ul className="menu">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/allUsers"> <FaUser /> All Users</NavLink></li>
                                <li><NavLink to="/dashboard/addTest"> <FaUtensils /> Add New Test </NavLink></li>
                                <li><NavLink to="/dashboard/addBannar"> <FaUtensils /> Update Bannar </NavLink></li>
                                <li><NavLink to="/dashboard/allTest"> <FaUtensils /> All Test </NavLink></li>
                                <li><NavLink to="/dashboard/reservation"> <FaUtensils /> Reservation </NavLink></li>

                            </> :
                            <>
                                <li><NavLink to="/dashboard/userProfile"> <FaUser />My Profile </NavLink></li>
                                <li><NavLink to="/dashboard/reservation"> <FaCalendar /> Reservation </NavLink></li>
                                <li><NavLink to={`/dashboard/users/${user?.email}`}> <FaShoppingCart />My Upcomming Appoinment</NavLink></li>
                                <li><NavLink to="/dashboard/testReult"> <FaListAlt /> Test Result</NavLink></li>
                            </>
                    }

                    <div className="divider"></div>

                    <li><NavLink to="/"> <FaHome /> Home </NavLink></li>
                </ul>
            </div>

            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default DashboardLayout;