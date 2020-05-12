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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
