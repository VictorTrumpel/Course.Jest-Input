import { combineReducers } from 'redux'
import { userApi } from '../api/userApi/userApi'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  users: userReducer
})

export default rootReducer