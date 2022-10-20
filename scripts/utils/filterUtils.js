// File containing all the functions needed to filter the recipes

// Filter recipes from the main search bar
export const filterRecipesBySearch = (input, recipes) => {

  let allElements = []
  
  recipes.forEach((recipe) => {
    const matchingCard = document.getElementById(`${recipe.id}`)
    matchingCard.classList.remove('hide')

    if (input.length > 2) {
      const title = recipe.name
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient)
      const appliances = recipe.appliance
      const ustensils = recipe.ustensils
      const description = recipe.description
      const elements = [... ingredients, appliances, ... ustensils, description, title]
      const lowerElements = elements.map(element => element.toLowerCase())

      if (!lowerElements.some((el) => el.includes(input.toLowerCase()))) {
        matchingCard.classList.add('hide')
      } else {
        allElements = [...allElements, ...lowerElements]
      }
    }
  })
  
  let allTags = document.getElementById('tags').querySelectorAll('li')
  allTags.forEach((el) => {
    el.classList.remove('hide')

    if (input.length > 2) {
      if (!allElements.includes(el.id.toLowerCase())) {
        el.classList.add('hide')
      }
  }
  })
}

// Filter recipes using the tag filters
export const filterRecipesByTags = (filteredRecipes, recipes, tags) => {
  filteredRecipes = recipes.filter((recipe) => {
    const ingredients = recipe.ingredients.map((ing) => ing.ingredient)
    const appliances = recipe.appliance
    const ustensils = recipe.ustensils
    const elements = [... ingredients, appliances, ... ustensils]
    if (tags.every((ing) => elements.includes(ing))) {
      return recipe
    }
    
  })

  return filteredRecipes
}

// Filter the content of a tag filter using the local search bar
export const filterTagListBySearch = (input, list) => {
  Array.from(list).map((el) => {
    el.classList.remove('hide')
    if (!el.innerHTML.toLowerCase().includes(input.toLowerCase())) {
      el.classList.add('hide')
    }
  })
}