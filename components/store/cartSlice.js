import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")) || []
      : [],
  user: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.id === item.id && i.dimensions === item.dimensions
      );
      if (existing) {
        // Increase by selected quantity
        existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
      } else {
        // Add new item with selected quantity
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const { id, dimensions } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.dimensions === dimensions)
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    increaseQuantity: (state, action) => {
      const { id, dimensions } = action.payload;

      const item = state.items.find(
        (i) => i.id === id && i.dimensions === dimensions
      );

      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const { id, dimensions } = action.payload;

      const item = state.items.find(
        (i) => i.id === id && i.dimensions === dimensions
      );

      if (item) {
        item.quantity = Math.max(1, (item.quantity || 1) - 1);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    loadCartFromStorage: (state) => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      state.items = stored;
    },
    setUserDetails: (state) => {
      const userEmail = localStorage.getItem("userEmail") || "Guest User";
      const userID = localStorage.getItem("userID") || null;
      state.user = {
        userEmail,
        userID,
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCartFromStorage,
  setUserDetails,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
