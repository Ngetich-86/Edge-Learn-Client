import BannerImage from "../../assets/images/banner_img_2.png";

// import ScrollReveal from "scrollreveal";

const Join = () => {
  // useEffect(() => {
  //   const sr = ScrollReveal();

  //   // Reveal the typing text from the left
  //   sr.reveal(".banner-title", {
  //     origin: "left",
  //     distance: "250px",
  //     duration: 1000,
  //     easing: "ease-in-out",
  //     opacity: 0,
  //     scale: 0.9,
  //     reset: true,
  //   });

  //   // Reveal the h3 from the bottom
  //   sr.reveal(".animate-banner-description", {
  //     origin: "bottom",
  //     distance: "150px",
  //     duration: 1000,
  //     easing: "ease-in-out",
  //     opacity: 0,
  //     scale: 0.9,
  //     reset: true,
  //   });

  //   // Reveal the description from the bottom
  //   sr.reveal(".banner-title-2", {
  //     origin: "bottom",
  //     distance: "250px",
  //     duration: 1000,
  //     easing: "ease-in-out",
  //     opacity: 0,
  //     scale: 0.9,
  //     reset: true,
  //   });

  //   sr.reveal(".banner-image", {
  //     origin: "right",
  //     distance: "150px",
  //     duration: 1000,
  //     easing: "ease-in-out",
  //     opacity: 0,
  //     scale: 0.9,
  //     reset: true,
  //   });
  // }, []);
  return (
    <section className="min-h-[30vh] h-full w-full flex items-center justify-center  banner-gradient-background max-xl:px-4 py-12">
      <div className="w-full max-w-[1400px] flex items-start justify-between max-lg:flex-col pt-12">
        <div className="flex-1">
          <div className="capitalize font-medium">
            <h2 className="text-3xl banner-title">Empowering Innovation with </h2>
            <h2 className="text-4xl banner-title-2">
            Web, Cloud, and Data Solutions
            </h2>
          </div>
          <div className="py-3 text-lg animate-banner-description">
            <p>
            Welcome to PrismCloudata, where we empower you to explore the transformative power of web, cloud, and data solutions. Join us in a collaborative space where you’ll 
            connect with fellow enthusiasts, tackle exciting challenges, and develop essential skills for today’s digital landscape.
            </p>
            <p className="my-4">
            Collaboration fuels innovation. By working alongside like-minded individuals, you’ll gain fresh insights, enhance your problem-solving abilities, and forge valuable connections in the 
            tech community. Together, we can discover innovative solutions that drive success in the world of data and cloud technologies.
            </p>
            <p>
            Don’t miss out on this enriching experience. Whether you’re looking to upskill, share your knowledge, or simply enjoy the journey, EdgeData provides the perfect environment for everyone to thrive and achieve their goals
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <img
            src={BannerImage}
            className="w-[400px] banner-image"
            alt="Collaboration at Hack Night"
          />
        </div>
      </div>
    </section>
  )
}

export default Join