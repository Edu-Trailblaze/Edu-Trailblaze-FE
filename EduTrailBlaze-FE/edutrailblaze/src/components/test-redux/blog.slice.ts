import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types/blog.type'

interface BlogState {
  postId: string
  editingPost: Post | null
}

const initialState: BlogState = {
  postId: '',
  editingPost: null,
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditPost: (state) => {
      state.editingPost = null
    }
  }
})

const blogReducer = blogSlice.reducer

export const { startEditPost, cancelEditPost } = blogSlice.actions
export default blogReducer
