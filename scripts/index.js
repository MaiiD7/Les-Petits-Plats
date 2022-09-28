import DisplayRecipes from "./classes/DisplayRecipes.js";
import {recipes} from "../data/recipes.js";
import FilterRecipes from "./classes/FilterRecipes.js";

let ingredients = []
let appliances = []
let ustensils = []

const Filters = new FilterRecipes(recipes,ingredients,appliances,ustensils)

const FilteredRecipes = Filters.filterIng()
new DisplayRecipes(FilteredRecipes)