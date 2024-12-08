import { configureStore } from "@reduxjs/toolkit";
import playingSongSlice from "./Slices/PlayingSongSlice";
export const store = configureStore({
    reducer:{
        playingSong:playingSongSlice
    }
})