import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    items: {
        id: number;
        image: string;
        title: string;
        currentPrice: number;
        originalPrice: number;
        quantity: number;
    }[];
}

const initialState :CartState={
    items:[],
}
const localCart = localStorage.getItem('cart');
if (localCart) {
    initialState.items = JSON.parse(localCart);
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },

    },

});

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;