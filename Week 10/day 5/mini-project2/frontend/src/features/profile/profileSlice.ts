import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { UserProfile } from '@shared/index'
import { apiRequest } from '../../api/client'
import type { RootState } from '../../app/store'
import { accessTokenUpdated } from '../auth/authSlice'

interface ProfileState {
  profile: UserProfile | null
  error: string | null
}

const initialState: ProfileState = { profile: null, error: null }

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

export const fetchProfile = createAsyncThunk<UserProfile, void, { state: RootState; rejectValue: string }>(
  'profile/fetch',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await apiRequest<{ profile: UserProfile }>(
        '/profile/me',
        getState().auth.accessToken,
        {},
        (token) => dispatch(accessTokenUpdated(token)),
      )
      return result.profile
    } catch (error) {
      return rejectWithValue(getMessage(error))
    }
  },
)

export const uploadAvatar = createAsyncThunk<string, File, { state: RootState; rejectValue: string }>(
  'profile/uploadAvatar',
  async (file, { getState, dispatch, rejectWithValue }) => {
    try {
      const data = new FormData()
      data.append('avatar', file)
      const result = await apiRequest<{ user: { avatar_url: string } }>(
        '/profile/me/avatar',
        getState().auth.accessToken,
        { method: 'POST', body: data },
        (token) => dispatch(accessTokenUpdated(token)),
      )
      return result.user.avatar_url
    } catch (error) {
      return rejectWithValue(getMessage(error))
    }
  },
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile() {
      return initialState
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.error = null
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload ?? 'Unable to load your profile.'
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.profile) state.profile.avatar_url = action.payload
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.error = action.payload ?? 'Unable to upload your avatar.'
      })
      .addCase(accessTokenUpdated, (state, action) => {
        return action.payload ? state : initialState
      })
  },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
