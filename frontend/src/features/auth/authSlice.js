import { createSlice } from '@reduxjs/toolkit'

// what is a slice? 

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

// export the actions so that they can be used in other files
export const { setCredentials, logOut } = authSlice.actions

// export the reducer so we can add it to the store
export default authSlice.reducer


export const selectCurrentToken = (state) => state.auth.token