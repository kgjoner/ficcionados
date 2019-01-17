import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Dashboard from '@/components/admin/Dashboard'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import RecentArticles from '@/components/article/RecentArticles'
import ArticleById from '@/components/article/ArticleById'
import ArticlesByQuery from '@/components/article/ArticlesByQuery'
import Auth from '@/components/auth/Auth'
import About from '@/components/about/About'
import Contact from '@/components/contact/ContactPage'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'board',
    path: '/admin/board',
    component: Dashboard,
    meta: { requiresAdmin: true }
}, {
    name: 'adminPages',
    path: '/admin/edit',
    component: AdminPages,
    meta: { requiresAdmin: true }
},{
    name: 'recentArticles',
    path: '/artigos',
    component: RecentArticles
},{
    name: 'articlesByCategory',
    path: '/categorias/:id',
    component: ArticlesByCategory
}, {
    name: 'admin',
    path: '/admin',
    component: Auth
}, {
    name: 'about',
    path: '/sobre',
    component: About
}, {
    name: 'contact',
    path: '/contato',
    component: Contact
}, {
    name: 'articlesByQuery',
    path: '/busca',
    component: ArticlesByQuery
}, {
    name: 'articleById',
    path: '/artigo/:slug',
    component: ArticleById
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    scrollBehavior (to) {
        // if (savedPosition) {
        //   return savedPosition
        // } else 
        if (to.hash) {
            return {
              selector: to.hash
              // , offset: { x: 0, y: 10 }
            }
        } else {
          return { x: 0, y: 0 }
        }
      }
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    
    //if(to.matched.some(record => record.meta.requiresAdmin)) {
    if(to.meta.requiresAdmin) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/admin' })
    } else {
        next()
    }
})

export default router
