<template>
    <div>
        <h1>Your Stats</h1>
        <h2>{{ filmdata.length }} films</h2>
        <!--     <h3>{{ lang.length }} languages</h3> -->
        <h3>Films watched (by release year)</h3>
        <bar :filmdata="filmdata" />
        <h3>Your average rating (by release year)</h3>
        <bar1 :filmdata="filmdata" />
        <bar2 :filmdata="filmdata" />
        <h3>Your favourite decades</h3>
        <decades :filmdata="filmdata" />
    </div>
</template>

<script>
import bar from '../components/bar.vue'
import bar1 from '../components/bar1.vue'
import decades from '../components/decades.vue'
import bar2 from '../components/bar2'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
    },
    components: { bar, bar1, bar2, decades },
    /*   date() {
        return {
            lang: [],
        }
    },*/
    /* created() {
        for (var i = 0; i < this.filmdata.length; i++) {
            if (this.lang.includes(this.filmdata[i].language)) {
                this.lang.push(this.filmdata[i].language)
            }
        }
    },*/
}
</script>

<style></style>
