import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog, BlogState } from '../../types/types';


const ininialState: BlogState = {
    selectedBlog: JSON.parse(localStorage.getItem('selectedBlog') || 'null'),
    blog: JSON.parse(localStorage.getItem('blog') || 'null'),
}

const resourcesSlice = createSlice({
    name: 'blog',
    initialState: ininialState,
    reducers: {
        setBlog: (state, action: PayloadAction<Blog[]>) => {
            state.blog = action.payload;
            localStorage.setItem('selectedBlog', JSON.stringify(action.payload));
        },
        UpdateBlog: (state, action: PayloadAction<Blog | null>) => {
            state.selectedBlog = action.payload;
            localStorage.setItem('selectedBlog', JSON.stringify(action.payload));
        },
        clearBlog: (state) => {
            state.selectedBlog = null;
            localStorage.removeItem('selectedBlog');
        }
    }
});

export const { setBlog, UpdateBlog, clearBlog } = resourcesSlice.actions;
export default resourcesSlice.reducer;