<template>
    <div id="page-container">
        <div id="app" class="content-wrap">
            <router-view
                :id="id"
                :api_key="api_key"
                v-on:data="film_data"
                v-on:genres="genres_data"
                :filmdata="filmdata"
                :genres="genres"
            /><br /><br />
        </div>
        <div id="footer">
            <p style="display: inline;  margin-left: 12px; font-size: 90%">Made with Vue.js, amCharts and TMDB API.</p>
            <span style="flex-grow: 4"></span>
            <p style="display: inline;  font-size: 90%">Like what you see?</p>
            <div>
                <gh-btns-star slug="valefras/moviestats"></gh-btns-star>
                <gh-btns-follow user="valefras" />
            </div>
        </div>
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
    },
}
</script>
<style>
@font-face {
    font-family: 'Eastwood';
    src: url('./assets/Eastwood.ttf') format('truetype');
}
@font-face {
    font-family: 'Futura Extra Bold';
    src: url('./assets/Futura Extra Bold.otf') format('opentype');
}
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
* {
    box-sizing: border-box;
}
#app {
    font-family: 'Jost', sans-serif;
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
    font-family: 'Jost', sans-serif;
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
#page-container {
    position: relative;
    min-height: 100vh;
}

.content-wrap {
    padding-bottom: 3rem; /* Footer height */
}

#footer {
    font-family: 'Jost', sans-serif;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3rem;
    background-color: #2d3234;
    color: #999;
    display: flex;
    align-items: center;
}
</style>
