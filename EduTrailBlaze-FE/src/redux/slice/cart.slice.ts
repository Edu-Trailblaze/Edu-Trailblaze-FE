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
      console.log('addItemToCart payload:', action.payload);
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        totalPrice: state.totalPrice + action.payload.totalCoursePrice
      };
    },
    setCart: (state, action: PayloadAction<ICart>) => {
      console.log('setCart payload:', action.payload);
    
      // Kiểm tra xem state có thay đổi không
      if (JSON.stringify(state.cartItems) !== JSON.stringify(action.payload.cartItems)) {
        state.cartItems = action.payload.cartItems;
        state.totalPrice = action.payload.totalPrice;
      }
    }
  }
})

export const { addItemToCart, setCart } = cartSlice.actions
export default cartSlice.reducer
