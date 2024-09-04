import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chatSlice'
import navReducer from './slices/navSlice'
import userReducer from './slices/userSlice'
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    navigation: navReducer,
    user: userReducer
  },
})