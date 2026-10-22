export interface User {
  id: string
  username: string
  email: string
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
}

export interface StoryComment {
  id: string
  story_id: string
  content: string
  author: Pick<User, 'id' | 'username'>
  created_at: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  expiresIn: string
}
