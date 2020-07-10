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
            v-on:person="person_data"
            :person="person"
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
            person: null,
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
        person_data(data) {
            this.person = data
        },
    },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap');
#app {
    font-family: 'IBM Plex Sans', sans-serif;
    color: #f0f5f9;
    padding-left: 10%;
    padding-right: 10%;
}
h1,
h2 {
    margin-bottom: 6px;
    margin-top: 2px;
}
.sectitle {
    float: left;
}
p {
    margin-bottom: 0;
    margin-top: 0;
}
a {
    text-decoration: none;
    color: #f0f5f9;
}

.cnt {
    text-align: center;
}
.btn {
    border: none;
    background-color: inherit;
    padding: 12px 14px;
    font-size: 17px;
    cursor: pointer;
    display: inline-block;
    color: #f0f5f9;
    font-family: 'IBM Plex Sans', sans-serif;
}

.btn:hover {
    background: #444;
}
.pagination-nav {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 10% 80% 10%;
}
hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em auto;
    padding: 0;
}
</style>
