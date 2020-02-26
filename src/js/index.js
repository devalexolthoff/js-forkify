import Search from './models/Search';
import * as SearchView from './views/searchView';
import {
  elements,
  renderLoader,
  clearLoader
} from './views/base';
/*
Search object
Current recipe object
shopping list object
linked recipes
*/
const state = {

}
elements.searchform.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
})
const controlSearch = async () => {
  // Get search query
  const query = SearchView.getInput();

  if (query) {
    // create search object
    state.search = new Search(query)
  }
  // Prepare UI for what will happen
  SearchView.clearInput();
  SearchView.clearResults();
  renderLoader(elements.loaderSpace);
  //search of recipes
  await state.search.getResults();
  //Display results on UI
  clearLoader()
  SearchView.renderResults(state.search.result);
}