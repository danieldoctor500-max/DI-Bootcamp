import type { RecipeItem } from '../model/RecipeItem'

export class RecipeTemplate {
  private readonly container: HTMLElement
  private readonly onToggleFavorite: (id: string) => void
  private readonly onDelete: (id: string) => void

  constructor(
    container: HTMLElement,
    onToggleFavorite: (id: string) => void,
    onDelete: (id: string) => void,
  ) {
    this.container = container
    this.onToggleFavorite = onToggleFavorite
    this.onDelete = onDelete
  }

  render(recipes: RecipeItem[]): void {
    this.container.replaceChildren()

    if (recipes.length === 0) {
      const emptyState = document.createElement('div')
      emptyState.className = 'empty-state'
      emptyState.innerHTML = '<span class="empty-mark" aria-hidden="true">R</span>'
      const title = document.createElement('h3')
      title.textContent = 'Nothing simmering yet'
      const message = document.createElement('p')
      message.textContent = 'Add a recipe or adjust your search to find what you need.'
      emptyState.append(title, message)
      this.container.append(emptyState)
      return
    }

    const fragment = document.createDocumentFragment()
    recipes.forEach((recipe, index) => fragment.append(this.createRecipeCard(recipe, index)))
    this.container.append(fragment)
  }

  private createRecipeCard(recipe: RecipeItem, index: number): HTMLElement {
    const card = document.createElement('article')
    card.className = 'recipe-card'
    card.style.setProperty('--card-index', String(index))

    const top = document.createElement('div')
    top.className = 'recipe-card-top'
    const heading = document.createElement('h3')
    heading.textContent = recipe.title

    const favoriteButton = document.createElement('button')
    favoriteButton.type = 'button'
    favoriteButton.className = `favorite-button${recipe.isFavorite ? ' is-favorite' : ''}`
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite))
    favoriteButton.setAttribute(
      'aria-label',
      `${recipe.isFavorite ? 'Remove' : 'Add'} ${recipe.title} ${recipe.isFavorite ? 'from' : 'to'} favorites`,
    )
    favoriteButton.innerHTML = `<span aria-hidden="true">${recipe.isFavorite ? '★' : '☆'}</span>`
    favoriteButton.addEventListener('click', () => this.onToggleFavorite(recipe.id))
    top.append(heading, favoriteButton)

    const ingredientSummary = document.createElement('p')
    ingredientSummary.className = 'ingredient-summary'
    ingredientSummary.textContent = `${recipe.ingredients.length} ${recipe.ingredients.length === 1 ? 'ingredient' : 'ingredients'}`

    const details = document.createElement('details')
    details.className = 'recipe-details'
    const summary = document.createElement('summary')
    summary.textContent = 'View recipe'

    const detailsContent = document.createElement('div')
    detailsContent.className = 'details-content'
    const ingredientsHeading = document.createElement('h4')
    ingredientsHeading.textContent = 'Ingredients'
    const ingredientList = document.createElement('ul')
    recipe.ingredients.forEach((ingredient) => {
      const item = document.createElement('li')
      item.textContent = ingredient
      ingredientList.append(item)
    })
    const instructionsHeading = document.createElement('h4')
    instructionsHeading.textContent = 'Instructions'
    const instructions = document.createElement('p')
    instructions.className = 'instructions'
    instructions.textContent = recipe.instructions
    detailsContent.append(ingredientsHeading, ingredientList, instructionsHeading, instructions)
    details.append(summary, detailsContent)

    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.className = 'delete-button'
    deleteButton.textContent = 'Delete recipe'
    deleteButton.setAttribute('aria-label', `Delete ${recipe.title}`)
    deleteButton.addEventListener('click', () => this.onDelete(recipe.id))

    card.append(top, ingredientSummary, details, deleteButton)
    return card
  }
}