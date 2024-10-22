// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // Sample initial blog data
// const initialBlogData = [
//   {
//     blog_id: '1',
//     blog_name: 'Hosting Static Web Apps on AWS',
//     blog_description: 'Master static web app deployment on AWS, explore S3, CloudFront, and Route 53 for seamless hosting.',
//     blog_image: 'https://i.pinimg.com/474x/60/44/71/604471ed304322decb60d7c52b4632a3.jpg',
//     blog_link: '/blogs/aws-static-web-app',
// },
// {
//     blog_id: '2',
//     blog_name: 'Azure Static Web Apps Overview',
//     blog_description: 'Learn how to host your static web apps on Microsoft Azure, using its scalable and cost-effective services.',
//     blog_image: 'https://i.pinimg.com/474x/46/c6/8b/46c68b81433a5e40c0942b1b06059928.jpg',
//     blog_link: '/blogs/azure-static-web-app',
// },
// {
//     blog_id: '3',
//     blog_name: 'Serverless Computing on Azure and AWS',
//     blog_description: 'Dive into serverless architecture and discover how AWS Lambda and Azure Functions can transform your app development.',
//     blog_image: 'https://i.pinimg.com/474x/5e/eb/c0/5eebc09ee8dd8259d2b8101f0d34c34c.jpg',
//     blog_link: '/blogs/serverless-azure-aws',
// },
// ];

// // Component to display the blogs
// const MyBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState(initialBlogData);
//   const [newBlog, setNewBlog] = useState({
//     blog_name: '',
//     blog_description: '',
//     blog_image: '',
//     blog_link: '',
//   });
//   const navigate = useNavigate();

//   // Redirect to the "Create Blog" page
//   const handleCreateBlog = () => {
//     navigate('/create-blog');
//   };
//   // Handler for form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewBlog({ ...newBlog, [name]: value });
//   };

//   // Handler for form submission
//   const handleAddBlog = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Generate a new ID for the blog
//     const newBlogId = (blogs.length + 1).toString();

//     // Add the new blog to the list of blogs
//     const updatedBlogs = [
//       ...blogs,
//       {
//         ...newBlog,
//         blog_id: newBlogId,
//       },
//     ];

//     setBlogs(updatedBlogs);

//     // Clear the form after submission
//     setNewBlog({
//       blog_name: '',
//       blog_description: '',
//       blog_image: '',
//       blog_link: '',
//     });
//   };

//   return (
//     <div className="container max-w-7xl mx-auto py-6 px-4 lg:px-0">
//       <h1 className="text-3xl font-bold flex justify-center text-white mb-6 px-4">My Blogs</h1>
//       <button
//           onClick={handleCreateBlog}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create New Blog
//         </button>

      
//       {blogs.length === 0 ? (
//         <p className="text-lg text-gray-200">No blogs available at the moment. Check back later!</p>
//       ) : (
//         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-4">
//           {blogs.map((blog) => (
//             <li key={blog.blog_id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full">
//               {blog.blog_image && (
//                 <img
//                   src={blog.blog_image}
//                   alt="Blog banner"
//                   className="w-full h-40 object-cover rounded-lg mb-4"
//                 />
//               )}
//               <h2 className="text-2xl font-semibold text-white mb-2">
//                 {blog.blog_name}
//               </h2>
//               <p className="text-white mb-2"><strong>About: </strong>{blog.blog_description}</p>
//               <div className="card-container flex justify-center items-center">
//                 <p className="mb-2 flex justify-center">
//                   <a href={blog.blog_link} className="bg-drawer px-4 p-2 text-black w-[80px] rounded hover:bg-blue-500">
//                     <button
//                     className="bg-green-500 p-2 text-white w-[100px] rounded hover:text-blue-700 font-medium"
//                     >Read</button>
//                   </a>
//                 </p>
//               </div>
//               <div className="flex justify-between mt-6 space-x-4">
//               <button
//                 // onClick={() => handleEditClick(resource)}
//                 className="bg-blue-500 p-2 text-white w-[100px] rounded hover:text-blue-700 font-medium"
//               >
//                 Edit
//               </button>
//               <button
//                 // onClick={() => handleDeleteClick(resource)}
//                 className="bg-red-500 p-2 text-white w-[100px] rounded hover:text-red-700 font-medium"
//               >
//                 Delete
//               </button>
//             </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyBlogs;


import React from 'react';
import { useGetBlogsQuery } from '../../../../features/blogs/blogsAPI';
import { SyncLoader } from 'react-spinners';

const Blogs: React.FC = () => {
  // Fetch all blogs using the useGetBlogsQuery hook
  const { data: blogs, isLoading, error } = useGetBlogsQuery();

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <SyncLoader color={"#37B7C3"} size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg text-red-500">Error loading Blogs: {error.toString()}</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 lg:px-0">
      <h1 className="text-3xl font-bold flex justify-center text-white mb-6 px-4">My Blogs</h1>

      {blogs?.length === 0 ? (
        <p className="text-lg text-gray-200">
          No learning resources available. See all resources{' '}
          <a href="/resources" className="text-blue-500">here</a>.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-4">
          {blogs?.map((blog) => (
            <li key={blog.blog_id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full">
              {blog.blog_image && (
                <img
                  src={blog.blog_image}
                  alt="Resource banner"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold text-white mb-2">
                {blog.blog_name}
              </h2>
              <p className="text-white mb-2">
                {/* <strong>About: </strong> */}
                {blog.blog_description}</p>
            
              <div className="card-container flex justify-center items-center">
                <p className="mb-2 flex justify-center">
                  <a href={blog.blog_link} target="_blank" className="bg-drawer px-4 p-2 text-black w-[80px] rounded ">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" >Read</button>
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
