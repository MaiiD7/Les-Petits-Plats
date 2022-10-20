import {recipes} from "../../data/recipes.js";
import { displayUtils } from "../utils/displayUtils.js";

// A class to display the results of the filters
export default class DisplayRecipes {

  // Function called to display everything
  displayRecipes(recipes) {
    const recipesList = document.querySelector('.displayRecipes')
    const tags = document.querySelectorAll('.list')

    recipesList.innerHTML = ""
    tags.forEach(tag =>  tag.innerHTML = "")

    // Imported function containing all the functions used for the display
    displayUtils(recipes, recipesList)
  }
}

// Instanciation of the class in a variable and first call
export const display = new DisplayRecipes()
display.displayRecipes(recipes)