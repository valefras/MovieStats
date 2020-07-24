<template>
    <div class="home">
        <h1
            class="cnt"
            style=" background-color: #f9ed69;
  background-image: linear-gradient(45deg, #f08a5d, #f9ed69);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent; font-size: 72px"
        >
            MovieStats
        </h1>
        <session v-on:call="call" class="cnt" />
        <getdata :id="id" :api_key="api_key" v-if="show" v-on:data="data" v-on:genres="genres" class="cnt" />
        <div style="margin-top: 24px">
            <p>
                MovieStats allows you to have an always up-to-date stats and data visualization of the movies you <br />
                watched and rated and discover what (statistically) your taste in cinema is like.
            </p>
            <p>In order to use this app all you need is:</p>
            <ul>
                <li>a <a href="https://www.themoviedb.org/" style="text-decoration: underline">TMDB</a> account</li>
                <li>having all the movies you want to generate the stats for rated on TMDB</li>
            </ul>
        </div>
    </div>
</template>

<script>
import session from '@/components/create_session.vue'
import getdata from '../components/get_data.vue'

export default {
    name: 'Home',
    components: {
        session,
        getdata,
    },
    data() {
        return {
            show: false,
        }
    },
    props: {
        id: Number,
        api_key: String,
    },
    methods: {
        call() {
            this.show = true
        },
        data(data) {
            this.$emit('data', data)
        },
        genres(data) {
            this.$emit('genres', data)
        },
    },
}
</script>
<style scoped>
.home {
    margin: 0 auto;
}
</style>
