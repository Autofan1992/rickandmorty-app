import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthInfoType } from '../../types/auth-types'
import { authAPI } from '../../api/auth-api'
import { AxiosResponseErrorType } from '../../api/api'
import { showNotification } from '../helpers/showNotification'

const initialState = {
    isAuth: false,
    isFetching: false,
    authInfo: {} as AuthInfoType
}

export const login = createAsyncThunk<AuthInfoType, undefined, { rejectValue: string }>(
    'login',
    async (_, { rejectWithValue }) => {
        try {
            return await authAPI.getAuthInfo()
        } catch (e) {
            return rejectWithValue((e as AxiosResponseErrorType).response.data.error)
        }
    }
)

export const charactersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAvatar: (state, { payload }: PayloadAction<string>) => {
            state.authInfo.avatarUrl = payload
        },
        setUserName: (state, { payload }: PayloadAction<string>) => {
            state.authInfo.username = payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
            state.authInfo.avatarUrl = null
            state.authInfo.username = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isFetching = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.isAuth = true
                state.authInfo = payload
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
    }
})

export const { setAvatar, setUserName, logout } = charactersSlice.actions

export default charactersSlice.reducer