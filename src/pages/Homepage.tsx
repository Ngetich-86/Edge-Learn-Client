
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';
import Join from '../components/Join';
import Community from './dashboard/pages/Community';
import Featured from '../components/home/Featured';

const Homepage = () => {
  return (
    <>
    <div className=''>
    <Navbar />
    <Hero />
    <Featured />
    <Services />
    <Join />
    <Community />
    <Footer />
    </div>
    </>
  )
}

export default Homepage