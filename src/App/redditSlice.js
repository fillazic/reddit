import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    articles: [],
    status: 'nn',
    error: null,
    display: 'dropdown-content-none',
    subreddit: '/r/popular'
  },
  reducers: {
    setSubreddit: (state,action) => {
      state.subreddit = action.payload},
    setDisplay: (state,action) => {
        state.display = action.payload},
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

export const {setSubreddit, setDisplay} = redditSlice.actions;
export const term = (state) => state.reddit.subreddit;
export const drop = (state) => state.reddit.display;
export const selectSearchTerm = (state) => state.reddit;
export const selectPosts = (state) => state.reddit.articles;
export const selectPostsStatus = (state) => state.reddit.status;

export default redditSlice.reducer;

export const fetchPosts = createAsyncThunk('reddit/fetchPosts', async (term) => {
  try {
    const response = await fetch(`https://www.reddit.com${term}.json`);
    const data = await response.json();
    console.log(data); 

    return data.data.children.map((child) => child.data)
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw error;
  }
});