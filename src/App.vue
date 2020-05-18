<template>
    <div id="app">
        <router-view
            :id="id"
            :api_key="api_key"
            v-on:data="film_data"
            :filmdata="filmdata"
        />
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            id: 9274488,
            api_key: '1de39ba8ae7e4330c0da7c4c9cb0adbf',
            filmdata: null,
        }
    },
    methods: {
        film_data(data) {
            this.filmdata = data
        },
    },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
#app {
    font-family: 'DM Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #f0f5f9;
    background-color: #1e2022;
}
</style>
