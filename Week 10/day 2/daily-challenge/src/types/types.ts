export interface RecipeSummary {
  id: string
  title: string
  imageUrl: string
  sourceUrl?: string
}

export interface RecipeSearchResponse {
  results: RecipeSummary[]
  source: 'Spoonacular' | 'TheMealDB'
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface RequestState {
  status: RequestStatus
  error: string | null
  updatedAt: number | null
}

export interface DataRequestState {
  requests: Record<string, RequestState>
}