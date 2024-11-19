import { NavLink } from "react-router-dom";

interface service {
    title: string;
    image: string;
    description: string;
}

const Services: React.FC = () => {
    const ourservices: service[] = [
        {
          title: 'Power BI Solutions',
          image: 'https://i.pinimg.com/474x/2e/83/25/2e8325b0792c911f6b0cf071c7e4bb4b.jpg',
          description: 'Explore powerful data visualization techniques with Power BI, helping you transform raw data into insightful dashboards and reports.'
        },
        {
          title: 'Cloud Solutions',
          image: 'https://i.pinimg.com/474x/c1/e5/41/c1e541c22228f62c3b30d4e1af3ebc4b.jpg',
          description: 'Leverage cloud platforms like AWS and Azure to scale your business, providing secure, scalable, and efficient cloud solutions for various needs.'
        },
        {
          title: 'Data Analytics Services',
          image: 'https://i.pinimg.com/474x/b4/4d/12/b44d1231c5b7d6860177821152785152.jpg',
          description: 'Explore the world of data analysis, learning how to collect, organize, and interpret data to uncover valuable insights that drive informed decision-making.'
        },
        // {
        //   title: 'Learning Resources',
        //   image: 'https://i.pinimg.com/474x/cf/66/33/cf66334166ddd4c120148dc07c492449.jpg',
        //   description: 'Access curated learning materials, tutorials, and guides that help you upskill in cloud computing, data analytics, and other modern technologies.'
        // }
      ];
      

  return (
  <>
    <h1 className="text-2xl flex text-white justify-center mt-10 font-bold mb-4">What we offer</h1>
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-[70px]">
      {ourservices.map((event, index) => (
        <div
          key={index}
          className="bg-base-900 text-black shadow-md rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <h2 className="text-xl font-bold text-white">{event.title}</h2>
            <img src={event.image} alt={event.title} className="w-full h-44 object-cover mt-4" />
            <p className=" mt-2">{event.description}</p>
            <div className="flex justify-center items-center">
  <button className="btn btn-primary bg-[#0003FF]">
  <NavLink to="/contact-us">Book Now!</NavLink>
  </button>
</div>
</div>
</div>
))}
    </div>
    </>
  )
}

export default Services