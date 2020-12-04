<template>
    <div>
        <div id="page-container">
            <div id="rotate">
                <svg
                    style="width: 100%; margin-top: 30%"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#f0f5f9"
                    width="100px"
                    height="100px"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M10.23 1.75c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm3.89 18.73L3.52 9.88c-.39-.39-.39-1.02 0-1.41l4.95-4.95c.39-.39 1.02-.39 1.41 0l10.61 10.61c.39.39.39 1.02 0 1.41l-4.95 4.95c-.39.38-1.03.38-1.42-.01zM17.61 1.4C16.04.57 14.06-.03 11.81.02c-.18 0-.26.22-.14.35l3.48 3.48 1.33-1.33c3.09 1.46 5.34 4.37 5.89 7.86.06.41.44.69.86.62.41-.06.69-.45.62-.86-.6-3.8-2.96-7-6.24-8.74zM8.85 20.16l-1.33 1.33c-3.09-1.46-5.34-4.37-5.89-7.86-.06-.41-.44-.69-.86-.62-.41.06-.69.45-.62.86.6 3.81 2.96 7.01 6.24 8.75 1.57.83 3.55 1.43 5.8 1.38.18 0 .26-.22.14-.35l-3.48-3.49z"
                    />
                </svg>
                <p style="margin-top: 24px">Rotate your device for a better experience.</p>
            </div>
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
                <p style="display: inline;  margin-left: 12px; font-size: 90%">
                    Made with Vue.js, amCharts and TMDB API.
                </p>
                <span style="flex-grow: 4"></span>
                <p style="display: inline;  font-size: 90%">Like what you see?</p>
                <div>
                    <gh-btns-star slug="valefras/moviestats"></gh-btns-star>
                    <gh-btns-follow user="valefras" />
                </div>
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

    destroyed() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('session_id')
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
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;1,400&display=swap');
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
    text-align: left;
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
h4 {
    margin-top: 4px;
    margin-bottom: 4px;
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
    z-index: 1;
}
#sep {
    display: none;
}

@media screen and (max-width: 700px) {
    #app {
        font-family: 'Jost', sans-serif;
        color: #f0f5f9;
        padding-left: 0;
        padding-right: 0;
    }
    .sectitle {
        text-align: center;
    }
    #sep {
        display: block;
    }
}
@media (min-width: 700px) and (max-width: 991px) {
    #app {
        font-family: 'Jost', sans-serif;
        color: #f0f5f9;
        padding-left: 0;
        padding-right: 0;
    }
    .sectitle {
        text-align: center;
    }
    #sep {
        display: block;
    }
}
@media (min-width: 992px) and (max-width: 1199px) {
    #app {
        font-family: 'Jost', sans-serif;
        color: #f0f5f9;
        padding-left: 5%;
        padding-right: 5%;
    }
}
@media (min-width: 1200px) and (max-width: 1300px) {
    #app {
        font-family: 'Jost', sans-serif;
        color: #f0f5f9;
        padding-left: 5%;
        padding-right: 5%;
    }
}
#rotate {
    display: none;
}

/* only when orientation is in portrait mode */
@media all and (orientation: portrait) {
    #rotate {
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        font-family: 'Jost', sans-serif;
        color: #f0f5f9;
        text-align: center;
    }
    #app {
        display: none;
    }
    #footer {
        font-family: 'Jost', sans-serif;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 5rem;
        background-color: #2d3234;
        color: #999;
        display: block;
    }
}
</style>
