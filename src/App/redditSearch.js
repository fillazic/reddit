import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const redditSearchSlice = createSlice({
  name: 'search',
  initialState: {
    names: [],
    status: 'nn',
    error: null,
    term:''
  },
  reducers: {
    setTerm: (state, action) => {
        state.term = action.payload},
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.names = action.payload;
      })
      .addCase(fetchSearchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setTerm, clearSearchTerm} = redditSearchSlice.actions;
export const searchPosts = (state) => state.search.term;
export const selectSearchPosts = (state) => state.search.names;
export const selectPostsSearchStatus = (state) => state.search.status;

export default redditSearchSlice.reducer;

export const fetchSearchPosts = createAsyncThunk('search/fetchSearchPosts', async (searchPosts) => {
  try {
    const response = await fetch(`https://www.reddit.com/search.json?q=r/${searchPosts}`);
    const data = await response.json();
    console.log(data); 

    return data.data.children.map((child) => child.data);
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw error;
  }
});