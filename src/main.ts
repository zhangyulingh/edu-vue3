import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'
// main.ts
import 'virtual:uno.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
