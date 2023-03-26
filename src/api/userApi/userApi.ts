import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' /**/
import { BaseQuery } from '../BaseQuery'
import { GetUserListQuery } from './GetUserListQuery'

export const userApi = createApi({
  reducerPath: 'userApi', //*
  baseQuery: fetchBaseQuery(new BaseQuery()),
  endpoints: (build) => ({
    getList: build.query(new GetUserListQuery())
  })
})