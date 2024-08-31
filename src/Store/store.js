import { configureStore } from '@reduxjs/toolkit'
import homeSliceReducer from '../Store/HomeSlice'
const store = configureStore({
    reducer: {
        home: homeSliceReducer
    }
});

export default store;