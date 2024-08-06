import { configureStore } from "@reduxjs/toolkit";
import defaultSlice from "./defaultSlice";


const store = configureStore({
    reducer: {
        defaultSlice: defaultSlice,
    },
});


export default store;