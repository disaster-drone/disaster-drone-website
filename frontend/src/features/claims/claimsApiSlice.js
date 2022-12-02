import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const claimsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = claimsAdapter.getInitialState()

export const claimsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClaims: builder.query({
            query: () => '/claims',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedClaims = responseData.map(claim => {
                    claim.id = claim._id
                    return claim
                });
                return claimsAdapter.setAll(initialState, loadedClaims)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Claim', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Claim', id }))
                    ]
                } else return [{ type: 'Claim', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetClaimsQuery,
} = claimsApiSlice

// returns the query result object
export const selectClaimsResult = claimsApiSlice.endpoints.getClaims.select()

// creates memoized selector
const selectClaimsData = createSelector(
    selectClaimsResult,
    claimsResult => claimsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllClaims,
    selectById: selectClaimById,
    selectIds: selectClaimIds
    // Pass in a selector that returns the claims slice of state
} = claimsAdapter.getSelectors(state => selectClaimsData(state) ?? initialState)