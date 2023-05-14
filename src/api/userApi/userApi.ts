import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' /**/
import { BaseQuery } from '../BaseQuery'
import { GetUserListQuery } from './GetUserListQuery'
import { GetUserByIdQuery } from './GetUserByIdQuery'

export const userApi = createApi({
  reducerPath: 'userApi', //*
  baseQuery: fetchBaseQuery(new BaseQuery()),
  endpoints: (build) => ({
    getList: build.query(new GetUserListQuery()),
    getById: build.query(new GetUserByIdQuery())
  })
})