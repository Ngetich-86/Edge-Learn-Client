


//================================================test code=========================
import { Users, SquareUserRound, Menu, LogOut, Settings, Book } from "lucide-react";
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../../app/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { GrServicePlay } from "react-icons/gr";

function SideNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // By default, side nav is open
  const user = useSelector((state: RootState) => state.user);
  const role = user?.user?.user_type ?? ''; // Default to 'user' if no role is defined

  // Function to toggle side navigation drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 ) {
        setIsOpen(true); // Close side nav on small screens
      } else {
        setIsOpen(true); // Open side nav on larger screens
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const canViewItem = ( isAdminOnly: boolean = false, isSuperAdminOnly: boolean = false) => {
    // console.log(item);
    if (role === 'super_admin') {
      return true; // Super Admin can view all items
    } else if (role === 'admin') {
      return !isSuperAdminOnly; // Admin can view everything except super_admin-only items
    } else if (role === 'user') {
      return !isAdminOnly && !isSuperAdminOnly; // Regular users can't see admin or super_admin items
    }
    return false;
  };

  const handleLogOut = () => {
    store.dispatch({ type: 'persist/PURGE', result: () => null, key: 'user-auth' });
    store.getState().user.token = null;
    navigate('/login');
  };

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        className={`fixed top-0 left-0 z-50 p-3 bg-gray-900 rounded-full`}
        onClick={toggleDrawer}
      >
        {isOpen ? (
          <ChevronsLeft className="text-webcolor block lg:hidden" size={45} />
        ) : (
          <ChevronsRight className="text-webcolor block lg:hidden" size={45} />
        )}
      </button>
      

      {/* Side Navigation */}
      <ul className={`menu bg-base-200 min-h-full text-base-content transition-all duration-300 ${isOpen ? 'w-54' : 'w-1'} overflow-hidden`}>
        <li>
          <details>
            <summary><Menu />Dashboard</summary>
            <ul className="flex flex-col">
              {canViewItem(true) && (
                <li><Link to="/">Analytics</Link></li>
              )}
            </ul>
          </details>
        </li>

        {/* Resources (restricted to admin and super_admin) */}
        <li>
          <details>
            <summary><Book />Resources</summary>
            <ul>
              <li><Link to="blogs">Blogs</Link></li>
              {canViewItem(true) && (
                <>
                  <li><Link to="create-blog">Add Blog</Link></li>
                  <li><Link to="manage-blogs">Manage Blogs</Link></li>
                </>
              )}
            </ul>
          </details>
        </li>

        {/* Profile (visible to all roles) */}
        <li><Link to="profile"><SquareUserRound />Profile</Link></li>
        <li><Link to="community"><Users />Community</Link></li>

        {/* Members (restricted to admin and super_admin) */}
        {canViewItem(true) && (
          <li><Link to="members"><Users />Members</Link></li>
        )}

        {/* Home */}
        <li>
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </Link>
        </li>

        <li><Link to="services"><GrServicePlay size={25}/> Services</Link></li>
        <li><Link to="settings"><Settings />Settings</Link></li>
        <li><Link to="#" onClick={handleLogOut}><LogOut />Logout</Link></li>
      </ul>
    </div>
    
  );
}

export default SideNav;

//test 200==============================================
// import { Users, SquareUserRound, Menu, LogOut, Settings, Book } from "lucide-react";
// import { ChevronsRight, ChevronsLeft } from 'lucide-react';
// import { Link, useNavigate } from "react-router-dom";
// import { store } from "../../../app/store";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// import { GrServicePlay } from "react-icons/gr";

// function SideNav() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true); // By default, side nav is open
//   const user = useSelector((state: RootState) => state.user);
//   const role = user?.user?.user_type ?? ''; // Default to 'user' if no role is defined

//   // Function to toggle side navigation drawer
//   const toggleDrawer = () => {
//     setIsOpen(prevState => !prevState); // Toggle the state
//   };

//   const canViewItem = (isAdminOnly: boolean = false, isSuperAdminOnly: boolean = false) => {
//     if (role === 'super_admin') {
//       return true; // Super Admin can view all items
//     } else if (role === 'admin') {
//       return !isSuperAdminOnly; // Admin can view everything except super_admin-only items
//     } else if (role === 'user') {
//       return !isAdminOnly && !isSuperAdminOnly; // Regular users can't see admin or super_admin items
//     }
//     return false;
//   };

//   const handleLogOut = () => {
//     store.dispatch({ type: 'persist/PURGE', result: () => null, key: 'user-auth' });
//     store.getState().user.token = null;
//     navigate('/login');
//   };

//   return (
//     <div className="flex">
//       {/* Toggle Button */}
//       <button
//         className={`fixed top-0 left-0 z-50 p-2 bg-base-100 `}
//         onClick={toggleDrawer}
//       >
//         {isOpen ? (
//           <ChevronsLeft className="text-webcolor block lg:hidden" size={45} />
//         ) : (
//           <ChevronsRight className="text-webcolor block lg:hidden" size={45} />
//         )}
//       </button>
      
//       {/* Side Navigation */}
//       <ul className={`menu bg-base-200 min-h-full text-base-content transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
//         <li>
//           <details>
//             <summary><Menu />Dashboard</summary>
//             <ul className="flex flex-col">
//               {canViewItem(true) && (
//                 <li><Link to="/">Analytics</Link></li>
//               )}
//             </ul>
//           </details>
//         </li>

//         {/* Resources (restricted to admin and super_admin) */}
//         <li>
//           <details>
//             <summary><Book />Resources</summary>
//             <ul>
//               <li><Link to="blogs">Blogs</Link></li>
//               {canViewItem(true) && (
//                 <>
//                   <li><Link to="create-blog">Add Blog</Link></li>
//                   <li><Link to="manage-blogs">Manage Blogs</Link></li>
//                 </>
//               )}
//             </ul>
//           </details>
//         </li>

//         {/* Profile (visible to all roles) */}
//         <li><Link to="profile"><SquareUserRound />Profile</Link></li>
//         <li><Link to="community"><Users />Community</Link></li>

//         {/* Members (restricted to admin and super_admin) */}
//         {canViewItem(true) && (
//           <li><Link to="members"><Users />Members</Link></li>
//         )}

//         {/* Home */}
//         <li>
//           <Link to="/">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house">
//               <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
//               <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//             </svg>
//             Home
//           </Link>
//         </li>

//         <li><Link to="services"><GrServicePlay size={25}/> Services</Link></li>
//         <li><Link to="settings"><Settings />Settings</Link></li>
//         <li><Link to="#" onClick={handleLogOut}><LogOut />Logout</Link></li>
//       </ul>
//     </div>
    
//   );
// }

// export default SideNav;