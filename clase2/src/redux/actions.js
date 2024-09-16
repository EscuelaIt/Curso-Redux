// Action creators para el contador
export const increment = () => {
  return {
    type: 'INCREMENT'
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT'
  };
};

export const decrementUnits = ( x ) => {
  return {
    type: 'DECREMENT_X',
    payload: x
  };
};

export const setMessage = ( message ) => {
  return {
    type: 'SET_MESSAGE',
    payload: message
  };
};