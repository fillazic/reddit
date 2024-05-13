import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const redditFullSlice = createSlice({
    name: 'fullPost',
    initialState: {
      posts: [],
      comments: [],
      commentsStatus: 'idle',
      error: null,
      id: '',
    },
    reducers: {
      setId: (state, action) => {
        state.id = action.payload;
      },
      setPost: (state, action) => {
        state.posts = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchComments.pending, (state) => {
          state.commentsStatus = 'loading';
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.commentsStatus = 'succeeded';
          state.comments = action.payload;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.commentsStatus = 'failed';
          state.error = action.error.message;
        });
    },
  });


  export const {setId, setPost } = redditFullSlice.actions;

  export const selectComments = (state) => state.fullPost.comments;
  export const selectCommentsStatus = (state) => state.fullPost.commentsStatus;
  export const selectPost = (state) => state.fullPost.posts;
  export const id = (state) => state.fullPost.id;

  export const fetchComments = createAsyncThunk('reddit/fetchComments', async (id) => {
    const response = await fetch(`https://www.reddit.com${id}.json`);
    const data = await response.json();
    console.log(data); 

    return data[1].data.children.map(child => child.data)
  
  });
  
  export default redditFullSlice.reducer;