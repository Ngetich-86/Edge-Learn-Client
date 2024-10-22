
import { Link } from 'react-router-dom'
import { RootState } from '../../src/app/store';
import { useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import logo from "../assets/images/Designer-removebg-preview.png"

const Navbar = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const username = user.user?.first_name;
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1 gap-4 ml-6 md:ml-12">
                <img src={logo} alt="logo" className=" hidden md:block w-12 h-12" />
                <a className="hidden md:block md:text-2xl font-bold text-gray-500">PrismCloudata</a>
            </div>
  
  <div className="flex-none gap-2">
  <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-base text-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard_page/blogs">Dashboard</Link></li>
                    {/* <li><Link to="/about-us">About</Link></li> */}
                    <li><Link to="/contact-us">Contact</Link></li>
                    {!username && (
                      <>
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/login">Login</Link></li>
                      </>
                    )}
                    

                        </ul>
                        </div>

  </div>

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
            <Menu />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            {/* <span className="badge">New</span> */}
          </a>
        </li>
        <li><Link to="/">🏠Home</Link></li>
        <li><Link to="/dashboard_page/profile">Dashboard</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>


  )
}

export default Navbar