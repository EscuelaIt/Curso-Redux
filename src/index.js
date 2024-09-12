import { increment, setMessage, decrement } from "./redux/app-slice";
import { store } from "./redux/store";

const state = store.getState();
updateDom(state);

store.subscribe(() => {
  const state = store.getState();
  updateDom(state);
});

document.getElementById('increment').addEventListener('click', function() {
  store.dispatch(increment())
});
document.getElementById('decrement').addEventListener('click', function() {
  store.dispatch(decrement(1));
});
document.getElementById('decrement10').addEventListener('click', function() {
  store.dispatch(decrement(10));
});
document.getElementById('sayHello').addEventListener('click', function() {
  store.dispatch(setMessage("Hola Redux"));
});

function updateDom(state) {
  setMsg(state.msg);
  setCounter(state.counter);
}

function setMsg(msg) {
  let msgElement = document.getElementById('msg');
  msgElement.innerText = msg;
}
function setCounter(counter) {
  let counterElement = document.getElementById('counter');
  counterElement.innerText = counter;
}