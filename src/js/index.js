import Search from './models/Search';
import * as SearchView from './views/SearchView';
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