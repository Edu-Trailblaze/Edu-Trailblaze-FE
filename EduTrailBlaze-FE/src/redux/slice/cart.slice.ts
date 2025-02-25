import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Ensure correct import

const initialState: ICart = {
  cartItems: [],
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      console.log('addItemToCart payload:', action.payload) // Log the payload
      state.cartItems.push(action.payload)
      state.totalPrice += action.payload.totalCoursePrice
    },
    setCart: (state, action: PayloadAction<ICart>) => {
      console.log('setCart payload:', action.payload) // Log the payload
      state.cartItems = action.payload.cartItems
      state.totalPrice = action.payload.totalPrice
    }
  }
})

export const { addItemToCart, setCart } = cartSlice.actions
export default cartSlice.reducer
