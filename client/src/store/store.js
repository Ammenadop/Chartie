import { configureStore } from '@reduxjs/toolkit'
import chartReducer from '../store/chartSlice'
import userReducer from '../store/userSlice'

 const store = configureStore({
  reducer: {
    chart: chartReducer,
    user: userReducer,
  },
});
export default store;