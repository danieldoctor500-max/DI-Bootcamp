import { RecipeItem, type RecipeData } from './RecipeItem'

const STORAGE_KEY = 'supper-notes-recipes'

export class RecipeCollection {
  private recipes: RecipeItem[]

  constructor() {
    this.recipes = this.loadRecipes()
  }

  getRecipes(): RecipeItem[] {
    return [...this.recipes]
  }

  addRecipe(title: string, ingredients: string[], instructions: string): RecipeItem {
    const recipe = new RecipeItem(title, ingredients, instructions)
    this.recipes = [recipe, ...this.recipes]
    this.saveRecipes()
    return recipe
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id)
    this.saveRecipes()
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((item) => item.id === id)
    if (!recipe) return

    recipe.isFavorite = !recipe.isFavorite
    this.saveRecipes()
  }

  clearRecipes(): void {
    this.recipes = []
    this.saveRecipes()
  }

  private saveRecipes(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recipes))
    } catch {
      // The in-memory collection remains usable when browser storage is unavailable.
    }
  }

  private loadRecipes(): RecipeItem[] {
    try {
      const storedRecipes: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (!Array.isArray(storedRecipes)) return []

      return storedRecipes.filter(isRecipeData).map((recipe) => RecipeItem.fromData(recipe))
    } catch {
      return []
    }
  }
}

function isRecipeData(value: unknown): value is RecipeData {
  if (typeof value !== 'object' || value === null) return false

  const recipe = value as Partial<RecipeData>
  return (
    typeof recipe.id === 'string' &&
    typeof recipe.title === 'string' &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.every((ingredient) => typeof ingredient === 'string') &&
    typeof recipe.instructions === 'string' &&
    typeof recipe.isFavorite === 'boolean'
  )
}