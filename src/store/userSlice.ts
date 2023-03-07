import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: { users: [] },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload
    }
  }
})

export const {
  setUsers
} = usersSlice.actions

export default usersSlice.reducer