import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToolHeader from './components/ToolHeader.vue'
import './assets/main.css'

createApp(App).use(router).component('ToolHeader', ToolHeader).mount('#app')
