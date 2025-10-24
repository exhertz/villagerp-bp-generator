import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import '../node_modules/preline/dist/preline.js';

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
