import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [
      {
        id: 1,
        name: 'Comprar regalo para Juliana',
        completed: false
      },
      {
        id: 2,
        name: 'Buscar la ropa de la lavandería',
        completed: false
      }
    ],
    filter: 'ALL',
    availableFilters: [
      {
        name: 'ALL',
        label: 'Todas'
      },
      {
        name: 'PENDING',
        label: 'Pendientes'
      },
      {
        name: 'COMPLETED',
        label: 'Completadas'
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      console.log(action);
      state.todos.push({
        id: getNextId(state.todos),
        name: action.payload,
        completed: false,
      })
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id != action.payload)
    },
    toggleCompleteTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id == action.payload);
      if(todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
});

export const { addTodo, deleteTodo, toggleCompleteTodo, setFilter } = todoSlice.actions;

function getNextId(todos) {
  const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);
  return maxId + 1;
}