import { Link, NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaHome, FaListAlt, FaShoppingCart, FaUser } from 'react-icons/fa'
import useAuth from "../hooks/useAuth";


const DashboardLayout = () => {

    const { logOut, user } = useAuth()

    return (
        <div className='flex'>

            {/* Sidebar  */}
            <div className="bg-slate-300 min-h-screen w-64">
                <ul className="menu">
                    <li>
                        <NavLink to="/dashboard/userProfile"> <FaUser />My Profile </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/reservation"> <FaCalendar /> Reservation </NavLink>
                    </li>

                    <li>
                        <NavLink to={`/dashboard/users/${user?.email}`}> <FaShoppingCart />My Upcomming Appoinment</NavLink>
                    </li>


                    <li>
                        <NavLink to="/dashboard/testReult"> <FaListAlt /> Test Result</NavLink>
                    </li>
                </ul>
            </div>


            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default DashboardLayout;