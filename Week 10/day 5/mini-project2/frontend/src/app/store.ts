import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import storiesReducer from '../features/stories/storiesSlice'
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storiesReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
