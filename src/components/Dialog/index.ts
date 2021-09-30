import component from './index.vue'
import { App } from 'vue-demi'
export default {
  install (app: App) {
    app.component('AppDialog', component)
  }
}
