import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice';
import threadsReducer from '../features/threads/threadsSlice';
import commentsReducer from '../features/comments/commentsSlice';


export default configureStore({
  reducer: {
    categories: categoriesReducer,
    threads: threadsReducer,
    comments: commentsReducer,
  },
});
