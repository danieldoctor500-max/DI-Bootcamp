import './style.css'
import { RecipeCollection } from './model/RecipeCollection'
import { RecipeTemplate } from './templates/RecipeTemplate'

const collection = new RecipeCollection()
const recipeContainer = document.querySelector<HTMLDivElement>('#recipeContainer')!
const recipeCount = document.querySelector<HTMLElement>('#recipeCount')!
const recipeEntryForm = document.querySelector<HTMLFormElement>('#recipeEntryForm')!
const recipeTitle = document.querySelector<HTMLInputElement>('#recipeTitle')!
const ingredientsInput = document.querySelector<HTMLTextAreaElement>('#ingredients')!
const instructionsInput = document.querySelector<HTMLTextAreaElement>('#instructions')!
const searchInput = document.querySelector<HTMLInputElement>('#recipeSearch')!
const clearRecipesButton = document.querySelector<HTMLButtonElement>('#clearRecipesButton')!
const formMessage = document.querySelector<HTMLElement>('#formMessage')!
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'))

let activeFilter: 'all' | 'favorites' = 'all'

const recipeTemplate = new RecipeTemplate(
  recipeContainer,
  (id) => {
    collection.toggleFavorite(id)
    renderRecipes()
  },
  (id) => {
    collection.removeRecipe(id)
    renderRecipes()
  },
)

function renderRecipes(): void {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase()
  const recipes = collection.getRecipes()
  const visibleRecipes = recipes.filter((recipe) => {
    const matchesFilter = activeFilter === 'all' || recipe.isFavorite
    const searchableText = `${recipe.title} ${recipe.ingredients.join(' ')} ${recipe.instructions}`
      .toLocaleLowerCase()
    return matchesFilter && searchableText.includes(searchTerm)
  })

  recipeTemplate.render(visibleRecipes)
  recipeCount.textContent = `${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`
}

recipeEntryForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const ingredients = ingredientsInput.value
    .split('\n')
    .map((ingredient) => ingredient.trim())
    .filter(Boolean)

  collection.addRecipe(recipeTitle.value.trim(), ingredients, instructionsInput.value.trim())
  recipeEntryForm.reset()
  formMessage.textContent = 'Recipe added to your collection.'
  renderRecipes()
  recipeTitle.focus()
})

searchInput.addEventListener('input', renderRecipes)

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter === 'favorites' ? 'favorites' : 'all'
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute('aria-pressed', String(filterButton === button))
    })
    renderRecipes()
  })
})

clearRecipesButton.addEventListener('click', () => {
  if (collection.getRecipes().length === 0) return
  if (!window.confirm('Clear every recipe in your collection?')) return

  collection.clearRecipes()
  formMessage.textContent = 'Your recipe collection has been cleared.'
  renderRecipes()
})

renderRecipes()