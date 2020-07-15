import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import AllFilms from '../views/AllFilms'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/stats',
        name: 'Stats',
        component: Stats,
    },
    {
        path: '/:mode/:page',
        name: 'All',
        component: AllFilms,
    },
]

const router = new VueRouter({
    routes,
})

export default router
