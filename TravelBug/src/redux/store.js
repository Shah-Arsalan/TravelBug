import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./authenticationSlice"
import videoReducer from "./videoSlice"


export const store = configureStore({
    reducer : {
        auth : authenticationReducer,
        video : videoReducer
    }
})

