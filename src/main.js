import Vuex from 'vuex'
import BootstrapVue from "bootstrap-vue"
import VueDisqus from 'vue-disqus'
import VueMq from 'vue-mq'
// import DefaultLayout from '@/layouts/Default.vue'
import LazyLoad from '@/directives/lazyLoad'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/custom-icon.css'
import '@/assets/tabs.css'
import '@/assets/accordions.css'
import '@/assets/quotes.css'
import '@/assets/article.css'

import './config/axios'
import ArticleFunctions from '../static/articleFunctions'
import store from './config/store'

export default function (Vue, { appOptions, router, head, isClient }) {
  // Vue.component('Layout', DefaultLayout)
  Vue.directive('lazyload', LazyLoad)

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(store)
  
  Vue.use(ArticleFunctions)
  Vue.use(BootstrapVue)
  Vue.use(VueDisqus)
  if(isClient) {
    Vue.use(VueMq, {
      breakpoints: {
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
      }
    })
  }

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Kaushan+Script|Lato|Philosopher&display=swap'
  })
}