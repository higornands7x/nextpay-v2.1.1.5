import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Chart from 'primevue/chart'
import Dialog from 'primevue/dialog'
import router from './router'
import App from './App.vue'

// Styles
import 'primevue/resources/themes/lara-dark-teal/theme.css'
import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

// Register PrimeVue components
app.component('Toast', Toast)
app.component('Chart', Chart)
app.component('Dialog', Dialog)

app.mount('#app')