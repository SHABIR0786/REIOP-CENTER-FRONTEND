import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Custom css
import '@/assets/css/bootstrap-select.css'
import '@/assets/css/main.css'
import '@/assets/css/monthpicker.min.css'
import '@/assets/css/properties.css'
import '@/assets/scss/index.scss'



Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
