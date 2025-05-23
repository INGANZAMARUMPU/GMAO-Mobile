import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './assets/Router/index'
import Vue3TouchEvents from 'vue3-touch-events'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import { QrcodeStream } from 'vue-qrcode-reader'
// import { Store } from 'vuex/dist/vuex.cjs.js'
import store from './assets/store'
import mixins from '../mixins'

const app = createApp(App)
const vfm = createVfm()

app.use(router)
app.use(Vue3TouchEvents)
app.component('QrcodeStream', QrcodeStream)
app.use(vfm)
app.mixin(mixins)
// app.use(Store)
app.use(store)
app.mount('#app')