import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Navbar = () => {

    const { user, logOut } = useAuth()


    const signOut = () => {
        logOut()
    }


    const navbarOptions = <>

        {/* Public route  */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Service</Link></li>
    </>


    return (
        <div>
            <div className="navbar z-10 bg-orange-600 text-white font-bold text-2xl max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="z-10 menu menu-compact dropdown-content mt-3 p-2 text-white bg-orange-600 shadow rounded-box w-52">
                            {navbarOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Health <span>Care</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navbarOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-orange-600 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            {user ? <>
                                <li><Link to='dashboard/userProfile'>Profile</Link></li>
                                <li><Link onClick={signOut}>Logout</Link></li>
                            </> : <>
                                <li><Link to='signup'>Sign Up</Link></li>
                                <li><Link to='/login'>Login</Link></li>
                            </>
                            }

                        </ul>

                    </div>

                    {
                        user && <Link to='/dashboard/userProfile' className="btn bg-orange-600 ml-2 text-white">Go to Dashboard</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;