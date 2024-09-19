import './css/style.css';
import { store } from './redux/store';
import { renderTodos } from './todo-render';
import { renderFilters } from './filter-render';
import './init';

store.subscribe( () => {
  const state = store.getState();
  renderTodos(state);
  renderFilters(state);
  setMessage(state.app.message, state.app.statusMessage);
  if(state.todo.todos.length == 0) {
    setMessage('No hay Todos!')
  }
});

function setMessage(msg, status) {
  const messageElement = document.querySelector('footer');
  messageElement.innerText = msg;
  if(status == 'error') {
    messageElement.classList.add('msg_error');
  } else {
    messageElement.classList.remove('msg_error');
  }
}