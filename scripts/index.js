import DisplayRecipes from "./classes/DisplayRecipes.js";
import {recipes} from "../data/recipes.js";
import FilterRecipes from "./classes/FilterRecipes.js";

let tags = []

export const display = new DisplayRecipes()
const filters = new FilterRecipes(recipes, tags)

display.displayRecipes(recipes)
filters.addAndRemoveTagsToFilter(display)
filters.mainInputFilter()
filters.inputFilterForTags()