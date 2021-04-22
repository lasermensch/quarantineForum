import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {client} from '../../api/client';

const initialState = {
    comments: [],
    status: 'idle',
    error: null,
    threadId: ''
};

export const fetchComments = createAsyncThunk('comments/fetchcomments', async (id) =>
{
    
    const response = await client.get(`https://forum-api-jkrop.ondigitalocean.app/thread/${id}/comment`, {});
    const data = {comments: response, id: id}
    return data;
});
export const postComment = createAsyncThunk('comments/postcomment', async (props) =>
{
    
    const response = await client.post(`https://forum-api-jkrop.ondigitalocean.app/thread/${props.id}/comment`, 
                                                {"title": props.title, "content": props.content});
    return response;
});
export const postLikeToComment = createAsyncThunk('comments/postLikeToComment', async (id) =>
{
    const response = await client.post(`https://forum-api-jkrop.ondigitalocean.app/comment/${id}/like`, {});

    return response;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers:
        {
            [fetchComments.pending]: (state, action) =>
            {
                state.status = 'loading';
            },
            [fetchComments.fulfilled]: (state, action) =>
            {
                state.comments = [];
                state.status = 'succeeded';
                state.comments = state.comments.concat(action.payload.comments);
                state.threadId = action.payload.id;
            },
            [fetchComments.rejected]: (state, action) =>
            {
                state.status = 'failed';
                state.error = action.error.message;
            },
            [postComment.fulfilled]: (state, action) =>
            {
                state.comments = [];
                state.status = 'idle';
                state.threadId = '';
            }
        }
});

export const {commentAdded} = commentsSlice.actions;

export default commentsSlice.reducer;

export const selectAllComments = state => state.comments.comments; 
export const selectCommentById = (state, id) => state.comments.comments.find(t => t._id === id);