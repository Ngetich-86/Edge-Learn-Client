// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useUpdateBlogMutation, Blog } from '../../../../features/blogs/blogsAPI';
// import { Toaster, toast } from 'sonner';
// import axios from 'axios';

// interface EditResourceModalProps {
//   blog: Blog;
//   onClose: () => void;
// }

// const EditBlogSchema = yup.object().shape({
//   blog_name: yup.string().required('Blog name is required'),
//   blog_description: yup.string().required('Description is required'),
//   blog_link: yup.string().url('Must be a valid URL').required('URL is required'),
//   blog_image: yup.mixed().notRequired(), // Handle image validation if needed
// });

// const EditBlogModal: React.FC<EditResourceModalProps> = ({ blog, onClose }) => {
//   const [updateBlog] = useUpdateBlogMutation();
//   const [imagePreview, setImagePreview] = useState<string | null>(blog.blog_image);
//   const [imageError, setImageError] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(EditBlogSchema),
//   });

//   useEffect(() => {
//     if (blog) {
//       setValue('blog_name', blog.blog_name);
//       setValue('blog_description', blog.blog_description);
//       setValue('blog_link', blog.blog_link);
//       // Set the initial image preview
//       setImagePreview(blog.blog_image);
//     }
//   }, [blog, setValue]);

//   const onSubmit = async (data: any) => {
//     try {
//       setIsUploading(true);
//       let imageUrl = imagePreview;

//       if (data.blog_image && data.blog_image[0]) {
//         const blogImage = data.blog_image[0];

//         // Image validation
//         if (blogImage.size > 2000000) { // 2MB limit
//           setImageError('The file is too large');
//           setIsUploading(false);
//           return;
//         }

//         if (!['image/jpeg', 'image/png', 'image/gif'].includes(blogImage.type)) {
//           setImageError('Unsupported file format');
//           setIsUploading(false);
//           return;
//         }

//         // Upload image to Cloudinary
//         const formData = new FormData();
//         formData.append('file', blogImage);
//         formData.append('upload_preset', 'j9grhett'); // upload preset

//         const response = await axios.post('https://api.cloudinary.com/v1_1/dwsxs74ow/image/upload', formData);

//         if (response.status === 200) {
//           imageUrl = response.data.secure_url;
//         } else {
//           throw new Error('Failed to upload image');
//         }
//       }

//       // Prepare the blog data with the updated image URL
//       const updatedBlogData = {
//         ...data,
//         blog_image: imageUrl,
//       };

//       await updateBlog({ blog_id: blog.blog_id, data: updatedBlogData }).unwrap();
//       // toast.success('Blog updated successfully');
//       onClose();
//     } catch (error) {
//       // toast.error('Failed to update blog');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <Toaster />
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 max-h-screen overflow-auto">
//         <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Blog Name */}
//           <div className="form-control lg:mr-8">
//             <input
//               id="blog_name"
//               {...register('blog_name')}
//               className="input input-bordered"
//               placeholder="Blog Name"
//             />
//             {errors.blog_name && (
//               <p className="text-red-500 text-sm">{errors.blog_name.message}</p>
//             )}
//           </div>

//           {/* Blog Description */}
//           <div className="form-control lg:mr-8">
//             <textarea
//               id="blog_description"
//               {...register('blog_description')}
//               className="input input-bordered"
//               placeholder="Description"
//             />
//             {errors.blog_description && (
//               <p className="text-red-500 text-sm">{errors.blog_description.message}</p>
//             )}
//           </div>

//           {/* Blog Link */}
//           <div className="form-control lg:mr-8">
//             <input
//               id="blog_link"
//               {...register('blog_link')}
//               className="input input-bordered"
//               placeholder="Blog Link"
//             />
//             {errors.blog_link && (
//               <p className="text-red-500 text-sm">{errors.blog_link.message}</p>
//             )}
//           </div>

//           {/* Blog Image */}
//           <div className="form-control lg:mr-8">
//             <label className="block mb-1">Blog Image</label>
//             <input
//               id="blog_image"
//               type="file"
//               accept="image/*"
//               {...register('blog_image')}
//               className="input input-bordered"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setImagePreview(URL.createObjectURL(file));
//                   setImageError(null); // Clear any previous errors
//                 }
//               }}
//             />
//             {imageError && (
//               <p className="text-red-500 text-sm">{imageError}</p>
//             )}
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Blog preview"
//                 className="mt-4 w-full h-40 object-cover rounded-lg"
//               />
//             )}
//           </div>

//           {/* Form Buttons */}
//           <div className="flex justify-end mt-4 space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
//               disabled={isUploading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-white bg-blue-500 rounded-lg"
//               disabled={isUploading}
//             >
//               {isUploading ? 'Updating...' : 'Update Blog'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditBlogModal;

//=========================================
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateBlogMutation, Blog } from '../../../../features/blogs/blogsAPI';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

interface EditResourceModalProps {
  blog: Blog;
  onClose: () => void;
}

const EditBlogSchema = yup.object().shape({
  blog_name: yup.string().required('Blog name is required'),
  blog_description: yup.string().required('Description is required'),
  blog_link: yup.string().url('Must be a valid URL').required('URL is required'),
  blog_image: yup.mixed().notRequired(),
});

const EditBlogModal: React.FC<EditResourceModalProps> = ({ blog, onClose }) => {
  const [updateBlog] = useUpdateBlogMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(blog.blog_image);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(EditBlogSchema),
  });

  useEffect(() => {
    if (blog) {
      setValue('blog_name', blog.blog_name);
      setValue('blog_description', blog.blog_description);
      setValue('blog_link', blog.blog_link);
      setImagePreview(blog.blog_image);
    }
  }, [blog, setValue]);

  const onSubmit = async (data: any) => {
    try {
      setIsUploading(true);
      let imageUrl = imagePreview;

      if (data.blog_image && data.blog_image[0]) {
        const blogImage = data.blog_image[0];

        if (blogImage.size > 2000000) {
          setImageError('The file is too large');
          setIsUploading(false);
          return;
        }

        if (!['image/jpeg', 'image/png', 'image/gif'].includes(blogImage.type)) {
          setImageError('Unsupported file format');
          setIsUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', blogImage);
        formData.append('upload_preset', 'j9grhett');

        const response = await axios.post('https://api.cloudinary.com/v1_1/dwsxs74ow/image/upload', formData);

        if (response.status === 200) {
          imageUrl = response.data.secure_url;
        } else {
          throw new Error('Failed to upload image');
        }
      }

      const updatedBlogData = {
        ...data,
        blog_image: imageUrl,
      };

      await updateBlog({ blog_id: blog.blog_id, data: updatedBlogData }).unwrap();
      onClose();
    } catch (error) {
      // Handle error, e.g., toast error
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control lg:mr-8">
            <input
              id="blog_name"
              {...register('blog_name')}
              className="input input-bordered"
              placeholder="Blog Name"
            />
            {errors.blog_name && <p className="text-red-500 text-sm">{errors.blog_name.message}</p>}
          </div>

          <div className="form-control lg:mr-8">
            <textarea
              id="blog_description"
              {...register('blog_description')}
              className="input input-bordered"
              placeholder="Description"
            />
            {errors.blog_description && <p className="text-red-500 text-sm">{errors.blog_description.message}</p>}
          </div>

          <div className="form-control lg:mr-8">
            <input
              id="blog_link"
              {...register('blog_link')}
              className="input input-bordered"
              placeholder="Blog Link"
            />
            {errors.blog_link && <p className="text-red-500 text-sm">{errors.blog_link.message}</p>}
          </div>

          <div className="form-control lg:mr-8">
            <label className="block mb-1">Blog Image</label>
            <input
              id="blog_image"
              type="file"
              accept="image/*"
              {...register('blog_image')}
              className="input input-bordered"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                  setImageError(null);
                }
              }}
            />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Blog preview"
                className="mt-4 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
              disabled={isUploading}
            >
              {isUploading ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
