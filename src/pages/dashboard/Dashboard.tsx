// import Container from '../../components/Container'
// import Card from './Card'
// import { Outlet ,useNavigate} from 'react-router-dom'
// import Footer from '../../components/Footer'
// import Navbar from '../../components/Navbar'
// import Drawer from './aside/Drawer'
// import { useSelector } from 'react-redux';
// import { RootState } from "../../app/store";
// import { useEffect } from 'react';

// function Dashboard() {
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     if (!user || !user.user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   return (
//     <>
//       <Navbar />
//       <Container className='flex max-h-fit min-h-screen bg-base-400 text-neutral-200' >
//         <div className='min-w-fit bg-base-200 hidden md:block'>
//           <Drawer />
//         </div>
//         <div className='flex flex-col min-w-[80%] '>
//           <Card className='h-fit flex-1 overflow-y-auto'>
//             <Outlet />
//           </Card>
//         </div>
//       </Container>
//       <Footer />
//     </>
//   )
// }

// export default Dashboard

//test code
// import Container from '../../components/Container'
import Card from './Card'
import { Outlet ,useNavigate} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Drawer from './aside/Drawer'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
    <div className="flex flex-col">
      <Navbar />

      <div className="flex lg:flex-row  mt-2 overflow-hidden  text-neutral-200">
        <aside className="lg:flex flex-col flex-shrink-0 w-1 lg:w-44 bg-base-900  ">
          <Drawer />
        </aside>
        <div className='flex flex-col min-w-[80%]'>
        <Card className='flex-1 overflow-y-auto'>
          <Outlet />
          </Card>
          </div>
      </div>
    </div>
    </>
    
  )
}
export default Dashboard
