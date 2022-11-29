import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const claimAdapter = createEntityAdapter({})

const initialState = claimAdapter.getInitialState()

export const claimApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getclaim: builder.query({
            query: () => '/claim',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedclaim = responseData.map(claim => {
                    claim.id = claim._id
                    return claim
                });
                return claimAdapter.setAll(initialState, loadedclaim)
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
    useGetclaimQuery,
} = claimApiSlice

// returns the query result object
export const selectclaimResult = claimApiSlice.endpoints.getclaim.select()

// creates memoized selector
const selectclaimData = createSelector(
    selectclaimResult,
    claimResult => claimResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllclaim,
    selectById: selectClaimById,
    selectIds: selectClaimIds
    // Pass in a selector that returns the claim slice of state
} = claimAdapter.getSelectors(state => selectclaimData(state) ?? initialState)