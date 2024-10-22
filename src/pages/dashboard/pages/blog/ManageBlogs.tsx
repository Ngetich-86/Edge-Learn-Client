import React, { useState } from 'react';
import { useGetBlogsQuery, Blog } from '../../../../features/blogs/blogsAPI';
import CreateBlogModal from './CreateBlog';
import EditBlogModal from './EditBlog';
import DeleteBlogModal from './DeleteBlog';
// import TagBadge from '../../../../components/TagBadge';
import { SyncLoader } from 'react-spinners';

const ManageBlogs:React.FC = () => {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const handleEditClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };
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
        <p className="text-lg text-red-500">Error loading blogs: {error.toString()}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 lg:px-0">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">Blogs</h1>
      {/* <CreateResourceButton onOpenModal={openCreateModal} /> */}
    </div>

    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-4">
      {blogs?.map((blog: Blog) => (
        <li key={blog.blog_id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <img
            src={blog.blog_image}
            alt="Resource banner"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold text-white mb-4">{blog.blog_name}</h2>
          <p className="text-white mb-2 flex items-center justify-between"><strong>About:</strong>{blog.blog_description}</p>
            <strong>Link: </strong>{' '}
          <div className="flex flex-col items-center justify-evenly">
            <div className="flex flex-wrap mt-2">
              <a href={blog.blog_link} className="text-blue-500 hover:underline">
                {/* {blog.blog_link} */}
              </a>
            </div>
          </div>
          
          <div className="flex justify-between mt-6 space-x-4">
            <button
              onClick={() => handleEditClick(blog)}
              className="bg-blue-500 p-2 text-white w-[100px] rounded hover:text-blue-700 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(blog)}
              className="bg-red-500 p-2 text-white w-[100px] rounded hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>

    {isCreateModalOpen && <CreateBlogModal onClose={closeCreateModal} />}

    {isEditModalOpen && selectedBlog && (
      <EditBlogModal
        blog={selectedBlog}
        onClose={() => setEditModalOpen(false)}
      />
    )}

    {isDeleteModalOpen && selectedBlog && (
      <DeleteBlogModal
        blogId={selectedBlog.blog_id}
        onClose={() => setDeleteModalOpen(false)}
      />
    )}
  </div>
  )
}

export default ManageBlogs