import DisplayRecipes from "./classes/DisplayRecipes.js";
import {recipes} from "../data/recipes.js";
import FilterRecipes from "./classes/FilterRecipes.js";

let tags = []

const Filters = new FilterRecipes(recipes, tags)
const FilteredRecipes = Filters.filterRecipesByTags()
new DisplayRecipes(FilteredRecipes)

let allTags = document.getElementById('tags').querySelectorAll('li')
const tagContainer = document.querySelector('.filters')
 
allTags.forEach((filter) => {
  filter.addEventListener('click', (e) => {
    if (!tags.includes(e.target.id)) {
      tags.push(e.target.id);
      const Filters = new FilterRecipes(recipes, tags)
      const FilteredRecipes = Filters.filterRecipesByTags()
      new DisplayRecipes(FilteredRecipes)
      
      const tagBox = document.createElement('div')
      tagBox.classList.add('tagBox')
      tagBox.classList.add(`tag${e.target.parentNode.id}`)

      tagBox.innerHTML = `
        <p>${e.target.id}</p>
        <i class="fa-regular fa-circle-xmark"></i>
      `
      tagContainer.appendChild(tagBox)
      const tagCloser = tagContainer.querySelectorAll('i')
      tagCloser.forEach((el) => {
        el.addEventListener('click', (e) => {
          e.target.parentNode.remove()
          tags = tags.filter((tag) => tag !== e.target.previousElementSibling.innerHTML)
          const Filters = new FilterRecipes(recipes, tags)
          const FilteredRecipes = Filters.filterRecipesByTags()
          new DisplayRecipes(FilteredRecipes)
        })
      })
    }
  })
})