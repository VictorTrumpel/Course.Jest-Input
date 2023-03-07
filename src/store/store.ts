import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

export const setupStore = (initialState?: ReturnType<typeof rootReducer>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware()),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState
  })

const store = setupStore()

export default store