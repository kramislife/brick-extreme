import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.product === item.product
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        state.cartItems[existingItemIndex].quantity += item.quantity;
        // toast.success(`Updated quantity for ${item.name}`);
      } else {
        // Add new item at the beginning of the array
        state.cartItems.unshift(item);
        // toast.success(`${item.name} added to cart`);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.product === product);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
