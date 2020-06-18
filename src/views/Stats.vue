<template>
    <div>
        <h1>Your Stats</h1>
        <h2>{{ filmdata.length }} films</h2>
        <router-link to="/all">
            <p>See all</p>
        </router-link>
        <!--     <h3>{{ lang.length }} languages</h3> -->
        <div class="bars">
            <p
                @click="tabs = false"
                style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: end"
            >
                <router-link to="/stats">
                    <p :class="{ active: !tabs }">Films watched (by release year)</p>
                </router-link>
            </p>

            <div class="vl"></div>
            <p
                @click="tabs = true"
                style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: start"
            >
                <router-link to="/stats/ratings"
                    ><p :class="{ active: tabs }">
                        Your average rating (by release year)
                    </p>
                </router-link>
            </p>
            <router-view class="chart" :filmdata="filmdata" />
        </div>

        <h3>Your ratings</h3>
        <bar2 :filmdata="filmdata" />
        <h3>Your favourite genres</h3>
        <bar3 :filmdata="filmdata" :genres="genres" />
        <h3>Your favourite decades</h3>
        <decades :filmdata="filmdata" v-on:decade="data" />
    </div>
</template>

<script>
import decades from '../components/decades.vue'
import bar2 from '../components/bar2'
import bar3 from '../components/bar3'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
        genres: Array,
    },
    components: { bar2, decades, bar3 },
    data() {
        return {
            decade: null,
            tabs: false,
        }
    },
    methods: {
        data(data) {
            this.decade = data
            this.$emit('decade', this.decade)
        },
    },
    /*   date() {
        return {
            lang: [],
        }
    },*/
}
</script>

<style>
.active {
    color: #f9ed69;
}
.bars {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: auto 5% auto;
    max-width: 80%;
}
.chart {
    grid-column-start: 1;
    grid-column-end: span 3;
    justify-self: center;
}
.vl {
    border-left: 1px solid #f0f5f9;
    height: 20px;
    justify-self: center;
}
</style>
