import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import AllFilms from '../views/AllFilms'
import Film from '../views/Film'

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
    {
        path: '/:id',
        name: 'Film',
        component: Film,
    },
]

const router = new VueRouter({
    routes,
})

export default router
