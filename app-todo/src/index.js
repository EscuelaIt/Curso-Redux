import './css/style.css';
import { store } from './redux/store';

const state = store.getState();
console.log(state);