
import { NavLink } from 'react-router-dom';
// import  { useEffect } from 'react';
// import ScrollReveal from "scrollreveal"
import TypingEffect from '../TypingEffect';
import HomeImage from "../../assets/images/section.png"



const Hero = () => {
  // useEffect(() => {
  //   const sr = ScrollReveal();

  //   // Reveal the typing text from the left
  //   sr.reveal('.typing-effect', {
  //     origin: 'left',
  //     distance: '250px',
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     opacity: 0,
  //     scale: 0.9,
  //     reset:true
  //   });
  //   // Reveal the h3 from the bottom
  //   sr.reveal('.hero-title', {
  //     origin: 'bottom',
  //     distance: '150px',
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     opacity: 0,
  //     scale: 0.9,
  //     reset:true
  //   });
  //   // Reveal the description from the bottom
  //   sr.reveal('.description', {
  //     origin: 'bottom',
  //     distance: '250px',
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     opacity: 0,
  //     scale: 0.9,
  //     reset:true
  //   });

  //   sr.reveal('.animate-image', {
  //     origin: 'right',
  //     distance: '100px',
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     opacity: 0,
  //     scale: 0.9,
  //     reset:true
  //   });
  //   //button animation
  //   sr.reveal('.button', {
  //     origin: 'right',
  //     distance: '150px',
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     opacity: 0,
  //     scale: 0.9,
  //     reset:true
  //   });

  // }, []);

  return (
    <section className="h-fit min-h-screen w-full gradient-background -mt-16 flex items-center justify-center max-xl:px-4 max-xl:pt-32 max-xl:pb-12">
      <div className="max-w-[1400px] w-full min-h-48 flex max-lg:flex-col gap-x-20">
        <div className="max-w-2xl flex-1">
          <div className="font-medium text-lg xs:text-3xl lg:text-3xl xl:text-3xl text-white typing-effect">
            <TypingEffect words={[`Hello👋Welcome to PrismCloudata, the Future of Innovation!`]} />
          </div>
          <h5 className="text-xl xs:text-2xl lg:text-3xl xl:text-3xl py-4 text-white hero-title">{` web + cloud + data`}</h5>
          <p className="font-light text-sm xl:text-lg text-white description">
          Unlock the power of the cloud, sharpen your skills with our top-tier data analytics services, 
        and explore insightful blogs that keep you updated on the latest trends in the industry. 
        PrismCloudata is your go-to platform for learning, collaborating, and growing. Whether you’re a 
        cloud enthusiast, a data geek, or just starting your journey, we have something for everyone. 
        Stay ahead, stay informed with our blogs, and be part of a community that's building tomorrow's solutions today.
          </p>
          <div className="flex justify-center items-center h-[20%]">
          <button className='btn btn-primary button bg-[#0000FF]'>
            <NavLink to="/dashboard_page"> Get started!</NavLink>
          </button>
          </div>
        </div>
        <div className="w-full h-full flex-1 flex justify-center lg:justify-end items-center max-lg:pt-12 animate-image">
          <img src={HomeImage} alt="home image" className="breathing-image " />
        </div>
      </div>
    </section>
  )
}

export default Hero