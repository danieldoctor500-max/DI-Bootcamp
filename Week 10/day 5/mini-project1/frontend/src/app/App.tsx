import { useEffect, useMemo, useState, type FormEvent } from 'react'
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
  deleteStory,
  fetchComments,
  fetchStories,
  findUser,
  removeContributor,
  updateStory,
} from '../features/stories/storiesSlice'

type Theme = 'dark' | 'light'
type StoryFilter = 'all' | 'mine' | 'shared'

function App() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const storiesState = useAppSelector((state) => state.stories)
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('storyweave-theme') === 'light' ? 'light' : 'dark',
  )
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<StoryFilter>('all')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ title: '', content: '' })
  const [comment, setComment] = useState('')
  const [collaboratorEmail, setCollaboratorEmail] = useState('')
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('storyweave-theme', theme)
  }, [theme])

  useEffect(() => {
    void dispatch(refreshSession())
  }, [dispatch])

  useEffect(() => {
    if (auth.status === 'authenticated') void dispatch(fetchStories())
  }, [auth.status, dispatch])

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
    if (selectedId && !selectedStory) setSelectedId(null)
  }, [dispatch, selectedId, selectedStory])

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
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">
            {theme === 'dark' ? '☼' : '☾'}
          </button>
          <button className="button button-quiet signout-button" type="button" onClick={() => { void dispatch(logout()); dispatch(clearStories()); startNewStory() }}>
            Sign out
          </button>
        </div>
      </header>

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
                <textarea id="story-content" className="content-input" value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} maxLength={50000} required placeholder="Once upon a time…" />
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
              </div>
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
                <form className="comment-form" onSubmit={(event) => void submitComment(event)}>
                  <textarea value={comment} onChange={(event) => setComment(event.target.value)} maxLength={2000} rows={2} placeholder="Leave a kind note for the writers…" aria-label="Write a comment" required />
                  <button className="button button-primary" type="submit">Add note</button>
                </form>
                {comments.length === 0 ? <p className="muted comment-empty">No notes yet. Be the first to leave one.</p> : (
                  <div className="comment-list">
                    {comments.map((item) => (
                      <div className="comment" key={item.id}>
                        <span className="avatar small-avatar">{item.author.username.slice(0, 1).toUpperCase()}</span>
                        <div><strong>{item.author.username}</strong><span className="comment-date">{new Date(item.created_at).toLocaleString()}</span><p>{item.content}</p></div>
                      </div>
                    ))}
                  </div>
                )}
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
