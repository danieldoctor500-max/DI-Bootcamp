import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse, User } from '@shared/index'
import { apiRequest, jsonBody, refreshAccessToken } from '../../api/client'
import type { RootState } from '../../app/store'

interface AuthState {
  user: User | null
  accessToken: string | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
  error: string | null
}

interface Credentials {
  email: string
  password: string
}

interface Registration extends Credentials {
  username: string
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'loading',
  error: null,
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

export const refreshSession = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
  'auth/refreshSession',
  async (_, { rejectWithValue }) => {
    try {
      return await refreshAccessToken()
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

export const login = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>('/auth/login', null, {
        method: 'POST',
        body: jsonBody(credentials),
      }, undefined, false)
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

export const register = createAsyncThunk<AuthResponse, Registration, { rejectValue: string }>(
  'auth/register',
  async (registration, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>('/auth/register', null, {
        method: 'POST',
        body: jsonBody(registration),
      }, undefined, false)
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

export const logout = createAsyncThunk<void, void, { state: RootState; rejectValue: string }>(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      await apiRequest<void>('/auth/logout', getState().auth.accessToken, { method: 'POST' })
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    accessTokenUpdated(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
      if (!action.payload) {
        state.user = null
        state.status = 'unauthenticated'
      }
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(refreshSession.rejected, (state) => {
        state.user = null
        state.accessToken = null
        state.status = 'unauthenticated'
      })
      .addCase(login.pending, (state) => {
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? 'Unable to sign in.'
      })
      .addCase(register.pending, (state) => {
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload ?? 'Unable to create your account.'
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.status = 'unauthenticated'
      })
      .addCase(logout.rejected, (state) => {
        state.user = null
        state.accessToken = null
        state.status = 'unauthenticated'
      })
  },
})

export const { accessTokenUpdated, clearAuthError } = authSlice.actions
export default authSlice.reducer
