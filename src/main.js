import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Bars from 'vuebars'
import StarRating from 'vue-star-rating'

Vue.use(StarRating)

Vue.use(Bars)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
