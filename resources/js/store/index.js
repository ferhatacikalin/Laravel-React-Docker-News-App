import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import newsReducer from "./newsSlice";
import categoriesReducer from "./categoriesSlice";
const store = configureStore({
    reducer: {
        user: useReducer,
        news: newsReducer,
        categories: categoriesReducer,
    },
});

export default store;
