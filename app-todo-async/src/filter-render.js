import { sendFeedback } from "./redux/app-slice";
import { store } from "./redux/store";
import { setFilter } from "./redux/todo-slice";

function filterTemplate(filter, activeFilterName) {
  return `
    <a href="#" class="filteritem ${filter.name == activeFilterName ? 'filterSelected' : ''}" data-id="${filter.name}">${filter.label}</a>
  `
}

export const renderFilters = (state) => {
  const filterElement = document.querySelector('.filters');
  const availableFilters = state.todo.availableFilters;
  const templates = availableFilters.map(filter => filterTemplate(filter, state.todo.filter));
  filterElement.innerHTML = templates.join('');

  createFilterHandlers();
}

function createFilterHandlers() {
  document.querySelectorAll('.filteritem').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const filterName = item.dataset.id;
      store.dispatch(setFilter(filterName));
      store.dispatch(sendFeedback('Se ha activado el filtro ' + filterName));
    })
  })
}
