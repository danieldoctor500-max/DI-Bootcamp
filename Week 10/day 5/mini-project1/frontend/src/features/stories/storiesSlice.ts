import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Story, StoryComment, User } from '@shared/index'
import { apiRequest, jsonBody } from '../../api/client'
import type { RootState } from '../../app/store'
import { accessTokenUpdated } from '../auth/authSlice'

interface StoriesState {
  items: Story[]
  comments: Record<string, StoryComment[]>
  status: 'idle' | 'loading' | 'ready'
  error: string | null
}

interface StoryDraft {
  title: string
  content: string
}

interface StoryRequest {
  storyId: string
  draft: StoryDraft
}

const initialState: StoriesState = {
  items: [],
  comments: {},
  status: 'idle',
  error: null,
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

async function authenticatedRequest<T>(
  path: string,
  init: RequestInit,
  accessToken: string | null,
  dispatch: (action: ReturnType<typeof accessTokenUpdated>) => unknown,
): Promise<T> {
  return apiRequest<T>(path, accessToken, init, (token) => {
    dispatch(accessTokenUpdated(token))
  })
}

export const fetchStories = createAsyncThunk<Story[], void, { state: RootState; rejectValue: string }>(
  'stories/fetch',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ stories: Story[] }>(
        '/stories',
        {},
        getState().auth.accessToken,
        dispatch,
      )
      return result.stories
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const createStory = createAsyncThunk<Story, StoryDraft, { state: RootState; rejectValue: string }>(
  'stories/create',
  async (draft, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ story: Story }>(
        '/stories',
        { method: 'POST', body: jsonBody(draft) },
        getState().auth.accessToken,
        dispatch,
      )
      return result.story
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const updateStory = createAsyncThunk<Story, StoryRequest, { state: RootState; rejectValue: string }>(
  'stories/update',
  async ({ storyId, draft }, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ story: Story }>(
        `/stories/${storyId}`,
        { method: 'PATCH', body: jsonBody(draft) },
        getState().auth.accessToken,
        dispatch,
      )
      return result.story
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const deleteStory = createAsyncThunk<string, string, { state: RootState; rejectValue: string }>(
  'stories/delete',
  async (storyId, { getState, dispatch, rejectWithValue }) => {
    try {
      await authenticatedRequest<void>(
        `/stories/${storyId}`,
        { method: 'DELETE' },
        getState().auth.accessToken,
        dispatch,
      )
      return storyId
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const fetchComments = createAsyncThunk<
  { storyId: string; comments: StoryComment[] },
  string,
  { state: RootState; rejectValue: string }
>('stories/fetchComments', async (storyId, { getState, dispatch, rejectWithValue }) => {
  try {
    const result = await authenticatedRequest<{ comments: StoryComment[] }>(
      `/stories/${storyId}/comments`,
      {},
      getState().auth.accessToken,
      dispatch,
    )
    return { storyId, comments: result.comments }
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const addComment = createAsyncThunk<
  { storyId: string; comment: StoryComment },
  { storyId: string; content: string },
  { state: RootState; rejectValue: string }
>('stories/addComment', async ({ storyId, content }, { getState, dispatch, rejectWithValue }) => {
  try {
    const result = await authenticatedRequest<{ comment: StoryComment }>(
      `/stories/${storyId}/comments`,
      { method: 'POST', body: jsonBody({ content }) },
      getState().auth.accessToken,
      dispatch,
    )
    return { storyId, comment: result.comment }
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const findUser = createAsyncThunk<User, string, { state: RootState; rejectValue: string }>(
  'stories/findUser',
  async (email, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ user: User }>(
        `/users?email=${encodeURIComponent(email)}`,
        {},
        getState().auth.accessToken,
        dispatch,
      )
      return result.user
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const addContributor = createAsyncThunk<
  void,
  { storyId: string; userId: string },
  { state: RootState; rejectValue: string }
>('stories/addContributor', async ({ storyId, userId }, { getState, dispatch, rejectWithValue }) => {
  try {
    await authenticatedRequest(
      '/contributors',
      { method: 'POST', body: jsonBody({ story_id: storyId, user_id: userId }) },
      getState().auth.accessToken,
      dispatch,
    )
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const removeContributor = createAsyncThunk<
  { storyId: string; contributorId: string },
  { storyId: string; contributorId: string },
  { state: RootState; rejectValue: string }
>('stories/removeContributor', async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    await authenticatedRequest<void>(
      `/contributors/${payload.contributorId}`,
      { method: 'DELETE' },
      getState().auth.accessToken,
      dispatch,
    )
    return payload
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    clearStoryError(state) {
      state.error = null
    },
    clearStories() {
      return initialState
    },
    replaceStory(state, action: PayloadAction<Story>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index >= 0) state.items[index] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(accessTokenUpdated, (state, action) => {
        return action.payload ? state : initialState
      })
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'ready'
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'ready'
        state.error = action.payload ?? 'Unable to load stories.'
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index >= 0) state.items[index] = action.payload
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.items = state.items.filter((story) => story.id !== action.payload)
        delete state.comments[action.payload]
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments[action.payload.storyId] = action.payload.comments
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments[action.payload.storyId] ??= []
        state.comments[action.payload.storyId].push(action.payload.comment)
      })
      .addCase(removeContributor.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload.storyId)
        if (story) {
          story.contributors = story.contributors.filter(
            (contributor) => contributor.contributorId !== action.payload.contributorId,
          )
        }
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('stories/') &&
          action.type.endsWith('/rejected') &&
          action.type !== fetchStories.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.error = action.payload ?? 'The operation could not be completed.'
        },
      )
  },
})

export const { clearStories, clearStoryError, replaceStory } = storiesSlice.actions
export default storiesSlice.reducer
