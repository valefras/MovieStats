<template>
    <div>
        <h1>My Stats</h1>
        <h3>{{ filmdata.length }} films</h3>
        <h3>{{ lang.length }} languages</h3>
        <bar :filmdata="filmdata" />
        <bar1 :filmdata="filmdata" />
    </div>
</template>

<script>
import bar from '../components/bar.vue'
import bar1 from '../components/bar1.vue'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
    },
    components: { bar, bar1 },
    date() {
        return {
            lang: [],
        }
    },
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
