import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store, key } from '@/store'
import ElementPlus from '@/plugins/element-plus'
import './styles/index.scss'
const modules = import.meta.globEager('./components/*/*index.ts')

const app = createApp(App)
  .use(router)
  .use(store, key)
  .use(ElementPlus)

for (const key in modules) {
  app.use(modules[key].default)
}
app.mount('#app')
