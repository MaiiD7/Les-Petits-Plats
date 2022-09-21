export default class DisplayRecipes {
  constructor(recipes) {
    this.recipes = recipes;
  }

  displayRecipes() {
    const recipesList = document.querySelector('.displayRecipes');
    recipesList.innerHTML = ""
    this.recipes.forEach(recipe => {
      recipesList.appendChild(this.displayOneRecipe(recipe))
      this.displayIng(recipe)
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

  displayTags() {
    const tags = document.querySelectorAll('.selector')
    tags.forEach((tag) => {
      let clicked = false;
      tag.addEventListener('click', (e) => {
        e.stopPropagation()
        tag.classList.add('openTag')
        if (!clicked) {
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
        }    
      })
      document.addEventListener('click', () => {
        if (clicked) {
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
        }
      })
      const clickedTag = document.getElementById(`${tag.id}`)
      const arrowClicked = clickedTag.querySelector('.arrow')
      arrowClicked.addEventListener('click', (e) => {
        if (clicked) {
          e.stopPropagation()
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
        }
      })
    }) 
  }
}