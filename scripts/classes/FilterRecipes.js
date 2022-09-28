export default class FilterRecipes {



  constructor(recipes, ingredients, appliances, ustensils) {
    this.recipes = recipes
    this.ingredients = ingredients
    this.appliances = appliances
    this.ustensils = ustensils
  }

  filterIng() {
    const filteredIng = this.recipes

    this.recipes.forEach((recipe) => {
      console.log("done");
      this.ingredients.forEach((ingTag) => {
        let gotItFlag = false
        recipe.ingredients.forEach((ing) => {
          if (ing.ingredient === ingTag) {
            gotItFlag = true
          }
        })
        if (gotItFlag === false) {
          console.log(filteredIng[this.recipes.indexOf(recipe)]);
        }
      })
    })

    return filteredIng
  }

}