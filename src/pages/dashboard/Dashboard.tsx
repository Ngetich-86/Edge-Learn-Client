import Container from '../../components/Container'
import Card from './Card'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Drawer from './aside/Drawer'

function Dashboard() {
  return (
    <>
      <Navbar />
      <Container className='flex max-h-fit min-h-screen bg-base-400 text-neutral-200' >
        <div className='min-w-fit bg-base-200 hidden md:block'>
          <Drawer />
        </div>
        <div className='flex flex-col min-w-[80%] '>
          <Card className='h-fit'>
            <Outlet />
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Dashboard