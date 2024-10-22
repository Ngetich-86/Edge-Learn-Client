import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIDomain } from '../../utils/ApiDomain';
import { RootState } from '../../app/store';

export interface Blog {
    blog_id: number;
    blog_name: string;
    blog_description: string;
    blog_link: string;
    blog_image: string;
}
export const blogsAPI = createApi({
    reducerPath: 'blogsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: APIDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // console.log(token);
            if (token) {
                headers.set('Authorization', token);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['getBlogs', 'userBlogs'],
    endpoints: (builder) => ({
        getBlogs: builder.query<Blog[], void>({
            query: () => '/blogs',
            providesTags: ['getBlogs'],
        }),

        getBlog: builder.query<Blog, number>({
            query: (blog_id) => `/blog/${blog_id}`,
        }),

        createBlog: builder.mutation<Blog, Partial<Blog>>({
            query: (newBlog) => ({
                url: 'create-blog',
                method: 'POST',
                body: newBlog,
            }),
            invalidatesTags: ['getBlogs', 'userBlogs'],
        }),

        updateBlog: builder.mutation<Blog, { blog_id: number; data: Partial<Blog> }>({
            query: ({ blog_id, data }: { blog_id: number; data: Partial<Blog> }) => ({
                url: `/update-blog/${blog_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['getBlogs'],
        }),

        deleteBlog: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-blogs/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['getBlogs'],
        }),

        getBlogsByUserId: builder.query<Blog[], number>({
            query: (id) => `all-user-blog/${id}`,
            providesTags: ['userBlogs'],
        }),

    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetBlogsByUserIdQuery
} = blogsAPI; 
