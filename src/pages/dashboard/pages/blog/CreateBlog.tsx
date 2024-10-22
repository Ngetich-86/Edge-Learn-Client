import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateBlogMutation, Blog } from '../../../../features/blogs/blogsAPI';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface CreateBlogModalProps {
  // blog: Blog;
  onClose: () => void;
}

const CreateBlogSchema = yup.object().shape({
    blog_name: yup.string().required('Resource name is required'),
    blog_description: yup.string().required('Description is required'),
    blog_link: yup.string().url('Must be a valid URL').required('URL is required'),
    blog_image: yup.mixed().required('Image is required'),
  });

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({ onClose }) => {
  const [createBlog] = useCreateBlogMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(CreateBlogSchema),
  });

  const onSubmit = async (data: any) => {
        try {
          setIsUploading(true);
    
          // Handle image file
          let imageUrl = '';
          const blogImage = data.blog_image[0];
          if (blogImage) {
            // Image validation
            if (blogImage.size > 2000000) { // 2MB limit
              setImageError('The file is too large');
              setIsUploading(false);
              return;
            }
    
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(blogImage.type)) {
              setImageError('Unsupported file format');
              setIsUploading(false);
              return;
            }
    
             // Upload image to Cloudinary
             const formData = new FormData();
             formData.append('file', blogImage);
             formData.append('upload_preset', 'j9grhett'); // upload preset
     
             const response = await axios.post('https://api.cloudinary.com/v1_1/dwsxs74ow/image/upload', formData);
     
             if (response.status === 200) {
               imageUrl = response.data.secure_url;
             } else {
               throw new Error('Failed to upload image');
             }
            }
    
            // Prepare the resource data with the uploaded image URL
            const blogData = {
              ...data,
              blog_image: imageUrl,
            };
      
            await createBlog(blogData).unwrap();
            toast.success('Blog created successfully');
            console.log('success')
            // onClose();
          } catch (error) {
            toast.error('Failed to create blog');
            console.log(error)
            alert(error)
          } finally {
            setIsUploading(false);
          }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
       <Toaster />
         <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2  max-h-screen overflow-auto">
         <h2 className="text-xl font-bold mb-4 text-black">Create New blog</h2>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           {/*  Name */}
           <div className="form-control">
             <input
              id="blog_name"
              {...register('blog_name')}
              className="input input-bordered"
              placeholder="Blog Name"
            />
            {errors.blog_name && (
              <p className="text-red-500 text-sm">{errors.blog_name.message}</p>
            )}
          </div>

          {/*  Description */}
          <div className="form-control">
            <textarea
              id="blog_description"
              {...register('blog_description')}
              className="input input-bordered"
              placeholder="Description"
            />
            {errors.blog_description && (
              <p className="text-red-500 text-sm">{errors.blog_description.message}</p>
            )}
          </div>


          {/* Link */}
          <div className="form-control">
            <input
              id="blog_link"
              {...register('blog_link')}
              className="input input-bordered"
              placeholder="Blog Link"
            />
            {errors.blog_link && (
              <p className="text-red-500 text-sm">{errors.blog_link.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="form-control">
            <input
              type="file"
              id="blog_image"
              {...register('blog_image')}
              className="input input-bordered"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            {errors.blog_image && (
              <p className="text-red-500 text-sm">{errors.blog_image.message}</p>
            )}
            {imageError && (
              <p className="text-red-500 text-sm">{imageError}</p>
            )}
            {imagePreview && (
              <img src={imagePreview} alt="Image Preview" className="mt-4 max-w-full h-auto" />
            )}
          </div>

          <div className="flex justify-end mt-4">
            {/* <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700">Cancel</button> */}
            <button className='btn btn-primary'><NavLink to="/dashboard_page/profile"> <h3>cancel </h3></NavLink>
          </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogModal;

