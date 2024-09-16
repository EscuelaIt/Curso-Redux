import { increment, setMessage, decrement } from "./redux/app-slice";
import { login, logout } from "./redux/user-slice";
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

document.getElementById('loggedcheck').addEventListener('click', function(e) {
  if(e.target.checked) {
    store.dispatch(setMessage('Login realizado'));
    store.dispatch(login());
  } else {
    store.dispatch(setMessage('Has salido de tu cuenta'));
    store.dispatch(logout());
  }
});

function updateDom(state) {
  setMsg(state.app.msg);
  setCounter(state.app.counter);
  setLoggedState(state.user.loggedIn);
}

function setMsg(msg) {
  let msgElement = document.getElementById('msg');
  msgElement.innerText = msg;
}
function setCounter(counter) {
  let counterElement = document.getElementById('counter');
  counterElement.innerText = counter;
}

function setLoggedState(loggedIn) {
  const appElement = document.getElementById('app');
  if(loggedIn) {
    appElement.classList.remove('hidden');
  } else {
    appElement.classList.add('hidden');
  }
}