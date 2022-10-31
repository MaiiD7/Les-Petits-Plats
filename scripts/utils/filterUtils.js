import { displayNoResult } from "./displayUtils.js";
// File containing all the functions needed to filter the recipes

// Filter recipes from the main search bar
export const filterRecipesBySearch = (input, recipes) => {

  let allElements = []
  
  for(var i=0; i < recipes.length; i++) {
    const matchingCard = document.getElementById(`${recipes[i].id}`)
    matchingCard.classList.remove('hide')

    if (input.length > 2) {
      const title = recipes[i].name
      let ingredients = []

      for(var k= 0; k < recipes[i].ingredients.length; k++) {
        ingredients.push(recipes[i].ingredients[k].ingredient)
      }

      const appliances = recipes[i].appliance
      const ustensils = recipes[i].ustensils
      const description = recipes[i].description
      const elements = [... ingredients, appliances, ... ustensils, description, title]
      let lowerElements = []

      for(var l =0; l < elements.length; l++) {
        lowerElements.push(elements[l].toLowerCase())
      }

      let includedFlag = false
      let m =0
      while(m < lowerElements.length ){
        if (lowerElements[m].includes(input.toLowerCase())) {
          allElements = [...allElements, ...lowerElements]
          includedFlag = true
        }
        m++
      }

      if (includedFlag === false) {
        matchingCard.classList.add('hide')
      }
    }
  }
  
  let allTags = document.getElementById('tags').querySelectorAll('li')
  for(var j=0; j < allTags.length; j++) {
    allTags[j].classList.remove('hide')

    if (input.length > 2) {
      let ingFlag = false
      let n =0
      while( n < allElements.length) {
        if (allElements[n] === allTags[j].id.toLowerCase()) {
          ingFlag = true
        }
        n++
      }
      if (ingFlag === false) {
        allTags[j].classList.add('hide')
      }
  }
  }

  const recipesList = document.querySelector('.displayRecipes')
  displayNoResult(recipes, recipesList)
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