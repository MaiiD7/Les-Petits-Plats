import { display } from "../index.js"

export default class FilterRecipes {

  constructor(recipes, tags) {
    this.display = display
    this.recipes = recipes
    this.tags = tags
    this.filteredRecipes = recipes
  }

  filterRecipesByTags() {
    this.filteredRecipes = this.recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient)
      const appliances = recipe.appliance
      const ustensils = recipe.ustensils
      const elements = [... ingredients, appliances, ... ustensils]
      if (this.tags.every((ing) => elements.includes(ing))) {
        return recipe
      }
      
    })

    return this.filteredRecipes
  }

  addAndRemoveTagsToFilter = () => {
    let allTags = document.getElementById('tags').querySelectorAll('li')
    const tagContainer = document.querySelector('.filters')
   
    allTags.forEach((filter) => {
      if (this.tags.includes(filter.id)) {
        filter.classList.add('hide')
      }

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
  
          this.filteredRecipes = this.filterRecipesByTags()
          this.display.displayRecipes(this.filteredRecipes)
          this.addAndRemoveTagsToFilter()
          const mainInput = document.getElementById('mainInput')
          this.filterRecipesBySearch(mainInput.value, this.filteredRecipes)

          
          const tagCloser = tagContainer.querySelectorAll('i')
          tagCloser.forEach((el) => {
            el.addEventListener('click', (e) => {
              e.target.parentNode.remove()
              this.tags = this.tags.filter((tag) => tag !== e.target.previousElementSibling.innerHTML)
              this.filteredRecipes = this.filterRecipesByTags()
              this.display.displayRecipes(this.filteredRecipes)
              this.addAndRemoveTagsToFilter()
              const mainInput = document.getElementById('mainInput')
              this.filterRecipesBySearch(mainInput.value, this.filteredRecipes)
            })
          })
        }
      })
    })
  }

  mainInputFilter = () => {
    const mainInput = document.getElementById('mainInput')
    
    mainInput.addEventListener('input', (e) => {
      this.filterRecipesBySearch(e.target.value, this.filteredRecipes)
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

}