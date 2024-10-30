// import { Users, SquareUserRound, Menu, LogOut, Settings, Book } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom"
// import { store } from "../../../app/store"
// // import { UseDispatch } from "react-redux"
// import { useState } from "react"
// import { useSelector } from "react-redux"
// import { RootState } from "../../../app/store"
// import { useEffect } from "react"

// function SideNav() {
//     const navigate = useNavigate()
//     const [isOpen, setIsOpen] = useState(false);
//     const user = useSelector((state: RootState) => state.user);
//     const role = user.user?.role ?? 'user';
//     console.log(role);
  

//     const toggleDrawer = () => {
//         setIsOpen(!isOpen);
//       };

    
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 124) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//     const handleLogOut = () => {
//         //clear the local storage & reset the state
//         store.dispatch({ type: 'persist/PURGE', result: () => null, key: 'user-auth' })
//         store.getState().user.token = null
//         navigate('/login')
//     }


//     return (
//         <ul className="menu bg-base-200 min-w-fit gap-1 text-base-content min-h-full text-white-400 font-semibold  ">
//             <li>
//                 <details open >
//                     <summary ><Menu />Dashboard</summary>
//                     <ul className="flex flex-col">
//                         <li> <Link to="analytics">Analytics</Link></li>
//                     </ul>
//                 </details>
//             </li>
//             <li>
//                 <details >
//                     <summary><Book />Resources </summary>
//                     <ul>
//                         <li><Link to="blogs">Blogs</Link></li>
//                         <li><Link to="create-blog">Add blog</Link></li>
//                         <li><Link to="manage-blogs">Manage Blogs</Link></li>
//                     </ul>
//                 </details>
//             </li>
//             <li>
//                 <Link to="profile"><SquareUserRound />Profile</Link>
//             </li>
//             <li>
//                 <Link to="community"><Users />Community</Link>
//             </li>
//             <li>
//                 <Link to="members"><Users />Members</Link>
//             </li>
//             <li>
//                 <Link to="/home">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
//                     Home
//                 </Link>
//             </li>
//             <li>
//                 <Link to="settings"><Settings />settings</Link>
//             </li>
//             <li>
//                 <Link to="#" onClick={handleLogOut}><LogOut />Logout</Link>
//             </li>
//         </ul>
//     )
// }

// export default SideNav

//  working..================================================================================================================
// import { Users, SquareUserRound, Menu, LogOut, Settings, Book } from "lucide-react";
// import { ChevronsRight, ChevronsLeft, ChevronDown, ChevronUp } from 'lucide-react';
// import { Link, useNavigate } from "react-router-dom";
// import { store } from "../../../app/store";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// import { GrServicePlay } from "react-icons/gr";

// function SideNav() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);

  
//   const user = useSelector((state: RootState) => state.user);
//   const role = user?.user?.user_type?? 'user'; // default to 'user' if no role is defined
//   // console.log(`Role: ${role}`);

//   // Function to check if a user can view a specific menu item
//   const canViewItem = (item: string, isAdminOnly: boolean = false, isSuperAdminOnly: boolean = false) => {
//     if (role === 'super_admin') {
//       return true; // Super Admin can view all items
//     } else if (role === 'admin') {
//       return !isSuperAdminOnly; // Admin can view everything except super_admin-only items
//     } else if (role === 'user') {
//       return !isAdminOnly && !isSuperAdminOnly; // Regular users can't see admin or super_admin items
//     }
//     return false; // If role doesn't match, default to hiding the item
//   };

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true); // Reset to true on larger screens
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleLogOut = () => {
//     // Clear local storage & reset the state
//     store.dispatch({ type: 'persist/PURGE', result: () => null, key: 'user-auth' });
//     store.getState().user.token = null;
//     navigate('/login');
//   };

//   return (
//     <ul className="menu bg-base-200 min-w-fit gap-1 text-base-content min-h-full text-white-400 font-semibold">
//       <button
//         className={`fixed left-0 top-0 z-50 p-3 ${isOpen ? '' : ''}`}
//         type="button"
//         onClick={toggleDrawer}
//       >
//         {isOpen ? (
//           <ChevronsLeft className="dark:text-white text-webcolor block lg:hidden" size={45} />
//         ) : (
//           <ChevronsRight className="text-webcolor block lg:hidden" size={45} />
//         )}
//       </button>
//       {/* Dashboard (visible to all roles) */}
//       <li>
//         <details open>
//           <summary onClick={toggleDrawer}><Menu />Dashboard</summary>
//           <ul className="flex flex-col">
//           {canViewItem('Resources', true) && (
//             <li><Link to="home">Analytics</Link></li>
//           )}
//           </ul>
//         </details>
//       </li>

//       {/* Resources (restricted to admin and super_admin) */}
      
//         <li>
//           <details>
//             <summary><Book />Resources</summary>
//             <ul>
//               <li><Link to="blogs">Blogs</Link></li>
//               {canViewItem('Resources', true) && (
//                 <li><Link to="create-blog">Add Blog</Link></li>
//                 // <li><Link to="manage-blogs">Manage Blogs</Link></li>
//               )}
//               {canViewItem('Resources', true) && (
//                 <li><Link to="manage-blogs">Manage Blogs</Link></li>
//               )}

              
//             </ul>
//           </details>
//         </li>

//       {/* Profile (visible to all roles) */}
//       <li>
//         <Link to="profile"><SquareUserRound />Profile</Link>
//       </li>

//       {/* Community (visible to all roles) */}
//       <li>
//         <Link to="community"><Users />Community</Link>
//       </li>

//       {/* Members (restricted to admin and super_admin) */}
//       {canViewItem('Members', true) && (
//         <li>
//           <Link to="members"><Users />Members</Link>
//         </li>
//       )}

//       {/* Home (visible to all roles) */}
//       <li>
//         <Link to="/home">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
//           Home
//         </Link>
//       </li>
//        <li><Link to="services"><GrServicePlay size={25}/> Services</Link></li>

//       {/* Settings (visible to all roles) */}
//       <li>
//         <Link to="settings"><Settings />Settings</Link>
//       </li>

//       {/* Logout (visible to all roles) */}
//       <li>
//         <Link to="#" onClick={handleLogOut}><LogOut />Logout</Link>
//       </li>
//     </ul>
//   );
// }

// export default SideNav;


//================================================test code
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
  // const [isOpen, setIsOpen] = useState(true); // By default, side nav is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const role = user?.user?.user_type ?? ''; // Default to 'user' if no role is defined

  // Function to toggle side navigation drawer
  // const toggleDrawer = () => {
  //   setIsOpen(!isOpen);
  // };
  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
};

  // Handle responsive behavior
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1024 ) {
  //       setIsOpen(false); // Close side nav on small screens
  //     } else {
  //       setIsOpen(true); // Open side nav on larger screens
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
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
      {/* <button
        // className={`fixed top-0 left-0 z-50 p-3`}
        className="fixed top-2 left-2 z-50 p-2 bg-gray-200 rounded-full"
        onClick={toggleDrawer}
      >
        {isOpen ? (
          <ChevronsLeft className="text-webcolor block lg:hidden" size={45} />
        ) : (
          <ChevronsRight className="text-webcolor block lg:hidden" size={45} />
        )}
      </button> */}
      
      

      {/* Side Navigation */}
      <ul className={`fixed top-0 left-0 w-[60%] h-screen bg-gray-800 border-r border-gray-900 transform ${isDropdownOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out lg:hidden z-50`}>
      {/* <ul className={`menu bg-base-200 min-h-full text-base-content transition-all duration-300 ${isDropdownOpen} ? 'w-54' : 'w-1'} overflow-hidden`}> */}
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
        <li>
          <Link to="profile"><SquareUserRound />Profile</Link>
        </li>

        {/* Community (visible to all roles) */}
        <li>
          <Link to="community"><Users />Community</Link>
        </li>

        {/* Members (restricted to admin and super_admin) */}
        {canViewItem(true) && (
          <li>
            <Link to="members"><Users />Members</Link>
          </li>
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

        {/* Settings */}
        <li>
          <Link to="settings"><Settings />Settings</Link>
        </li>

        {/* Logout */}
        <li>
          <Link to="#" onClick={handleLogOut}><LogOut />Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;

//test 200==============================================
