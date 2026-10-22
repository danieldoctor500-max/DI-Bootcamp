export interface User {
  id: string
  username: string
  email: string
  avatar_url?: string | null
}

export interface StoryContributor {
  id: string
  contributorId: string
  username: string
}

export interface Story {
  id: string
  title: string
  content: string
  author_id: string
  author: Pick<User, 'id' | 'username'>
  contributors: StoryContributor[]
  created_at: string
  updated_at: string
  comments_enabled: boolean
}

export interface StoryComment {
  id: string
  story_id: string
  comment_text: string
  author: Pick<User, 'id' | 'username'>
  timestamp: string
  reactions: CommentReaction[]
}

export interface CommentReaction {
  reaction: 'heart' | 'laugh' | 'sparkle'
  count: number
  reacted: boolean
}

export interface StoryVersion {
  id: string
  story_id: string
  title: string
  content: string
  created_at: string
  author: Pick<User, 'id' | 'username'>
}

export interface UserProfile extends User {
  avatar_url: string | null
  created_at: string
  authored_stories: Array<{ id: string; title: string; updated_at: string }>
  contributed_stories: Array<{ id: string; title: string; updated_at: string }>
}

export interface AuthResponse {
  user: User
  accessToken: string
  expiresIn: string
}
