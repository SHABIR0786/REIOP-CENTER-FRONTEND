import Vue from 'vue'
import Axios from "axios"
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Custom css
import '@/assets/css/bootstrap-select.css'
import '@/assets/css/main.css'
import '@/assets/css/monthpicker.min.css'
import '@/assets/css/properties.css'
import '@/assets/scss/index.scss'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)
Vue.use(Vuelidate);

Vue.component('v-select', vSelect)

Vue.prototype.$http = Axios
Vue.prototype.$http.defaults.headers.post['Accept'] = 'application/json'
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const token = localStorage.getItem('accessToken')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
}
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
