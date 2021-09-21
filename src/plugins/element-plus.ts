import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { App } from 'vue-demi'
export default {
  install (app:App) {
    app.use(ElementPlus)
  }
}
