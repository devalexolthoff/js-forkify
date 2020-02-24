import Search from './models/Search'

/*
Search object
Current recipe object
shopping list object
linked recipes
*/
const state = {

}
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault()
  controlSearch()
})
const controlSearch = async () => {
  // Get search query
  const query = "pizza"

  if (query) {
    // create search object
    state.search = new Search(query)
  }
  // Prepare UI for what will happen

  //search of recipes
  await state.search.getResults()

  //Display results on UI
  console.log(state.search.result)
}