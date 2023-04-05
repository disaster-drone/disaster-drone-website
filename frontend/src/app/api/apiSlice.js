// starting API slice, with initial state
// fetch base qeury in development is http://localhost:3000 but change in production.

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Claim', 'User', 'Case', 'Image'],
    endpoints: builder => ({})
})