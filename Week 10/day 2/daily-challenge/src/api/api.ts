import type { RecipeSearchResponse, RecipeSummary } from '../types/types'

const SPOONACULAR_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch'
const SPOONACULAR_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
const MEALDB_URL = 'https://www.themealdb.com/api/json/v1/1/search.php'

export async function searchRecipes(query: string, signal?: AbortSignal): Promise<RecipeSearchResponse> {
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY

  if (apiKey) {
    const url = new URL(SPOONACULAR_URL)
    url.searchParams.set('query', query)
    url.searchParams.set('number', '12')
    const response = await fetch(url, {
      signal,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': SPOONACULAR_HOST,
      },
    })

    if (!response.ok) throw new Error(await getErrorMessage(response))
    const payload: unknown = await response.json()
    return {
      source: 'Spoonacular',
      results: parseSpoonacular(payload),
    }
  }

  const url = new URL(MEALDB_URL)
  url.searchParams.set('s', query)
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Recipe service returned ${response.status}.`)

  const payload: unknown = await response.json()
  return {
    source: 'TheMealDB',
    results: parseMealDb(payload),
  }
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json()
    if (typeof payload === 'object' && payload !== null && 'message' in payload) {
      const message = payload.message
      if (typeof message === 'string') return message
    }
  } catch {
    return `Recipe service returned ${response.status}.`
  }
  return `Recipe service returned ${response.status}.`
}

function parseSpoonacular(payload: unknown): RecipeSummary[] {
  if (typeof payload !== 'object' || payload === null || !('results' in payload)) return []
  if (!Array.isArray(payload.results)) return []

  return payload.results.flatMap((item): RecipeSummary[] => {
    if (typeof item !== 'object' || item === null) return []
    const recipe = item as { id?: unknown; title?: unknown; image?: unknown; sourceUrl?: unknown }
    if (typeof recipe.id !== 'number' || typeof recipe.title !== 'string') return []
    return [{
      id: String(recipe.id),
      title: recipe.title,
      imageUrl: typeof recipe.image === 'string' ? recipe.image : '',
      ...(typeof recipe.sourceUrl === 'string' ? { sourceUrl: recipe.sourceUrl } : {}),
    }]
  })
}

function parseMealDb(payload: unknown): RecipeSummary[] {
  if (typeof payload !== 'object' || payload === null || !('meals' in payload)) return []
  if (!Array.isArray(payload.meals)) return []

  return payload.meals.flatMap((item): RecipeSummary[] => {
    if (typeof item !== 'object' || item === null) return []
    const meal = item as { idMeal?: unknown; strMeal?: unknown; strMealThumb?: unknown; strSource?: unknown }
    if (typeof meal.idMeal !== 'string' || typeof meal.strMeal !== 'string') return []
    return [{
      id: meal.idMeal,
      title: meal.strMeal,
      imageUrl: typeof meal.strMealThumb === 'string' ? meal.strMealThumb : '',
      ...(typeof meal.strSource === 'string' && meal.strSource ? { sourceUrl: meal.strSource } : {}),
    }]
  })
}