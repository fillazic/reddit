
import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import searchReducer from './redditSearch';
import fullPostReducer from './FullPostSlice';

const store = configureStore({
  reducer: {
    reddit: redditReducer,
    search: searchReducer,
    fullPost: fullPostReducer

  },
});

export default store;
