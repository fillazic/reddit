
import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import searchReducer from './redditSearch';

const store = configureStore({
  reducer: {
    reddit: redditReducer,
    search: searchReducer

  },
});

export default store;
