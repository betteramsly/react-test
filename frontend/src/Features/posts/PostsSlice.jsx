import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ limit, offset }) => {
  const { data } = await axios.get('/api/article', {
    params: {
      limit,
      offset,
    },
  })
  return data
})

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
  const { data } = await axios.get('/api/article')
  return data.data
})

export const fetchSelectedPost = createAsyncThunk('posts/fetchSelectedPost', async (id) => {
  const { data } = await axios.get(`/api/article/${id}`)
  return data
})

export const fetchPostComment = createAsyncThunk('posts/fetchPostComment', async () => {
  const { data } = await axios.get('/api/comment?article')
  return data.records
})

export const fetchAddPost = createAsyncThunk('posts/fetchAddPost', async (body) => {
  const { data } = await axios.post(`/api/article/`, body)
  console.log(data)
  return data
})

export const fetchAddComment = createAsyncThunk('posts/fetchAddComment', async (comment) => {
  const { data } = await axios.post('/api/comment', comment)
  return { ...comment, id: data }
})

const initialState = {
  posts: {
    items: [],
    status: 'idle',
    total: null,
    allPosts: [],
  },
  selectedPost: {
    data: null,
    status: 'idle',
  },
  offset: 0,
  limit: 3,
  comments: {
    records: null,
    total: null,
  },
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    increaseOffset(state) {
      state.offset = state.offset + 3
    },
    addPost: (state, action) => {
      state.posts.items = [action.payload, ...state.posts.items]
    },
    deletePost: (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item.id !== action.payload)
    },
    addComment: (state, action) => {
      console.log(state)
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading'
    },

    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = [...state.posts.items, ...action.payload.data]
      state.posts.total = action.payload.total
      state.posts.status = 'loaded'
    },

    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error'
    },

    [fetchSelectedPost.pending]: (state) => {
      state.selectedPost.status = 'loading'
    },

    [fetchSelectedPost.fulfilled]: (state, action) => {
      state.selectedPost.data = action.payload
      state.selectedPost.status = 'loaded'
    },

    [fetchSelectedPost.error]: (state) => {
      state.selectedPost.status = 'error'
    },

    [fetchPostComment.pending]: (state) => {
      state.comments.status = 'loading'
    },

    [fetchPostComment.fulfilled]: (state, action) => {
      state.comments.records = action.payload
      state.comments.total = action.payload
      state.comments.status = 'loaded'
    },

    [fetchPostComment.error]: (state) => {
      state.comments.status = 'error'
    },

    [fetchAddPost.fulfilled]: (state, action) => {
      state.posts.items = [action.payload, ...state.posts.items]
    },

    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts.allPosts = action.payload
    },

    [fetchAddComment.fulfilled]: (state, action) => {
      state.comments.records = [action.payload, ...state.comments.records]
    },
  },
})

export const { increaseOffset, addPost, deletePost } = postsSlice.actions
