// import { useEffect } from "react";
import FeaturedImage from "../../assets/images/banner_img.png";
import { BiBulb } from "react-icons/bi";
import { FaLaptopCode, FaRegHandshake } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";
import { VscDebugDisconnect } from "react-icons/vsc";
// import ScrollReveal from 'scrollreveal';

const Featured = () => {
    const features = [
        {
            icon: <FaLaptopCode size={24} />,
            title: "Power BI Solutions",
            description:
              "Leverage data-driven insights with our expert Power BI solutions to make better business decisions.",
          },
          {
            icon: <VscDebugDisconnect size={24} />,
            title: "Cloud Solutions",
            description:
              "Unlock the full potential of cloud technology with scalable and secure cloud solutions tailored to your needs.",
          },
          {
            icon: <IoCodeSlash size={24} />,
            title: "Learning Resources",
            description:
              "Access top-notch learning resources to enhance your skills in technology, cloud, and data analytics.",
          },
          {
            icon: <FaRegHandshake size={24} />,
            title: "Data Analytics Services",
            description:
              "Turn your data into actionable insights with our comprehensive data analytics services.",
          },
          
    ]
    // useEffect(() => {
    //     const sr = ScrollReveal();
    
       
    
    //     // Reveal the h3 from the bottom
    //     sr.reveal('.animate-title', {
    //       origin: 'right',
    //       distance: '150px',
    //       duration: 1000,
    //       easing: 'ease-in-out',
    //       opacity: 0,
    //       scale: 0.9,
    //       reset:true
    //     });
    
       
    //     sr.reveal('.animate-title-2', {
    //       origin: 'left',
    //       distance: '250px',
    //       duration: 1000,
    //       delay:300,
    //       easing: 'ease-in-out',
    //       opacity: 0,
    //       scale: 0.9,
    //       reset:true
    //     });
    
    //     sr.reveal('.animate-image-features', {
    //       origin: 'left',
    //       distance: '150px',
    //       duration: 1000,
    //       easing: 'ease-in-out',
    //       opacity: 0,
    //       scale: 0.9,
    //       reset:true
    //     });
    
    //     sr.reveal('.info-card', {
    //       origin: 'top',
    //       distance: '150px',
    //       duration: 1000,
    //       easing: 'ease-in-out',
    //       opacity: 0,
    //       scale: 0.7,
    //       reset:true
    //     });
    //     sr.reveal('.animate-feature-card', {
    //       origin: 'top',
    //       distance: '150px',
    //       duration: 1000,
    //       delay:100,
    //       easing: 'ease-in-out',
    //       opacity: 0,
    //       scale: 0.7,
    //       reset:true
    //     });
    //   }, []);
    
  return (
    <div className="h-fill min-h-[70vh] flex justify-center">
      <div className="max-w-[1400px] flex items-start justify-between max-xl:flex-col max-xl:px-8 w-full h-full pt-12">
        <div className="flex-1 h-full w-full max-xl:flex justify-center items-center animate-image-features">
          <img src={FeaturedImage} alt="Featured Banner" />
        </div>
        <div className="flex-1 h-full w-full">
          <h2 className="font-medium text-4xl animate-title">Tackling Modern</h2>
          <h3 className="text-gradient font-medium text-2xl animate-title-2">
             Web, Cloud and Data
          </h3>

          <div className="flex items-center h-fit lg:h-36 w-full bg-zinc-100 mt-4 rounded-md relative overflow-hidden info-card">
            <div className="w-1 bg-[#2409CF] absolute left-0 top-0 h-full"></div>
            <div className="flex-1 h-full p-3 ">
              <div className="flex items-center gap-x-3">
                <div className="h-8 aspect-square rounded-full flex items-center justify-center bg-gradient-to-tr text-white from-[#2409CF] to-[#F52727]">
                  <BiBulb size={24} />
                </div>
                <h6 className="font-medium text-xl text-slate-700">
                Elevate Your Expertise with Our Blogs
                </h6>
              </div>
              <p className="text-sm my-2">
              Explore our curated blogs and stay updated with the latest trends in web development, cloud computing, and data analytics. Whether you're looking to sharpen 
              your skills or dive deep into new topics, our blogs provide insightful resources to help you grow. Join our community and take the next step in your learning journey today.
              </p>
            </div>
          </div>

          <div className="grid  sm:grid-cols-2 mt-2 gap-4 ">
            {features.map((feature, index) => (
              <div key={index} className="h-full w-full flex p-3 animate-feature-card">
                <div className="w-12 h-full">
                  <div className="h-8 aspect-square rounded-full flex items-center justify-center bg-gradient-to-tr text-white from-[#2409CF] to-[#F52727]">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium text-slate-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm font-normal text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured