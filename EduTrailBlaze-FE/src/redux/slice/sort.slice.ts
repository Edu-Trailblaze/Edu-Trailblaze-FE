import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SortColumnState {
  [tableKey: string]: Record<string, boolean>
}

const initialState: SortColumnState = {
  news: {
    id: true,
    title: true,
    content: true,
    imageUrl: true,
    createdAt: true
  },
  vouchers: {
    id: true,
    discountType: true,
    discountValue: true,
    voucherCode: true,
    isUsed: true,
    startDate: true,
    expiryDate: true,
    minimumOrderValue: true,
    createdAt: true
  },
  courses: {
    id: true,
    title: true,
    imageURL: true,
    introURL: true,
    description: true,
    price: true,
    difficultyLevel: true,
    prerequisites: true,
    learningOutcomes: true,
    createdAt: true,
    createdBy: true
  },
  orders: {
    id: true,
    userName: true,
    orderAmount: true,
    orderDate: true,
    orderStatus: true
  },
  reviews: {
    id: true,
    courseId: true,
    rating: true,
    reviewText: true
  }
}

const sortColumnSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    // Cập nhật 1 bảng (tableKey) với cột ẩn/hiện
    setSortForTable: (
      state,
      action: PayloadAction<{
        tableKey: string
        visibility: Record<string, boolean>
      }>
    ) => {
      const { tableKey, visibility } = action.payload
      state[tableKey] = visibility
    },
    // Clear toàn bộ cột cho 1 bảng
    clearSortForTable: (state, action: PayloadAction<string>) => {
      const tableKey = action.payload
      // Xoá key trong state hoặc đặt lại {}
      delete state[tableKey]
    }
  }
})

export const { setSortForTable, clearSortForTable } = sortColumnSlice.actions
export default sortColumnSlice.reducer
