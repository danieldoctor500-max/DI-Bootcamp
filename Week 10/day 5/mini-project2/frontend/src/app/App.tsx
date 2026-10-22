import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { io, type Socket } from 'socket.io-client'
import type { Story } from '@shared/index'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  clearAuthError,
  login,
  logout,
  refreshSession,
  register,
} from '../features/auth/authSlice'
import {
  addComment,
  addContributor,
  clearStories,
  clearStoryError,
  createStory,
  createShareLink,
  deleteComment,
  deleteStory,
  fetchComments,
  fetchPublicShare,
  fetchStories,
  fetchVersions,
  findUser,
  replaceStory,
  restoreVersion,
  removeContributor,
  toggleComments,
  toggleReaction,
  updateComment,
  updateStory,
} from '../features/stories/storiesSlice'
import { fetchProfile, uploadAvatar } from '../features/profile/profileSlice'

type Theme = 'dark' | 'light'
type StoryFilter = 'all' | 'mine' | 'shared'

function App() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const storiesState = useAppSelector((state) => state.stories)
  const profileState = useAppSelector((state) => state.profile)
  const socketRef = useRef<Socket | null>(null)
  const ignoreNextLiveUpdate = useRef(false)
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('storyweave-theme') === 'light' ? 'light' : 'dark',
  )
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<StoryFilter>('all')
  const [editing, setEditing] = useState(false)
  const selectedIdRef = useRef(selectedId)
  const editingRef = useRef(editing)
  selectedIdRef.current = selectedId
  editingRef.current = editing
  const [draft, setDraft] = useState({ title: '', content: '' })
  const [comment, setComment] = useState('')
  const [collaboratorEmail, setCollaboratorEmail] = useState('')
  const [actionError, setActionError] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [versionsOpen, setVersionsOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [commentDraft, setCommentDraft] = useState('')
  const [liveCursors, setLiveCursors] = useState<Record<string, { username: string; position: number }>>({})
  const [publicStory, setPublicStory] = useState<Story | null>(null)
  const [shareError, setShareError] = useState('')
  const sharedToken = window.location.pathname.match(/^\/share\/([A-Za-z0-9_-]+)$/)?.[1] ?? null

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('storyweave-theme', theme)
  }, [theme])

  useEffect(() => {
    void dispatch(refreshSession())
  }, [dispatch])

  useEffect(() => {
    if (!sharedToken) return
    void dispatch(fetchPublicShare(sharedToken)).unwrap()
      .then(setPublicStory)
      .catch((error: unknown) => setShareError(error instanceof Error ? error.message : 'This share link is unavailable.'))
  }, [dispatch, sharedToken])

  useEffect(() => {
    if (auth.status === 'authenticated') {
      void dispatch(fetchStories())
      void dispatch(fetchProfile())
    }
  }, [auth.status, dispatch])

  useEffect(() => {
    if (!auth.accessToken) return
    const socket = io(import.meta.env.VITE_API_URL || window.location.origin, {
      auth: { accessToken: auth.accessToken },
      transports: ['websocket'],
    })
    socketRef.current = socket
    socket.on('story:updated', ({ story }: { story: Story }) => {
      dispatch(replaceStory(story))
      if (selectedIdRef.current === story.id && editingRef.current) {
        ignoreNextLiveUpdate.current = true
        setDraft({ title: story.title, content: story.content })
      }
    })
    socket.on('story:cursor', (cursor: { storyId: string; userId: string; username: string; position: number }) => {
      setLiveCursors((current) => ({ ...current, [cursor.userId]: cursor }))
    })
    socket.on('connect_error', (error) => setActionError(error.message))
    return () => {
      socket.disconnect()
      socketRef.current = null
      setLiveCursors({})
    }
  }, [auth.accessToken, dispatch])

  const selectedStory = storiesState.items.find((story) => story.id === selectedId) ?? null
  const visibleStories = useMemo(() => {
    if (!auth.user) return []
    if (filter === 'mine') {
      return storiesState.items.filter((story) => story.author_id === auth.user?.id)
    }
    if (filter === 'shared') {
      return storiesState.items.filter((story) => story.author_id !== auth.user?.id)
    }
    return storiesState.items
  }, [auth.user, filter, storiesState.items])

  useEffect(() => {
    if (selectedId && selectedStory) void dispatch(fetchComments(selectedId))
    if (selectedId && selectedStory?.author_id === auth.user?.id) void dispatch(fetchVersions(selectedId))
    if (selectedId && !selectedStory) setSelectedId(null)
  }, [auth.user?.id, dispatch, selectedId])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket || !selectedId) return
    socket.emit('story:join', { storyId: selectedId })
    return () => {
      socket.emit('story:leave', { storyId: selectedId })
    }
  }, [selectedId, auth.accessToken])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket || !editing || !selectedId || !draft.title.trim() || !draft.content.trim()) return
    if (ignoreNextLiveUpdate.current) {
      ignoreNextLiveUpdate.current = false
      return
    }
    const timeout = window.setTimeout(() => {
      socket.emit('story:edit', {
        storyId: selectedId,
        title: draft.title,
        content: draft.content,
      }, (result: { error?: string }) => {
        if (result?.error) setActionError(result.error)
      })
    }, 650)
    return () => window.clearTimeout(timeout)
  }, [draft, editing, selectedId])

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(clearAuthError())
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')
    try {
      if (authMode === 'register') {
        await dispatch(register({
          username: String(form.get('username') ?? '').trim(),
          email,
          password,
        })).unwrap()
      } else {
        await dispatch(login({ email, password })).unwrap()
      }
    } catch {
      return
    }
  }

  async function submitStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setActionError('')
    try {
      if (editing && selectedStory) {
        await dispatch(updateStory({ storyId: selectedStory.id, draft })).unwrap()
        setEditing(false)
      } else {
        const created = await dispatch(createStory(draft)).unwrap()
        setSelectedId(created.id)
        setEditing(false)
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not save the story.')
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedStory || !comment.trim()) return
    setActionError('')
    try {
      await dispatch(addComment({ storyId: selectedStory.id, content: comment.trim() })).unwrap()
      setComment('')
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not add your comment.')
    }
  }

  async function saveCommentEdit(storyId: string, commentId: string) {
    try {
      await dispatch(updateComment({ storyId, commentId, commentText: commentDraft })).unwrap()
      setEditingComment(null)
      setCommentDraft('')
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not update the comment.')
    }
  }

  async function shareStory(storyId: string) {
    try {
      const url = await dispatch(createShareLink(storyId)).unwrap()
      setShareUrl(url)
      await navigator.clipboard?.writeText(url)
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not create a share link.')
    }
  }

  async function handleAvatarUpload(event: FormEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    if (!file) return
    try {
      await dispatch(uploadAvatar(file)).unwrap()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not upload your avatar.')
    }
  }

  async function handleRestoreVersion(versionId: string) {
    if (!selectedStory || !window.confirm('Restore this version? The current story will be saved as a new version.')) return
    try {
      await dispatch(restoreVersion({ storyId: selectedStory.id, versionId })).unwrap()
      await dispatch(fetchVersions(selectedStory.id))
      setVersionsOpen(false)
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not restore this version.')
    }
  }

  async function inviteCollaborator(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedStory) return
    setActionError('')
    try {
      const user = await dispatch(findUser(collaboratorEmail.trim())).unwrap()
      await dispatch(addContributor({ storyId: selectedStory.id, userId: user.id })).unwrap()
      await dispatch(fetchStories()).unwrap()
      setCollaboratorEmail('')
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not add this collaborator.')
    }
  }

  async function handleDelete(story: Story) {
    if (!window.confirm(`Delete "${story.title}"? This cannot be undone.`)) return
    setActionError('')
    try {
      await dispatch(deleteStory(story.id)).unwrap()
      setSelectedId(null)
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not delete the story.')
    }
  }

  async function handleRemoveContributor(storyId: string, contributorId: string) {
    setActionError('')
    try {
      await dispatch(removeContributor({ storyId, contributorId })).unwrap()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Could not remove the collaborator.')
    }
  }

  function startNewStory() {
    dispatch(clearStoryError())
    setSelectedId(null)
    setDraft({ title: '', content: '' })
    setEditing(false)
    setActionError('')
  }

  function startEditing(story: Story) {
    dispatch(clearStoryError())
    setDraft({ title: story.title, content: story.content })
    setEditing(true)
    setActionError('')
  }

  if (sharedToken) {
    return (
      <main className="shared-story-page">
        {shareError
          ? <section className="shared-card"><span className="brand-mark">S</span><h1>Story unavailable</h1><p>{shareError}</p></section>
          : publicStory
            ? <article className="shared-card"><a className="brand" href="/"><span className="brand-mark">S</span> storyweave</a><p className="eyebrow">A STORY BY {publicStory.author.username.toUpperCase()}</p><h1>{publicStory.title}</h1><div className="reader-content">{publicStory.content}</div><a className="button button-primary" href="/">Write together on StoryWeave ↗</a></article>
            : <main className="loading-screen"><span className="loader" />Opening shared story…</main>}
      </main>
    )
  }

  if (auth.status === 'loading') {
    return <main className="loading-screen"><span className="loader" />Opening your writing desk…</main>
  }

  if (auth.status !== 'authenticated' || !auth.user) {
    return (
      <main className="auth-layout">
        <section className="auth-story">
          <a className="brand" href="#" aria-label="StoryWeave home">
            <span className="brand-mark">S</span> storyweave
          </a>
          <div className="auth-copy">
            <p className="eyebrow">A shared space for stories</p>
            <h1>Good stories grow <em>together.</em></h1>
            <p>Start a story, invite a curious mind, and see where the words take you.</p>
            <div className="quote-card">
              <span className="quote-mark">“</span>
              <p>We write to taste life twice, in the moment and in retrospect.</p>
              <small>Anais Nin</small>
            </div>
          </div>
          <span className="auth-footnote">A little more imagination, every day.</span>
        </section>
        <section className="auth-panel">
          <div className="auth-form-wrap">
            <div className="mobile-brand"><span className="brand-mark">S</span> storyweave</div>
            <p className="eyebrow">{authMode === 'login' ? 'WELCOME BACK' : 'YOUR NEXT CHAPTER'}</p>
            <h2>{authMode === 'login' ? 'Sign in to your desk' : 'Create your account'}</h2>
            <p className="muted">{authMode === 'login' ? 'Pick up where your imagination left off.' : 'A good story starts with a name.'}</p>
            <form className="form-stack" onSubmit={submitAuth}>
              {authMode === 'register' && (
                <label>
                  Your name
                  <input name="username" autoComplete="username" required minLength={3} maxLength={50} placeholder="e.g. Sam Rivera" />
                </label>
              )}
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
              </label>
              <label>
                Password
                <input name="password" type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} required minLength={8} maxLength={128} placeholder="At least 8 characters" />
              </label>
              {auth.error && <p className="inline-error" role="alert">{auth.error}</p>}
              <button className="button button-primary button-wide" type="submit">
                {authMode === 'login' ? 'Sign in' : 'Create account'} <span aria-hidden="true">↗</span>
              </button>
            </form>
            <p className="switch-auth">
              {authMode === 'login' ? 'New to StoryWeave?' : 'Already have an account?'}{' '}
              <button type="button" className="text-button" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); dispatch(clearAuthError()) }}>
                {authMode === 'login' ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </div>
          <button className="theme-toggle auth-theme" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☼ Light mode' : '☾ Dark mode'}
          </button>
        </section>
      </main>
    )
  }

  const isAuthor = Boolean(selectedStory && selectedStory.author_id === auth.user.id)
  const canEdit = Boolean(isAuthor || selectedStory?.contributors.some((person) => person.id === auth.user?.id))
  const comments = selectedStory ? storiesState.comments[selectedStory.id] ?? [] : []

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); startNewStory() }}>
          <span className="brand-mark">S</span><span>storyweave</span>
        </a>
        <div className="topbar-right">
          <span className="welcome-label">Writing as <strong>{auth.user.username}</strong></span>
          <button className="profile-button" type="button" onClick={() => setProfileOpen((open) => !open)} aria-label="Open your profile">
            {profileState.profile?.avatar_url
              ? <img src={profileState.profile.avatar_url} alt="" />
              : auth.user.username.slice(0, 1).toUpperCase()}
          </button>
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">
            {theme === 'dark' ? '☼' : '☾'}
          </button>
          <button className="button button-quiet signout-button" type="button" onClick={() => { void dispatch(logout()); dispatch(clearStories()); startNewStory() }}>
            Sign out
          </button>
        </div>
      </header>
      {profileOpen && (
        <section className="profile-popover" aria-label="Your profile">
          <button className="popover-close" type="button" onClick={() => setProfileOpen(false)} aria-label="Close profile">×</button>
          <p className="eyebrow">YOUR PROFILE</p>
          {profileState.profile?.avatar_url
            ? <img className="profile-avatar" src={profileState.profile.avatar_url} alt={`${auth.user.username}'s avatar`} />
            : <span className="profile-avatar profile-avatar-fallback">{auth.user.username.slice(0, 1).toUpperCase()}</span>}
          <h2>{auth.user.username}</h2>
          <p className="muted">{auth.user.email}</p>
          <label className="button button-outline avatar-upload">
            Upload avatar
            <input type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={handleAvatarUpload} />
          </label>
          {profileState.error && <p className="inline-error">{profileState.error}</p>}
          <div className="profile-stats">
            <strong>{profileState.profile?.authored_stories.length ?? 0}<span>Stories</span></strong>
            <strong>{profileState.profile?.contributed_stories.length ?? 0}<span>Collaborations</span></strong>
          </div>
          <p className="eyebrow profile-list-heading">YOUR STORIES</p>
          {(profileState.profile?.authored_stories ?? []).map((story) => (
            <button className="profile-story" type="button" key={story.id} onClick={() => { setSelectedId(story.id); setProfileOpen(false) }}>{story.title}</button>
          ))}
          {(profileState.profile?.contributed_stories ?? []).map((story) => (
            <button className="profile-story" type="button" key={`shared-${story.id}`} onClick={() => { setSelectedId(story.id); setProfileOpen(false) }}>{story.title} <small>Shared</small></button>
          ))}
        </section>
      )}

      <main className="workspace">
        <aside className="library">
          <div className="library-heading">
            <div>
              <p className="eyebrow">YOUR WRITING DESK</p>
              <h1>Stories <span className="count-badge">{storiesState.items.length}</span></h1>
            </div>
            <button className="icon-button new-button" type="button" onClick={startNewStory} aria-label="Write a new story">+</button>
          </div>
          <button className="button button-primary write-button" type="button" onClick={startNewStory}>
            <span aria-hidden="true">＋</span> Write a story
          </button>
          <div className="filter-tabs" role="tablist" aria-label="Filter stories">
            {(['all', 'mine', 'shared'] as const).map((value) => (
              <button key={value} role="tab" aria-selected={filter === value} className={filter === value ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter(value)}>
                {value === 'all' ? 'All' : value === 'mine' ? 'Mine' : 'Shared'}
              </button>
            ))}
          </div>
          {storiesState.error && <p className="inline-error library-error" role="alert">{storiesState.error}</p>}
          <div className="story-list">
            {storiesState.status === 'loading' && <p className="muted empty-state">Gathering your stories…</p>}
            {storiesState.status === 'ready' && visibleStories.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">✳</span>
                <p>{filter === 'all' ? 'Your first story is waiting.' : 'Nothing here just yet.'}</p>
                <small>Every adventure starts with a first line.</small>
              </div>
            )}
            {visibleStories.map((story) => (
              <button key={story.id} className={`story-card${selectedId === story.id ? ' selected' : ''}`} type="button" onClick={() => { dispatch(clearStoryError()); setSelectedId(story.id); setEditing(false); setActionError('') }}>
                <span className="story-card-top">
                  <span className={`story-dot ${story.author_id === auth.user?.id ? 'own-dot' : 'shared-dot'}`} />
                  <span className="story-date">{new Date(story.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </span>
                <strong>{story.title}</strong>
                <span className="story-excerpt">{story.content}</span>
                <span className="story-card-bottom">
                  <span>{story.author_id === auth.user?.id ? 'By you' : `By ${story.author.username}`}</span>
                  <span>{story.contributors.length > 0 ? `＋ ${story.contributors.length}` : 'Solo story'}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="library-footer"><span className="online-dot" /> Your ideas are saved as you write</div>
        </aside>

        <section className="reading-pane">
          {!selectedStory || editing ? (
            <div className="editor-wrap">
              <div className="editor-heading">
                <p className="eyebrow">{editing ? 'REVISE YOUR DRAFT' : 'A BLANK PAGE, A THOUSAND POSSIBILITIES'}</p>
                <h2>{editing ? 'Keep the story going.' : 'What shall we imagine?'}</h2>
                <p className="muted">{editing ? 'Make your changes, then save this chapter.' : 'Every story begins with a single sentence.'}</p>
              </div>
              <form className="story-editor" onSubmit={submitStory}>
                <label className="title-label" htmlFor="story-title">Story title</label>
                <input id="story-title" className="title-input" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} maxLength={255} required placeholder="Give your story a name…" />
                <label className="title-label content-label" htmlFor="story-content">The story</label>
                <textarea id="story-content" className="content-input" value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} onSelect={(event) => {
                  if (selectedStory) socketRef.current?.emit('story:cursor', { storyId: selectedStory.id, position: event.currentTarget.selectionStart })
                }} maxLength={50000} required placeholder="Once upon a time…" />
                {selectedStory && Object.values(liveCursors).map((cursor) => (
                  <p className="live-cursor" key={cursor.username}>{cursor.username} is writing near character {cursor.position}.</p>
                ))}
                {editing && isAuthor && selectedStory && (
                  <label className="comments-toggle">
                    <input
                      type="checkbox"
                      checked={selectedStory.comments_enabled}
                      onChange={(event) => void dispatch(toggleComments({ story: selectedStory, enabled: event.target.checked }))}
                    />
                    Allow comments on this story
                  </label>
                )}
                {actionError && <p className="inline-error" role="alert">{actionError}</p>}
                {storiesState.error && <p className="inline-error" role="alert">{storiesState.error}</p>}
                <div className="editor-actions">
                  {editing && <button className="button button-quiet" type="button" onClick={() => setEditing(false)}>Cancel</button>}
                  <button className="button button-primary" type="submit">{editing ? 'Save changes' : 'Save story'} <span aria-hidden="true">↗</span></button>
                </div>
              </form>
            </div>
          ) : (
            <article className="reader">
              <div className="reader-topline">
                <span className="eyebrow">A STORY BY {selectedStory.author.username.toUpperCase()}</span>
                <span className="reader-date">Updated {new Date(selectedStory.updated_at).toLocaleDateString()}</span>
              </div>
              <h1 className="reader-title">{selectedStory.title}</h1>
              <div className="reader-meta">
                <span className="avatar">{selectedStory.author.username.slice(0, 1).toUpperCase()}</span>
                <span>{selectedStory.author.username}</span>
                {selectedStory.contributors.map((person) => (
                  <span className="collaborator-chip" key={person.id}>
                    <span className="avatar small-avatar">{person.username.slice(0, 1).toUpperCase()}</span>
                    {person.username}
                    {isAuthor && <button type="button" aria-label={`Remove ${person.username}`} onClick={() => void handleRemoveContributor(selectedStory.id, person.contributorId)}>×</button>}
                  </span>
                ))}
              </div>
              <div className="reader-content">{selectedStory.content}</div>
              <div className="reader-actions">
                {canEdit && <button className="button button-outline" type="button" onClick={() => startEditing(selectedStory)}>Edit story</button>}
                {isAuthor && <button className="button button-danger-quiet" type="button" onClick={() => void handleDelete(selectedStory)}>Delete</button>}
                <button className="button button-outline" type="button" onClick={() => void shareStory(selectedStory.id)}>Share story</button>
                {isAuthor && <button className="button button-quiet" type="button" onClick={() => { setVersionsOpen((open) => !open); if (!versionsOpen) void dispatch(fetchVersions(selectedStory.id)) }}>Version history</button>}
              </div>
              {shareUrl && (
                <div className="share-card">
                  <span>Share link copied</span>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(selectedStory.title)}`} target="_blank" rel="noreferrer">Share on X ↗</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">Facebook ↗</a>
                  <button type="button" className="text-button" onClick={() => setShareUrl('')}>Dismiss</button>
                </div>
              )}
              {versionsOpen && isAuthor && (
                <section className="version-panel">
                  <p className="eyebrow">PAST DRAFTS</p>
                  {storiesState.versions.map((version) => (
                    <div className="version-item" key={version.id}>
                      <div><strong>{version.title}</strong><small>{new Date(version.created_at).toLocaleString()} · {version.author.username}</small></div>
                      <button className="button button-quiet" type="button" onClick={() => void handleRestoreVersion(version.id)}>Restore</button>
                    </div>
                  ))}
                  {storiesState.versions.length === 0 && <p className="muted">No saved versions yet.</p>}
                </section>
              )}
              {isAuthor && (
                <form className="invite-form" onSubmit={(event) => void inviteCollaborator(event)}>
                  <div><p className="eyebrow">GROW THE STORY</p><strong>Invite a collaborator</strong></div>
                  <div className="invite-controls">
                    <input type="email" required value={collaboratorEmail} onChange={(event) => setCollaboratorEmail(event.target.value)} placeholder="writer@example.com" aria-label="Collaborator email" />
                    <button className="button button-outline" type="submit">Invite</button>
                  </div>
                </form>
              )}
              <section className="comments-section">
                <div className="comments-heading"><p className="eyebrow">THE MARGIN</p><h2>Notes & thoughts <span>{comments.length}</span></h2></div>
                {!selectedStory.comments_enabled ? <p className="muted comment-empty">Comments are turned off for this story.</p> : (
                  <form className="comment-form" onSubmit={(event) => void submitComment(event)}>
                    <textarea value={comment} onChange={(event) => setComment(event.target.value)} maxLength={2000} rows={2} placeholder="Leave a kind note for the writers…" aria-label="Write a comment" required />
                    <button className="button button-primary" type="submit">Add note</button>
                  </form>
                )}
                {comments.length === 0 && selectedStory.comments_enabled ? <p className="muted comment-empty">No notes yet. Be the first to leave one.</p> : comments.length > 0 && selectedStory.comments_enabled ? (
                  <div className="comment-list">
                    {comments.map((item) => (
                      <div className="comment" key={item.id}>
                        <span className="avatar small-avatar">{item.author.username.slice(0, 1).toUpperCase()}</span>
                        <div className="comment-body">
                          <strong>{item.author.username}</strong><span className="comment-date">{new Date(item.timestamp).toLocaleString()}</span>
                          {editingComment === item.id
                            ? <><textarea className="comment-edit-input" value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} maxLength={2000} /><div className="comment-tools"><button className="text-button" type="button" onClick={() => void saveCommentEdit(selectedStory.id, item.id)}>Save</button><button className="text-button" type="button" onClick={() => setEditingComment(null)}>Cancel</button></div></>
                            : <p>{item.comment_text}</p>}
                          <div className="comment-tools">
                            {(['heart', 'laugh', 'sparkle'] as const).map((reaction) => {
                              const current = item.reactions.find((entry) => entry.reaction === reaction)
                              return <button className={`reaction-button${current?.reacted ? ' reacted' : ''}`} key={reaction} type="button" onClick={() => void dispatch(toggleReaction({ storyId: selectedStory.id, commentId: item.id, reaction }))}>
                                {{ heart: '♥', laugh: '☺', sparkle: '✦' }[reaction]} {current?.count ?? 0}
                              </button>
                            })}
                            {item.author.id === auth.user?.id && editingComment !== item.id && <button className="text-button" type="button" onClick={() => { setEditingComment(item.id); setCommentDraft(item.comment_text) }}>Edit</button>}
                            {(item.author.id === auth.user?.id || isAuthor) && <button className="text-button danger-text" type="button" onClick={() => void dispatch(deleteComment({ storyId: selectedStory.id, commentId: item.id }))}>Delete</button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
              {actionError && <p className="inline-error action-alert" role="alert">{actionError}</p>}
            </article>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
