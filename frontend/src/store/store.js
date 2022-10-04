import { configureStore } from '@reduxjs/toolkit'
import { postsSlice } from '../Features/posts/PostsSlice'

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer
  },
})
