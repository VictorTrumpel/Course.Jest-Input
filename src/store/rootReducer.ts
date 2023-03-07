import { combineReducers } from 'redux'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  users: userReducer
})

export default rootReducer