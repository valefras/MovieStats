import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import Decade from '../views/Decade.vue'
import AllFilms from '../views/AllFilms'
import Person from '../views/Person'

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
        path: '/all/:page',
        name: 'All',
        component: AllFilms,
    },
    {
        path: '/:year/:page',
        name: 'Decade',
        component: Decade,
    },
    {
        path: '/:name/:page',
        name: 'Person',
        component: Person,
    },
]

const router = new VueRouter({
    routes,
})

export default router
