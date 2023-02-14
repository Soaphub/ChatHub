import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './fetch'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    },
})