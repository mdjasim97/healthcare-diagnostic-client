import { NavLink, Outlet } from "react-router-dom";
import { FaRegImage, FaHome, FaListAlt, FaShoppingCart, FaUpload, FaUser, FaUtensils } from 'react-icons/fa'
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { RiHealthBookFill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import { GiTestTubes } from "react-icons/gi";
import { SiStatista } from "react-icons/si";
import { FaBookBookmark } from "react-icons/fa6";
import { MdUpcoming } from "react-icons/md";


const DashboardLayout = () => {

    const { user } = useAuth()
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
                                <li><NavLink to="/dashboard/addTest"> <RiHealthBookFill /> Add New Test </NavLink></li>
                                <li><NavLink to="/dashboard/addBannar"> <BiSolidImageAdd /> Add Bannar </NavLink></li>
                                <li><NavLink to='/dashboard/allBannar'> <IoIosImages /> All Bannar </NavLink></li>
                                <li><NavLink to="/dashboard/allTest"> <GiTestTubes /> All Test </NavLink></li>
                                <li><NavLink to="/dashboard/statistic"> <SiStatista /> Statistic </NavLink></li>
                                <li><NavLink to="/dashboard/reservation"> <FaBookBookmark /> Reservation </NavLink></li>
                            </> :
                            <>
                                <li><NavLink to="/dashboard/userProfile"> <FaUser />My Profile </NavLink></li>
                                <li><NavLink to={`/dashboard/appoinment`}> <MdUpcoming />My Upcomming Appoinment</NavLink></li>
                                <li><NavLink to="/dashboard/testResult"> <FaListAlt /> Test Result</NavLink></li>
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