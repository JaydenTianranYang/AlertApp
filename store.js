import { configureStore } from "@reduxjs/toolkit";  //set the data layer
import navReducer from "./slices/navSlice"; //data layer into different areas
//reducer for setting up the store

//connnect to the store
export const store = configureStore({
    reducer : {
        nav: navReducer,
    },
});