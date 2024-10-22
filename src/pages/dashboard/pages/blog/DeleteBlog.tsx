import React from 'react';
import { useDeleteBlogMutation } from '../../../../features/blogs/blogsAPI';
import { Toaster, toast } from 'sonner';

interface DeleteBlogModalProps {
  blogId: number;
  onClose: () => void;
}

const DeleteBlogModal: React.FC<DeleteBlogModalProps> = ({ blogId, onClose }) => {
  const [deleteBlog] = useDeleteBlogMutation();
  // console.log(blogId)

  const handleDelete = async () => {
    try {
      await deleteBlog(blogId).unwrap();
      toast.success('Blog deleted successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to delete blog');
    console.log(error)
    alert(error)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
        <p>Are you sure you want to delete this resource?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 text-gray-700">Cancel</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
