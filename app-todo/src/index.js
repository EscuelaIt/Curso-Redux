import './css/style.css';
import { store } from './redux/store';
import { renderTodos } from './todo-render';
import { renderFilters } from './filter-render';
import './init';
import { startLoading, stopLoading } from './redux/app-slice';

store.subscribe( () => {
  const state = store.getState();
  renderTodos(state);
  renderFilters(state);
  setMessage(state.app.message, state.app.statusMessage);
  if(state.todo.todos.length == 0) {
    setMessage('No hay Todos!')
  }
  setLoading(state.app.loading);
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

function setLoading(loading) {
  const loader = document.getElementById('loader');
  if(loading) {
    loader.classList.add('active');
  } else {
    loader.classList.remove('active');
  }
}

document.getElementById('activarloading').addEventListener('click', function() {
  store.dispatch(startLoading());
  setTimeout(() => store.dispatch(stopLoading()), 5000);
})