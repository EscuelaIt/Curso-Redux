import { store } from "./redux/store";
import { sendFeedback } from "./redux/app-slice";
import { deleteTodo, toggleCompleteTodo } from "./redux/todo-slice";

function todoTemplate(todo) {
  return `
    <li class="flex items-center justify-between p-2 pl-0 border-b border-gray-200">
      <span class="checkIcon ${todo.completed ? 'checked' : 'unchecked'}" data-id="${todo.id}">${todo.name}</span>
      <button class="deleteIcon text-red-500 hover:text-red-700" data-id="${todo.id}"><img src="/delete.svg"></button>
    </li>
  `;
}

export function renderTodos(state) {
  const todoListElement = document.querySelector('.todolist');
  let todos = state.todo.todos;
  const filter = state.todo.filter;
  todos = todos.filter(todo => {
    if(filter == 'ALL') {
      return true;
    }
    if(filter == 'PENDING') {
      return ! todo.completed;
    }
    if(filter == 'COMPLETED') {
      return todo.completed;
    }
  });
  if (todos.length > 0) {
    const arrayTemplates = todos.map(todo => todoTemplate(todo));
    todoListElement.innerHTML = arrayTemplates.join('');
  } else {
    todoListElement.innerHTML = '';
  }

  createDeleteHandlers();
  createCheckedHandlers();
}

function createDeleteHandlers() {
  document.querySelectorAll('.deleteIcon').forEach(item => {
    item.addEventListener('click', function () {
      console.log('click en el botón de borrar', item.dataset.id);
      store.dispatch(deleteTodo(item.dataset.id));
      store.dispatch(sendFeedback('Se ha borrado la tarea', 'error'));
    });
  });
}

function createCheckedHandlers() {
  document.querySelectorAll('.checkIcon').forEach(item => {
    item.addEventListener('click', function () {
      console.log('click en el botón de chekear', item.dataset.id);
      store.dispatch(toggleCompleteTodo(item.dataset.id));
      store.dispatch(sendFeedback('Hemos actualizado la tarea ' + item.dataset.id));
    });
  });
}