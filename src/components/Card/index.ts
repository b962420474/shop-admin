import card from './index.vue'
import { App } from 'vue-demi'
export default {
  install (app: App) {
    app.component('AppCard', card)
  }
}
