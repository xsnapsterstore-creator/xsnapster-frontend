import { createSlice } from "@reduxjs/toolkit";
import { useId } from "react";

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
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        // Increase quantity of the existing cart item
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        // Add new item with default quantity 1
        state.items.push({ ...item, quantity: 1 });
      }
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
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity = Math.max(1, (item.quantity || 1) - 1);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
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
