import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import Decade from '../views/Decade.vue'
import bar1 from '../components/bar1.vue'
import bar from '../components/bar.vue'
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
        children: [
            {
                path: '',
                component: bar,
            },
            {
                path: 'ratings',
                component: bar1,
            },
        ],
    },
    {
        path: '/all',
        name: 'All',
        component: AllFilms,
    },
    {
        path: '/:year',
        name: 'Decade',
        component: Decade,
    },
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
})

export default router
