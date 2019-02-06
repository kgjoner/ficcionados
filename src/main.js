import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'
import '@/assets/custom-icon.css'
import '@/assets/tabs.css'
import '@/assets/accordions.css'
import '@/assets/quotes.css'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import './config/head'
import store from './config/store'
import router from './config/router'

import LazyLoad from './directives/lazyLoad'

Vue.config.productionTip = false

Vue.directive('lazyload', LazyLoad)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')