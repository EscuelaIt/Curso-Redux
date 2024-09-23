import { renderFilters } from './filter-render';
import { sendFeedback } from './redux/app-slice';
import { store } from './redux/store';
import { addTodo, refreshTodos } from './redux/todo-slice';
import { renderTodos } from './todo-render';

document.addEventListener('DOMContentLoaded', function() {
  const state = store.getState();
  renderTodos(state);
  renderFilters(state);
  store.dispatch(refreshTodos());

  document.getElementById('createForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoNameElement = document.getElementById('todoName')
    store.dispatch(addTodo(todoNameElement.value));
    todoNameElement.value = '';
    store.dispatch(sendFeedback('Se ha creado una tarea'));
  });
});