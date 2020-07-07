<template>
    <div id="app">
        <router-view
            :id="id"
            :api_key="api_key"
            v-on:data="film_data"
            v-on:genres="genres_data"
            :filmdata="filmdata"
            v-on:decade="decade_data"
            :decade="decade"
            :genres="genres"
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
            genres: null,
            decade: null,
        }
    },
    methods: {
        film_data(data) {
            this.filmdata = data
        },
        genres_data(data) {
            this.genres = data
        },
        decade_data(data) {
            this.decade = data
        },
    },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
#app {
    font-family: 'DM Mono', monospace;
    text-align: center;
    color: #f0f5f9;
}
h1 {
    margin-bottom: 0;
}
a {
    text-decoration: none;
    color: #f0f5f9;
}
.btn {
    border: none;
    background-color: inherit;
    padding: 12px 14px;
    font-size: 17px;
    cursor: pointer;
    display: inline-block;
    color: #f0f5f9;
    font-family: 'DM Mono', monospace;
}

.btn:hover {
    background: #444;
}
</style>
