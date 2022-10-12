import { display } from "../index.js"

export default class FilterRecipes {

  constructor(recipes, tags) {
    this.display = display
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

  addAndRemoveTagsToFilter = () => {
    let allTags = document.getElementById('tags').querySelectorAll('li')
    const tagContainer = document.querySelector('.filters')
   
    allTags.forEach((filter) => {
      filter.addEventListener('click', (e) => {
        if (!this.tags.includes(e.target.id)) {
          this.tags.push(e.target.id);
          
          const tagBox = document.createElement('div')
          tagBox.classList.add('tagBox')
          tagBox.classList.add(`tag${e.target.parentNode.id}`)
  
          tagBox.innerHTML = `
            <p>${e.target.id}</p>
            <i class="fa-regular fa-circle-xmark"></i>
          `
          tagContainer.appendChild(tagBox)
  
          const filteredRecipes = this.filterRecipesByTags()
          this.display.displayRecipes(filteredRecipes)
          this.addAndRemoveTagsToFilter()
          
          const tagCloser = tagContainer.querySelectorAll('i')
          tagCloser.forEach((el) => {
            el.addEventListener('click', (e) => {
              e.target.parentNode.remove()
              this.tags = this.tags.filter((tag) => tag !== e.target.previousElementSibling.innerHTML)
              const filteredRecipes = this.filterRecipesByTags()
              this.display.displayRecipes(filteredRecipes)
              this.addAndRemoveTagsToFilter()
            })
          })
        }
      })
    })
  }

  mainInputFilter = () => {
    const mainInput = document.getElementById('mainInput')

    mainInput.addEventListener('input', (e) => {
      this.filterRecipesBySearch(e.target.value, this.recipes)
    })
  }

  inputFilterForTags = () => {
    const tagInputs = document.querySelectorAll('.tag-input')

    tagInputs.forEach((tagInput) => {
      tagInput.addEventListener('input', (e) => {
        this.filterTagListBySearch(e.target.value, e.target.parentNode.nextSibling.nextSibling.getElementsByTagName("li"))
      })
    })
  }

  filterTagListBySearch = (input, list) => {
    Array.from(list).map((el) => {
      el.classList.remove('hide')
      if (!el.innerHTML.toLowerCase().includes(input.toLowerCase())) {
        el.classList.add('hide')
      }
    })
  }

  filterRecipesBySearch = (input, recipes) => {
    recipes.forEach((recipe) => {
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient)
      const appliances = recipe.appliance
      const ustensils = recipe.ustensils
      const description = recipe.description
      const elements = [... ingredients, appliances, ... ustensils, description]
      const lowerElements = elements.map(element => element.toLowerCase())

      const matchingCard = document.getElementById(`${recipe.id}`)
      matchingCard.classList.remove('hide')

      if (!lowerElements.includes(input.toLowerCase()) && !matchingCard.classList.contains('hide')) {
        matchingCard.classList.add('hide')
      }

    })
  }

}