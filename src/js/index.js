import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as SearchView from './views/searchView';
import * as RecipeView from './views/recipeView';
import * as ListView from './views/listView';
import {
  elements,
  renderLoader,
  clearLoader,
  elementStrings
} from './views/base';
/*
Search object
Current recipe object
shopping list object
linked recipes
*/
const state = {};


const controlSearch = async () => {
  const query = SearchView.getInput();

  if (query) {
    state.search = new Search(query);

    SearchView.clearInput();
    SearchView.clearResults();
    renderLoader(elements.loaderSpace);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      clearLoader();
      SearchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something wrong with the search...');
      clearLoader();
    }
  }
}

elements.searchform.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.searchResultsList.parentNode.addEventListener('click', e => {
  let button;
  if (`${e.target}`.includes('Span')) {
    button = e.target.parentNode;
  } else if (`${e.target}`.includes('Button')) {
    button = e.target
  }
  if (button) {
    turnPage(button)
  }
});
const turnPage = btn => {
  const goToPage = parseInt(btn.dataset.goto, 10);
  SearchView.clearResults();
  SearchView.renderResults(state.search.result, goToPage);
}

// List Controller

const controlList = ()=>{
  // Create a list if needed 
  if (!state.list) state.list = new List()
  //Add each ingredient to the list
  state.recipe.ingredients.forEach(ing => {
    const item = state.list.addItem(ing.count,ing.unit,ing.ingredient)
    ListView.renderItem(item)
  })
}

elements.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid
  if(e.target.matches('.shopping__delete *')){
    state.list.deleteItem(id)
    ListView.deleteItem(id)
  } else if (e.target.matches('.shopping__count-value')){
    const val = parseFloat(e.target.value)
    state.list.updateCount(id,val)
  }
})

// Recipe Controller

const controlRecipe = async () => {
  const id = window.location.hash.replace('#','');
  if (id){
    // Prep Ui
    RecipeView.clearRecipe()
    renderLoader(elements.recipe)
    if(state.search) SearchView.highlightSelected(id)
    // Create new recipe
    state.recipe = new Recipe(id)
    // Get recipe data
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients()
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render RecipeS
      clearLoader()
      RecipeView.renderRecipe(state.recipe)
    } catch (error) {
      alert('Error processing recipe')
    }
  }
}
// Likes Controller
const controlLike = () => {
  if (!state.likes) state.likes = new Likes()  
  const currentID = state.recipe.id
  // User probably hasn't liked current recipe
  if(!state.likes.isLiked()){
    // Add like  to state
    const newLike = state.likes.addLike(currentID, 
      state.recipe.title, 
      state.recipe.author, 
      state.recipe.img)
    // toggle like button

    // Add liked page to UI list
  }
  // User has liked the current recipe
  else {
  // Remove like from state
    state.likes.deleteLike(currentID)
    // toggle like button

    // Add liked page to UI list
  }
}
// Events 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

// Event Delegation
elements.recipe.addEventListener('click', e =>{
  if (e.target.matches('.btn-decrease *', '.btn-decrease *')){
    // Decrease button clicked
    if (state.recipe.servings > 1){
      state.recipe.updateServings('dec')
      RecipeView.updateServingsIngredients(state.recipe)
    }
    
  } else if (e.target.matches('.btn-increase *', '.btn-increase *')){
    // Decrease button clicked
    state.recipe.updateServings('inc')
    RecipeView.updateServingsIngredients(state.recipe)
  } else if (e.target.matches('.recipe__btn--add *')){
    controlList()
  } else if (e.target.matches('.recipe__love *')){
    // Call like controller
    controlLike()
  }
})

