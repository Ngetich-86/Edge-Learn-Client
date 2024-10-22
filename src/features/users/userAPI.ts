import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/ApiDomain";
import { TUser } from "../../types/types";
import { RootState } from "../../app/store";

// API Slice
export const userAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain,
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
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<TUser[], void>({
            query: () => 'users',
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation<TUser, Partial<TUser & { id: number }>>({
            query: ({ id, ...rest }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        getUserById: builder.query<TUser, number>({
            query: (id) => `users/${id}`,
        }),
        resetPassword: builder.mutation<{ success: boolean }, { email: string }>({
            query: ({ email }) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),
        changePassword: builder.mutation<{ success: boolean }, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: 'auth/change-password',
                method: 'POST',
                body: { email, password },
            }),
        }),




    }),
});

// Export hooks for usage in functional components
export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useResetPasswordMutation,
} = userAPI;
