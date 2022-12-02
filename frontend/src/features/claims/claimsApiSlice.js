import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const claimAdapter = createEntityAdapter({})

const initialState = claimAdapter.getInitialState()

export const claimsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/claims',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(claim => {
                    claim.id = claim._id
                    return claim
                });
                return claimsAdapter.setAll(initialState, loadedNotes)
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
        addNewClaim: builder.mutation({
            query: initialClaim => ({
                url: '/claims',
                method: 'POST',
                body: {
                    ...initialClaim,
                }
            }),
            invalidatesTags: [
                { type: 'Claim', id: "LIST" }
            ]
        }),
        updateClaim: builder.mutation({
            query: initialClaim => ({
                url: '/claims',
                method: 'PATCH',
                body: {
                    ...initialClaim,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Claim', id: arg.id }
            ]
        }),
        deleteClaim: builder.mutation({
            query: ({ id }) => ({
                url: `/claims`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Claim', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetClaimsQuery,
    useAddNewClaimMutation,
    useUpdateClaimMutation,
    useDeleteClaimMutation,
} = claimsApiSlice

// returns the query result object
export const selectClaimResult = claimApiSlice.endpoints.getClaim.select()

// creates memoized selector
const selectClaimsData = createSelector(
    selectClaimsResult,
    claimResult => claimResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllClaims,
    selectById: selectClaimById,
    selectIds: selectClaimIds
    // Pass in a selector that returns the claim slice of state
} = claimAdapter.getSelectors(state => selectClaimData(state) ?? initialState)