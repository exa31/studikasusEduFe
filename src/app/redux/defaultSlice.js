import { createSlice } from "@reduxjs/toolkit";

// Menentukan initialState dengan struktur yang benar
const initialState = {
    login: false,
    cart: [],
};




const defaultSlice = createSlice({
    name: "defaultSlice",
    initialState,
    reducers: {
        isLogin: (state) => {
            state.login = true;
        },
        isLogout: (state) => {
            state.login = false;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            const existProduct = state.cart.some((item) => item.product._id === action.payload.product._id);
            if (existProduct) {
                state.cart.map((item) => {
                    if (item.product._id === action.payload.product._id) {
                        item.qty += 1;
                    }
                });
            } else {
                state.cart.push(action.payload);
            }
        },
        reduceItemCart: (state, action) => {
            state.cart.map((item) => {
                if (item.product._id === action.payload.product._id) {
                    if (item.qty === 1) {
                        state.cart = state.cart.filter((item) => item.product._id !== action.payload.product._id);
                    } else {
                        item.qty -= 1;
                    }
                }
            });
        },
        removeItemCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.product._id !== action.payload.product._id);
        },
    },
});

// Menggabungkan ekspor actions
export const { isLogin, isLogout, addToCart, setCart, reduceItemCart, removeItemCart } = defaultSlice.actions;
export default defaultSlice.reducer;