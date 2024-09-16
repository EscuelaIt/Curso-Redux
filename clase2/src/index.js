import { store } from "./redux/store";
import { increment, decrement, setMessage, decrementUnits } from "./redux/actions";

const state = store.getState();
console.log(state);
updateFullState(state);

store.subscribe(() => {
  const state = store.getState();
  updateFullState(state);
})

function setCounter(counter) {
  let counterElement = document.getElementById('counter');
  counterElement.innerText = counter;
}
function setMsg(msg) {
  let msgElement = document.getElementById('msg');
  msgElement.innerText = msg;
}
function updateFullState(state) {
  setMsg(state.msg);
  setCounter(state.counter);
}

document.getElementById('increment').addEventListener('click', function() {
  store.dispatch(increment());
});
document.getElementById('decrement').addEventListener('click', function() {
  store.dispatch(decrement());
});
document.getElementById('decrement10').addEventListener('click', function() {
  store.dispatch(decrementUnits(10));
});
document.getElementById('sayHello').addEventListener('click', function() {
  store.dispatch(setMessage("Hola Redux"));
});