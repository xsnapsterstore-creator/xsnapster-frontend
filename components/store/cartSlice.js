import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")) || []
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      //   if (!existing) {
      state.items.push(item);
      localStorage.setItem("cart", JSON.stringify(state.items));
      //   }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((i) => i.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    loadCartFromStorage: (state) => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      state.items = stored;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, loadCartFromStorage } =
  cartSlice.actions;

export default cartSlice.reducer;
