import Vue from 'vue';
import Axios from "axios";
import App from './App.vue';
import router from "./router/index";
import store from "./store/index";
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';
import * as Sentry from "@sentry/vue";
window.io = require('socket.io-client');
import Echo from "laravel-echo";
import Pusher from 'pusher-js';

import { BrowserTracing } from "@sentry/tracing";
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
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const token = localStorage.getItem('accessToken')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
}
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
            window.Pusher = Pusher;
            const headers = {
              Authorization: "Bearer " + token,
            };
 
            const options = {
                broadcaster: 'pusher',
                key: '38e8644d0a17d0032c7e',
                cluster: "us2",
                authEndpoint : 'https://3.229.169.118/api/broadcasting/auth',
                auth: {
                  headers: headers
              }
            }
            window.Echo = new Echo({
              ...options,
              client: new Pusher(options.key, options),
          });

Sentry.init({
  Vue,
  dsn: "https://c108ea14a6f04c87beacb74fe381585b@o1364868.ingest.sentry.io/6683259",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost:8081", "http://reiopcenter.com.s3-website-us-east-1.amazonaws.com","http://app.reiopcenter.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
