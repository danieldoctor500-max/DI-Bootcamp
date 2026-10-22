import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CommentReaction, Story, StoryComment, StoryVersion, User } from '@shared/index'
import { apiRequest, jsonBody } from '../../api/client'
import type { RootState } from '../../app/store'
import { accessTokenUpdated } from '../auth/authSlice'

interface StoriesState {
  items: Story[]
  comments: Record<string, StoryComment[]>
  versions: StoryVersion[]
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
  versions: [],
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
      `/comments/${storyId}`,
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
      '/comments',
      { method: 'POST', body: jsonBody({ story_id: storyId, comment_text: content }) },
      getState().auth.accessToken,
      dispatch,
    )
    return { storyId, comment: result.comment }
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const updateComment = createAsyncThunk<
  { storyId: string; comment: StoryComment },
  { storyId: string; commentId: string; commentText: string },
  { state: RootState; rejectValue: string }
>('stories/updateComment', async ({ storyId, commentId, commentText }, { getState, dispatch, rejectWithValue }) => {
  try {
    const result = await authenticatedRequest<{ comment: StoryComment }>(
      `/comments/${commentId}`,
      { method: 'PATCH', body: jsonBody({ comment_text: commentText }) },
      getState().auth.accessToken,
      dispatch,
    )
    return { storyId, comment: result.comment }
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const deleteComment = createAsyncThunk<
  { storyId: string; commentId: string },
  { storyId: string; commentId: string },
  { state: RootState; rejectValue: string }
>('stories/deleteComment', async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    await authenticatedRequest<void>(
      `/comments/${payload.commentId}`,
      { method: 'DELETE' },
      getState().auth.accessToken,
      dispatch,
    )
    return payload
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const toggleReaction = createAsyncThunk<
  { storyId: string; commentId: string; reaction: CommentReaction['reaction']; active: boolean },
  { storyId: string; commentId: string; reaction: CommentReaction['reaction'] },
  { state: RootState; rejectValue: string }
>('stories/toggleReaction', async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    const result = await authenticatedRequest<{ reaction: CommentReaction['reaction']; active: boolean }>(
      `/comments/${payload.commentId}/reactions`,
      { method: 'POST', body: jsonBody({ reaction: payload.reaction }) },
      getState().auth.accessToken,
      dispatch,
    )
    return { ...payload, active: result.active }
  } catch (error) {
    return rejectWithValue(message(error))
  }
})

export const fetchVersions = createAsyncThunk<StoryVersion[], string, { state: RootState; rejectValue: string }>(
  'stories/fetchVersions',
  async (storyId, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ versions: StoryVersion[] }>(
        `/versions/${storyId}`,
        {},
        getState().auth.accessToken,
        dispatch,
      )
      return result.versions
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const restoreVersion = createAsyncThunk<Story, { storyId: string; versionId: string }, { state: RootState; rejectValue: string }>(
  'stories/restoreVersion',
  async ({ storyId, versionId }, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ story: Story }>(
        `/versions/${storyId}/restore`,
        { method: 'POST', body: jsonBody({ version_id: versionId }) },
        getState().auth.accessToken,
        dispatch,
      )
      return result.story
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const createShareLink = createAsyncThunk<string, string, { state: RootState; rejectValue: string }>(
  'stories/createShareLink',
  async (storyId, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ url: string }>(
        `/stories/${storyId}/share`,
        { method: 'POST' },
        getState().auth.accessToken,
        dispatch,
      )
      return result.url
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const toggleComments = createAsyncThunk<Story, { story: Story; enabled: boolean }, { state: RootState; rejectValue: string }>(
  'stories/toggleComments',
  async ({ story, enabled }, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await authenticatedRequest<{ story: Story }>(
        `/stories/${story.id}`,
        { method: 'PATCH', body: jsonBody({ title: story.title, content: story.content, comments_enabled: enabled }) },
        getState().auth.accessToken,
        dispatch,
      )
      return result.story
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

export const fetchPublicShare = createAsyncThunk<Story, string, { rejectValue: string }>(
  'stories/fetchPublicShare',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/share/${token}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.message ?? 'This share link is unavailable.')
      return result.story
    } catch (error) {
      return rejectWithValue(message(error))
    }
  },
)

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
      .addCase(updateComment.fulfilled, (state, action) => {
        const list = state.comments[action.payload.storyId]
        const index = list?.findIndex((comment) => comment.id === action.payload.comment.id) ?? -1
        if (list && index >= 0) list[index] = action.payload.comment
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments[action.payload.storyId] = (state.comments[action.payload.storyId] ?? [])
          .filter((comment) => comment.id !== action.payload.commentId)
      })
      .addCase(toggleReaction.pending, (state, action) => {
        const { storyId, commentId, reaction } = action.meta.arg
        const comment = state.comments[storyId]?.find((item) => item.id === commentId)
        if (comment) applyOptimisticReaction(comment.reactions, reaction)
      })
      .addCase(toggleReaction.fulfilled, (state, action) => {
        const { storyId, commentId, reaction, active } = action.payload
        const reactions = state.comments[storyId]?.find((item) => item.id === commentId)?.reactions
        if (reactions) setReactionState(reactions, reaction, active)
      })
      .addCase(toggleReaction.rejected, (state, action) => {
        const { storyId, commentId, reaction } = action.meta.arg
        const reactions = state.comments[storyId]?.find((item) => item.id === commentId)?.reactions
        if (reactions) applyOptimisticReaction(reactions, reaction)
        state.error = action.payload ?? 'Unable to update reaction.'
      })
      .addCase(fetchVersions.fulfilled, (state, action) => {
        state.versions = action.payload
      })
      .addCase(restoreVersion.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index >= 0) state.items[index] = action.payload
      })
      .addCase(toggleComments.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index >= 0) state.items[index] = action.payload
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

function applyOptimisticReaction(
  reactions: CommentReaction[],
  reaction: CommentReaction['reaction'],
) {
  const current = reactions.find((item) => item.reaction === reaction)
  if (current?.reacted) {
    current.count = Math.max(0, current.count - 1)
    current.reacted = false
  } else if (current) {
    current.count += 1
    current.reacted = true
  } else {
    reactions.push({ reaction, count: 1, reacted: true })
  }
}

function setReactionState(
  reactions: CommentReaction[],
  reaction: CommentReaction['reaction'],
  active: boolean,
) {
  const current = reactions.find((item) => item.reaction === reaction)
  if (current?.reacted === active) return
  if (current) {
    current.count = Math.max(0, current.count + (active ? 1 : -1))
    current.reacted = active
  } else if (active) {
    reactions.push({ reaction, count: 1, reacted: true })
  }
}

export const { clearStories, clearStoryError, replaceStory } = storiesSlice.actions
export default storiesSlice.reducer
