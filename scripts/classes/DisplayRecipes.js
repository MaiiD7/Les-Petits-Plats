export default class DisplayRecipes {
  constructor(recipes) {
    this.recipes = recipes;
    this.displayRecipes()
    this.displayTags()
  }

  displayRecipes() {
    const recipesList = document.querySelector('.displayRecipes')
    recipesList.innerHTML = ""

    this.recipes.forEach(recipe => {
      recipesList.appendChild(this.displayOneRecipe(recipe))
      this.displayIng(recipe)
      this.displayApp(recipe)
      this.displayUtils(recipe)
    });
  }

  displayOneRecipe(recipe) {
    const mainCard = document.createElement("div");
    mainCard.classList.add("main-card")
    mainCard.innerHTML = `
      <div class="main-img-container" id="one"></div>

      <div class="recipe-container">
        <div class="title-time-container">
          <h3>${recipe.name}</h3>
          <span id="time"><i class="fa-regular fa-clock"></i> ${recipe.time} min</span>
        </div>
        
        <div class="recipe">
          <div class="ingredientList">
            <ul class="listIng${recipe.id}">
            </ul>
          </div>
          <div class="description">
            <p>${recipe.description}</p>
          </div>
        </div>
      </div>
    `;

    return mainCard
  }

  displayIng(recipe) {
    const listIng = document.querySelector(`.listIng${recipe.id}`)
    const ingTag = document.getElementById('list-ing')
    recipe.ingredients.forEach((ing) => {
      const ingredient = document.createElement("li")
      const ingredientList = document.createElement("li")
      ingredient.innerHTML = `
        <p>
          ${ing.ingredient} 
          <span class="quantity">${ing.quantity ? `: ${ing.quantity}`: ""}</span> 
        </p>
      `
      ingredientList.innerHTML = `${ing.ingredient}`
      ingredientList.setAttribute('id',`${ing.ingredient}`)
      listIng.appendChild(ingredient)
      if (!ingTag.contains(document.getElementById(`${ing.ingredient}`))) {
        ingTag.appendChild(ingredientList)
      }
    })

    if (recipe.ingredients.length > 5) {
      const children = listIng.children
      const fifth = children.item(4)
      const more = document.createElement('p')
      more.innerHTML = `
        + ${recipe.ingredients.length - 4} ingredients
      `
      listIng.insertBefore(more,fifth)
    } 
  }

  displayApp(recipe) {
    const listApp = document.getElementById('list-app')
    const appliance = document.createElement('li')
    appliance.innerHTML = `${recipe.appliance}`
    appliance.setAttribute('id',`${recipe.appliance}`)
    if (!listApp.contains(document.getElementById(`${recipe.appliance}`))) {
      listApp.appendChild(appliance)
    }
  }

  displayUtils(recipe) {
    const listUst = document.getElementById('list-ust')
    recipe.ustensils.forEach((el) => {
      const ustensil = document.createElement('li')
      ustensil.innerHTML = `${el}`
      ustensil.setAttribute('id',`${el}`)
      if (!listUst.contains(document.getElementById(`${el}`))) {
        listUst.appendChild(ustensil)
      }
    })
  }

  displayTags() {
    const tags = document.querySelectorAll('.selector')
    tags.forEach((tag) => {
      let clicked = false;
      tag.addEventListener('click', () => {
        if (!clicked) {
          clicked = this.showTag(tag, clicked)
        }    
      })
      document.addEventListener('click', (e) => {
        if (clicked && !tag.contains(e.target)) {
          clicked = this.hideTag(tag, clicked)
        }
      })
      const clickedTag = document.getElementById(`${tag.id}`)
      const arrowClicked = clickedTag.querySelector('.arrow')
      arrowClicked.addEventListener('click', (e) => {
        if (clicked) {
          e.stopPropagation()
          clicked = this.hideTag(tag, clicked)
        }
      })
    }) 
  }

  showTag(tag, clicked) {
    tag.classList.add('openTag')
    const clickedTag = document.getElementById(`${tag.id}`)
    const p = clickedTag.querySelector('#selectText')
    p.classList.add('hide')
    const ul = clickedTag.querySelector('ul')
    ul.classList.remove('hide')
    const input = clickedTag.querySelector('input')
    input.classList.remove('hide')
    const arrow = clickedTag.querySelector('.arrow')
    arrow.classList.add('rotate-arrow')
    clicked = true

    return clicked
  }

  hideTag(tag, clicked) {
    tag.classList.remove('openTag')
    const clickedTag = document.getElementById(`${tag.id}`)
    const p = clickedTag.querySelector('#selectText')
    p.classList.remove('hide')
    const ul = clickedTag.querySelector('ul')
    ul.classList.add('hide')
    const input = clickedTag.querySelector('input')
    input.classList.add('hide')
    const arrow = clickedTag.querySelector('.arrow')
    arrow.classList.remove('rotate-arrow')
    clicked = false

    return clicked
  }
}