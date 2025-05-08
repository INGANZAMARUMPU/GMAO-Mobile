import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './assets/Router/index'
import Vue3TouchEvents from 'vue3-touch-events'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

const app = createApp(App)
const vfm = createVfm()

app.use(router)
app.use(Vue3TouchEvents)
app.use(vfm)

app.mount('#app')