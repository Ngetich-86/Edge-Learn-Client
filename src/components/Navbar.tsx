
// import { Link } from 'react-router-dom'
// import { RootState } from '../../src/app/store';
// import { useSelector } from 'react-redux';
// import { Menu } from 'lucide-react';
// import logo from "../assets/images/Designer-removebg-preview.png"

// const Navbar = () => {
//   // const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.user);
//   const username = user.user?.first_name;
//   return (
//     <div className="navbar bg-base-100">
//   <div className="flex-1 gap-4 ml-6 md:ml-12">
//                 <img src={logo} alt="logo" className=" hidden md:block w-12 h-12" />
//                 <a className="hidden md:block md:text-2xl font-bold text-gray-500">PrismCloudata</a>
//             </div>
  
//   <div className="flex-none gap-2">
//   <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1 text-base text-links">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/dashboard_page/blogs">Dashboard</Link></li>
//                     {/* <li><Link to="/about-us">About</Link></li> */}
//                     <li><Link to="/contact-us">Contact</Link></li>
//                     {!username && (
//                       <>
//                       <li><Link to="/register">Register</Link></li>
//                       <li><Link to="/login">Login</Link></li>
//                       </>
//                     )}
//                         </ul>
//                         </div>
//   </div>

//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           {/* <img
//             alt="Tailwind CSS Navbar component"
//             src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
//             <Menu />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//         <li>
//           <a className="justify-between">
//             Profile
//             {/* <span className="badge">New</span> */}
//           </a>
//         </li>
//         <li><Link to="/">🏠Home</Link></li>
//         <li><Link to="/dashboard_page/profile">Dashboard</Link></li>
//         <li><Link to="/contact-us">Contact Us</Link></li>
//         <li><a>Logout</a></li>
//       </ul>
//     </div>
//   </div>


//   )
// }

// export default Navbar

//test=====================================

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";
import logo from "../assets/images/PrismCloudata-logo.png";
import { logOut } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import ThemeToggle from "../pages/dashboard/pages/Settings";

const Navbar = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const user = useSelector((state: RootState) => state.user);
    const username = user.user?.first_name;
    const image_url = user.user?.image_url;

    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsDropdownOpen(false);
            }
        };

        const closeMenu = () => {
            if (isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', closeMenu);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', closeMenu);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    }

    return (
        <div className="navbar h-fit shadow-120 text-xl rounded bg-gray-800">
            <div className="flex-1 gap-4 ml-6 md:ml-12">
                <img src={logo} alt="logo" className=" hidden md:block w-29 h-12" />
                {/* <h1 className="hidden md:block md:text-2xl font-bold text-links">PrismCloudata</h1> */}
            </div>

            <div className="flex-none gap-2">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white text-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard_page/blogs"> Dashboard</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>

                        {!username && (
                            <>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <ThemeToggle />


                <div className="flex lg:hidden">
                    <button onClick={toggleDropdown} className="btn btn-circle">
                        <svg
                            className={`swap-off fill-current ${isDropdownOpen ? 'hidden' : 'block'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>
                        <svg
                            className={`swap-on fill-current ${isDropdownOpen ? 'block' : 'hidden'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <polygon
                                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                    </button>
                </div>

                <div className={`fixed top-0 left-0 w-[50%] h-screen bg-gray-800 border-r border-gray-900 transform ${isDropdownOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out lg:hidden z-50`}>
                    <ul className="menu p-4 text-cards">
                        <li className="border-b border-gray-300 py-2 text-blue-500"><Link to="/">Home</Link></li>
                        <li className="border-b border-gray-300 py-2 text-blue-500"><Link to="/dashboard_page/blogs">Dashboard</Link></li>
                        <li className="border-b border-gray-300 py-2 text-blue-500"><Link to="/contact-us">Contact Us</Link></li>
                        {!username && (
                            <>
                                <li className="border-b border-gray-300 py-2 text-text-light"><Link to="/register">Register</Link></li>
                                <li className="border-b border-gray-300 py-2 text-text-light"><Link to="/login">Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {username && (
                    <div className="dropdown dropdown-end  z-[1]">
                        <div tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={image_url ? image_url : 'https://ui-avatars.com/api/?name=' + username} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 pt-4 shadow">
                            <li>
                                <Link to="/dashboard_page/profile" className="justify-between pb-2 cursor-pointer">Profile</Link>
                            </li>
                            <li><a onClick={handleLogout} className="pt-2 cursor-pointer">Logout</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
