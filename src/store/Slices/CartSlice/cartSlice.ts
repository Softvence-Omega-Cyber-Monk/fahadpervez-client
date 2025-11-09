import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  image: string;
  title: string;
  pricePerUnit: number;
  quantity: number;
  totalPrice?: number;
  productSKU: string;
  selectedProduct?:boolean
}

interface CartState {
  items: CartItem[];
}

const localCart = localStorage.getItem("cart");

const initialState: CartState = {
  items: localCart ? JSON.parse(localCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = Number((existingItem.pricePerUnit * existingItem.quantity).toFixed(2));
      } else {
        state.items.push({ ...action.payload, totalPrice: action.payload.pricePerUnit * action.payload.quantity });
      }
      
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

      increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = Number((item.pricePerUnit * item.quantity).toFixed(2));
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: boolean }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.selectedProduct = action.payload.status;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) { // prevent quantity from going below 1
        item.quantity -= 1;
        item.totalPrice = Number((item.pricePerUnit * item.quantity).toFixed(2));
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, updateStatus } = cartSlice.actions;
export default cartSlice.reducer;
