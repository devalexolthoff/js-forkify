export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchform: document.querySelector('.search'),
    searchResultsList: document.querySelector('.results__list'),
    loaderSpace: document.querySelector('.results')
}
export const elementStrings = {
    loader: 'loader'
}
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
                    `;
    parent.insertAdjacentHTML('afterbegin', loader)
};
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader)
};