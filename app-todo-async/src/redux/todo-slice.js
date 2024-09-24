import { createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading, sendFeedback } from "./app-slice";

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
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
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    deleteTodoOnArray: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id != action.payload)
    },
    toggleCompleteTodoReducer: (state, action) => {
      const todo = state.todos.find(todo => todo.id == action.payload);
      if(todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const todoArray = state.todos.map((todo) => todo.id == action.payload.id ? action.payload : todo);
      state.todos = todoArray;
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
});

export const { updateTodo, deleteTodoOnArray, toggleCompleteTodoReducer, setFilter, setTodos } = todoSlice.actions;

function createFetchConfig(method, body) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  }
  if(body) {
    config.body = JSON.stringify(body);
  }
  console.log('config', config);
  return config;
}

export const refreshTodos = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch('https://todolistapi.escuelait.com/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    dispatch(setTodos(json));
  } catch(error) {
    dispatch(sendFeedback('Error en la conexión con el servidor', 'error'));
  }
  dispatch(stopLoading());
}

export const addTodo = (name) => async (dispatch) => {
  dispatch(startLoading());
  const newTodo = {
    name,
    completed: false,
  }
  try {
    const response = await fetch('https://todolistapi.escuelait.com/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo),
    });
    if(response.ok) {
      dispatch(sendFeedback('La tarea ha sido creada'));
      dispatch(refreshTodos());
    } else {
      const json = await response.json();
      console.log(json);
      dispatch(sendFeedback(json.message, 'error'));
      dispatch(stopLoading());
    }
  } catch(error) {
    dispatch(sendFeedback('Error en la conexión con el servidor', 'error'));
    dispatch(stopLoading());
  }

}

export const deleteTodo = (todoId) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch(
      'https://todolistapi.escuelait.com/api/todos/' + todoId, 
      createFetchConfig('DELETE')
    )
    if(response.ok) {
      const json = await response.json();
      dispatch(sendFeedback(json.message));
      dispatch(deleteTodoOnArray(todoId));
    } else {
      dispatch(sendFeedback('No se ha podido borrar...', 'error'));
    }

  } catch(error) {
    dispatch(sendFeedback('Error en la conexión con el servidor', 'error'));
  }
  dispatch(stopLoading());
}

export const toggleCompleteTodo = (todoId) => async (dispatch, getState) => {
  const state = getState();
  const todo = state.todo.todos.find(todo => todo.id == todoId);
  if(!todo) {
    dispatch(sendFeedback('No encuentro esa Todo', 'error'))
  } else {
    dispatch(startLoading());
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    }
    console.log(updatedTodo);
    try {
      const response = await fetch(
        'https://todolistapi.escuelait.com/api/todos/' + todoId, 
        createFetchConfig('PUT', updatedTodo)
      )
      if(response.ok) {
        dispatch(sendFeedback('Se ha actualizado la tarea'));
        //dispatch(toggleCompleteTodoReducer(todoId));ç
        const todo = await response.json();
        dispatch(updateTodo(todo))
      } else {
        dispatch(sendFeedback('Hubo un problema...', 'error'));
      }
    }
    catch(error) {
      dispatch(sendFeedback('Error en la conexión con el servidor', 'error'));
    }
    dispatch(stopLoading());
  }
}