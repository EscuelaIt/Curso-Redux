import { increment } from "./redux/app-slice";
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