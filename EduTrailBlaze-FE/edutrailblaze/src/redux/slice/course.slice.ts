import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlogState {
  courseId: number
  editingPost: Course | null
}

const initialState: BlogState = {
  courseId: 0,
  editingPost: null
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    startEditCourse: (state, action: PayloadAction<string>) => {
      state.courseId = Number(action.payload)
    },
    cancelEditCourse: (state) => {
      state.editingPost = null
    }
  }
})

const courseReducer = courseSlice.reducer

export const { startEditCourse, cancelEditCourse } = courseSlice.actions
export default courseReducer
