import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {client} from '../../api/client';

const initialState = {
    categories: [],
    status: 'idle',
    error: null 
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () =>
{
    const response = await client.get('https://forum-api-jkrop.ondigitalocean.app/sandbox/QuarantineAPI/category', []);
    return response;
});

export const postCategory = createAsyncThunk('categories/postCategory', async (name) =>
{
    const response = await client.post('https://forum-api-jkrop.ondigitalocean.app/sandbox/QuarantineAPI/category', {"name": name});
    return response;
})

const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers:
        {
            [fetchCategories.pending]: (state, action) =>
            {
                state.status = 'loading';
            },
            [fetchCategories.fulfilled]: (state, action) =>
            {
                state.categories = [];
                state.status = 'succeeded';
                state.categories = state.categories.concat(action.payload);
            },
            [fetchCategories.rejected]: (state, action) =>
            {
                state.status = 'failed';
                state.error = action.error.message;
            },
            
        }
    
});

export const {categoryAdded} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;

export const selectAllCategories = state => state.categories.categories; 
export const selectCategoryById = (state, id) => state.categories.categories.find(cat => cat._id === id);
