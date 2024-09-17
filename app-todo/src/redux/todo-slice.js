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
  },
  reducers: {
    
  }
});