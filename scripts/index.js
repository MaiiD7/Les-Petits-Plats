import DisplayRecipes from "./classes/DisplayRecipes.js";
import {recipes} from "../data/recipes.js";

let display = new DisplayRecipes(recipes)

display.displayRecipes()
display.displayTags()