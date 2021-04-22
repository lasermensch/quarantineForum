import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {client} from '../../api/client';

const initialState = {
    threads: [],
    status: 'idle',
    error: null,
    catId: ''
};

export const fetchThreads = createAsyncThunk('threads/fetchThreads', async (id) =>
{
    
    const response = await client.get(`https://forum-api-jkrop.ondigitalocean.app/category/${id}/thread`, {});
    const data = {threads: response, id: id}
    return data;
});
export const postThread = createAsyncThunk('threads/postThread', async (props) =>
{
    
    const response = await client.post(`https://forum-api-jkrop.ondigitalocean.app/category/${props.catId}/thread`, 
                                                {"title": props.title, "content": props.content});
    return response;
});
export const postLikeToThread =createAsyncThunk('threads/postLikeToThread', async (id) =>
{
    const response = await client.post(`https://forum-api-jkrop.ondigitalocean.app/thread/${id}/like`, {});

    return response;
});

const ThreadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {},
    extraReducers:
        {
            [fetchThreads.pending]: (state, action) =>
            {
                state.status = 'loading';
            },
            [fetchThreads.fulfilled]: (state, action) =>
            {
                state.threads = []; //För att nollställa... Kanske ordna, så att det blir en ny array för varje tråd?
                state.status = 'succeeded';
                state.threads = state.threads.concat(action.payload.threads);
                state.catId = action.payload.id;
            },
            [fetchThreads.rejected]: (state, action) =>
            {
                state.status = 'failed';
                state.error = action.error.message;
            },
            // [postThread.fulfilled]: (state, action) =>
            // {
            //     state.status = 'idle'
            // }
        }
        
});

export const {threadAdded} = ThreadsSlice.actions;

export default ThreadsSlice.reducer;

export const selectAllThreads = state => state.threads.threads; 
export const selectThreadById = (state, id) => state.threads.threads.find(t => t._id === id);