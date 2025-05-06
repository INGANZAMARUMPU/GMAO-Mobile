import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './assets/Router/index'
import Vue3TouchEvents from 'vue3-touch-events'

createApp(App)
.use(router)
.use(Vue3TouchEvents)
.mount('#app')
