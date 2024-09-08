import { Link } from "react-router-dom";


const Navbar = () => {


    const navbarOptions = <>

        {/* Public route  */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Server</Link></li>
        <li><Link to="/Booking">Booking</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to="/signIn">SignIn</Link></li>
    </>


    return (
        <div>
            <div className="navbar z-10 bg-orange-700 text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navbarOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Healthcare</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navbarOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn bg-orange-600 text-white">Go to dashboard</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;