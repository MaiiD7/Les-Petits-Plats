// File containing all the functions needed to display the filtered recipes

// Function using all of the others, exported to be called in DisplayRecipes class
export const displayUtils = (recipes, recipesList) => {
  recipes.forEach((recipe) => {
    recipesList.appendChild(displayOneRecipe(recipe))
    displayIng(recipe)
    displayApp(recipe)
    displayUtstensils(recipe)
    displayTags()
  })
  displayNoResult(recipes, recipesList)
}  

// Creates the card to be displayed for one recipe
const displayOneRecipe = (recipe) => {
  const mainCard = document.createElement("div");
  mainCard.classList.add("main-card")
  mainCard.setAttribute('id', `${recipe.id}`)
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

// Display the message if no matching recipe is found
export const displayNoResult = (recipes, recipesList) => {
  if (recipes.every((recipe) => isHidden(recipe))) {
    let noResults = document.getElementsByClassName('noResults')

    if (noResults.length > 0) {
      noResults.innerHTML = ""
    } else {
      noResults = document.createElement("div")
      noResults.classList.add('noResults')
      recipesList.appendChild(noResults)
    }
    
    noResults.innerHTML = `
      <p> Aucune recette ne correspond à vos critères … Vous pouvez chercher «tarte aux pommes», «poisson» ... </p>
    `

  }
}

// Check if recipe is visible or not
const isHidden = (recipe) => {
  const recipeCard = document.getElementById(`${recipe.id}`)
  return (recipeCard.classList.contains('hide'))
}

// Adds the ingredients to both the card and the ingredient tag filter
const displayIng = (recipe) => {
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

// Adds the appliance to the appliance tag filter
const displayApp = (recipe) => {
  const listApp = document.getElementById('list-app')
  const appliance = document.createElement('li')
  appliance.innerHTML = `${recipe.appliance}`
  appliance.setAttribute('id',`${recipe.appliance}`)
  if (!listApp.contains(document.getElementById(`${recipe.appliance}`))) {
    listApp.appendChild(appliance)
  }
}

// Adds the ustensils to the ustensils tag filter
const displayUtstensils = (recipe) => {
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

// Manages the opening and closing of the tag filters
const displayTags = () => {
  const tags = document.querySelectorAll('.selector')
  tags.forEach((tag) => {
    let clicked = false;
    tag.addEventListener('click', () => {
      if (!clicked) {
        clicked = showTag(tag, clicked)
      }    
    })
    document.addEventListener('click', (e) => {
      if (clicked && !tag.contains(e.target)) {
        clicked = hideTag(tag, clicked)
      }
    })
    const clickedTag = document.getElementById(`${tag.id}`)
    const arrowClicked = clickedTag.querySelector('.arrow')
    arrowClicked.addEventListener('click', (e) => {
      if (clicked) {
        e.stopPropagation()
        clicked = hideTag(tag, clicked)
      }
    })
  })
}

// Open the tag filter
const showTag = (tag, clicked)=> {
  tag.classList.add('openTag')
  const clickedTag = document.getElementById(`${tag.id}`)
  const p = clickedTag.querySelector('.selectText')
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

// Close the tag filter
const hideTag = (tag, clicked) => {
  tag.classList.remove('openTag')
  const clickedTag = document.getElementById(`${tag.id}`)
  const p = clickedTag.querySelector('.selectText')
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