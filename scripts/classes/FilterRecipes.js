import {display} from "./DisplayRecipes.js"
import {recipes} from "../../data/recipes.js";
import { filterRecipesByTags, filterTagListBySearch, filterRecipesBySearch } from "../utils/filterUtils.js";

export default class FilterRecipes {

  constructor(recipes, tags) {
    this.display = display
    this.recipes = recipes
    this.tags = tags
    this.filteredRecipes = recipes
  }

  // Add or remove tags using event listeners and refresh the display
  addAndRemoveTagsToFilter = () => {
    let allTags = document.getElementById('tags').querySelectorAll('li')
    const tagContainer = document.querySelector('.filters')
   
    allTags.forEach((filter) => {
      
      if (this.tags.includes(filter.id)) {
        filter.classList.add('hide')
        console.log(filter.id);
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
  
          this.filteredRecipes = filterRecipesByTags(this.filteredRecipes, this.recipes, this.tags)
          this.display.displayRecipes(this.filteredRecipes)
          this.addAndRemoveTagsToFilter()
          const mainInput = document.getElementById('mainInput')
          filterRecipesBySearch(mainInput.value, this.filteredRecipes)
          
          const tagCloser = tagContainer.querySelectorAll('i')
          tagCloser.forEach((el) => {
            el.addEventListener('click', (e) => {
              e.target.parentNode.remove()
              this.tags = this.tags.filter((tag) => tag !== e.target.previousElementSibling.innerHTML)
              this.filteredRecipes = filterRecipesByTags(this.filteredRecipes, this.recipes, this.tags)
              this.display.displayRecipes(this.filteredRecipes)
              this.addAndRemoveTagsToFilter()
              const mainInput = document.getElementById('mainInput')
              filterRecipesBySearch(mainInput.value, this.filteredRecipes)
            })
          })
        }
      })
    })
  }

  // Filter the recipes using the main search bar
  mainInputFilter = () => {
    const mainInput = document.getElementById('mainInput')
    
    mainInput.addEventListener('input', (e) => {
      filterRecipesBySearch(e.target.value, this.filteredRecipes)
    })
  }

  // Filter the tag filters using the local search bar
  inputFilterForTags = () => {
    const tagInputs = document.querySelectorAll('.tag-input')

    tagInputs.forEach((tagInput) => {
      tagInput.addEventListener('input', (e) => {
        filterTagListBySearch(e.target.value, e.target.parentNode.nextSibling.nextSibling.getElementsByTagName("li"))
      })
    })
  }
}

// Instanciation of the class in a variable and first calls
export let tags = []
const filters = new FilterRecipes(recipes, tags)
filters.addAndRemoveTagsToFilter(display)
filters.mainInputFilter()
filters.inputFilterForTags()