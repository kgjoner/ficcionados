import Vuex from 'vuex'
import BootstrapVue from "bootstrap-vue"
import VueDisqus from 'vue-disqus'
import VueMq from 'vue-mq'
import LazyLoad from '@/directives/lazyLoad'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/global.css'
import '@/assets/css/custom-icon.css'
import '@/assets/css/tabs.css'
import '@/assets/css/accordions.css'
import '@/assets/css/quotes.css'
import '@/assets/css/article.css'

import store from './store'

export default function (Vue, { appOptions, router, head, isClient }) {
  Vue.directive('lazyload', LazyLoad)

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(store)
  
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