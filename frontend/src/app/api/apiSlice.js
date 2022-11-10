import { createAPI, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createAPI({
    basedQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Claim', 'User'],
    endpoints: builder => ({})
})