import { store } from "./redux/store";

console.log('hola');

const state = store.getState();
console.log(state);
setMsg(state.msg)




function setMsg(msg) {
  let msgElement = document.getElementById('msg');
  msgElement.innerText = msg;
}