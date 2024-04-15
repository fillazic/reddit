import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    articles: [],
    status: 'nn',
    error: null,
    subreddit: 'popular'
  },
  reducers: {
    setSubreddit: (state,action) => {
      state.subreddit = action.payload},
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setSubreddit} = redditSlice.actions;
export const term = (state) => state.reddit.subreddit;
export const selectSearchTerm = (state) => state.reddit;
export const selectPosts = (state) => state.reddit.articles;
export const selectPostsStatus = (state) => state.reddit.status;

export default redditSlice.reducer;

export const fetchPosts = createAsyncThunk('reddit/fetchPosts', async (term) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${term}.json`);
    const data = await response.json();
    console.log(data); 

    return data.data.children.map((child) => child.data);
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw error;
  }
});