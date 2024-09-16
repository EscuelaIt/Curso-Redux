
const initialState = { 
  counter: 0,
  msg: 'Mensaje inicial de la clase 2'
};

export function counterReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'DECREMENT_X':
      return { ...state, counter: state.counter - action.payload };
    case 'SET_MESSAGE':
        return { ...state, msg: action.payload };
    default:
      return state;
  }
}