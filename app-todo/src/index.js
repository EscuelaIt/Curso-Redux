import './css/style.css';
import { store } from './redux/store';
import { renderTodos } from './todo-render';
import './init';

store.subscribe( () => {
  const state = store.getState();
  renderTodos(state);
  setMessage(state.app.message);
  if(state.todo.todos.length == 0) {
    setMessage('No hay Todos!')
  }
});

function setMessage(msg) {
  document.querySelector('footer').innerText = msg;
}