import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DataRequestState, RequestState } from '../types/types'

const initialState: DataRequestState = { requests: {} }

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    requestStarted(state, action: PayloadAction<string>) {
      state.requests[action.payload] = {
        status: 'loading',
        error: null,
        updatedAt: state.requests[action.payload]?.updatedAt ?? null,
      }
    },
    requestSucceeded(state, action: PayloadAction<string>) {
      state.requests[action.payload] = {
        status: 'succeeded',
        error: null,
        updatedAt: Date.now(),
      }
    },
    requestFailed(state, action: PayloadAction<{ key: string; error: string }>) {
      state.requests[action.payload.key] = {
        status: 'failed',
        error: action.payload.error,
        updatedAt: state.requests[action.payload.key]?.updatedAt ?? null,
      }
    },
    clearRequest(state, action: PayloadAction<string>) {
      delete state.requests[action.payload]
    },
  },
})

export const { requestStarted, requestSucceeded, requestFailed, clearRequest } = dataSlice.actions
export type { RequestState }
export default dataSlice.reducer