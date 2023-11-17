import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import postslice from "./postslice";

const store = configureStore({
    reducer:{
        auth:authslice,
        POST:postslice    
    }
})

export default store