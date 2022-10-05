export default class FilterRecipes {

  constructor(recipes, tags) {
    this.recipes = recipes
    this.tags = tags
  }

  filterRecipesByTags() {
    const filteredRecipes = this.recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient)
      const appliances = recipe.appliance
      const ustensils = recipe.ustensils
      const elements = [... ingredients, appliances, ... ustensils]
      if (this.tags.every((ing) => elements.includes(ing))) {
        return recipe
      }
      
    })

    return filteredRecipes
  }

}