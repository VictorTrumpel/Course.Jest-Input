import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '../api/userApi/userApi'
import rootReducer from './rootReducer'

export const setupStore = (initialState?: ReturnType<typeof rootReducer>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (
      getDefaultMiddleware => getDefaultMiddleware().concat(
        userApi.middleware
      )
    ),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState
  })

const store = setupStore()

export default store