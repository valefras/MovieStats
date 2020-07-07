<template>
    <div>
        <h1>Your Stats</h1>
        <h2>{{ storedFilms.length }} films</h2>
        <router-link
            :to="{
                name: 'All',
                path: 'all/:page',
                params: { page: 1 },
            }"
        >
            <button class="btn">See all</button>
        </router-link>

        <div class="bars">
            <p
                @click="tabs = false"
                style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: end"
            >
                <router-link to="/stats">
                    <p :class="{ active: !tabs }">Films (by release year)</p>
                </router-link>
            </p>

            <div class="vl"></div>
            <p
                @click="tabs = true"
                style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: start"
            >
                <router-link to="/stats/ratings"
                    ><p :class="{ active: tabs }">
                        Average rating (by release year)
                    </p>
                </router-link>
            </p>
            <router-view class="chart" :filmdata="storedFilms" />
        </div>

        <h2>Ratings</h2>
        <bar2 :filmdata="storedFilms" />

        <h2>Genres</h2>
        <bar3 :filmdata="storedFilms" :genres="storedGenres" />

        <h2>Decades</h2>
        <decades :filmdata="storedFilms" v-on:decade="data" />

        <h2>People</h2>
        <people :storedFilms="storedFilms" />

        <collections :collections="collections" />
    </div>
</template>

<script>
import decades from '../components/decades.vue'
import bar2 from '../components/bar2'
import bar3 from '../components/bar3'
import people from '../components/people'
import collections from '../components/collections'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
        genres: Array,
    },
    components: { bar2, decades, bar3, people, collections },
    data() {
        return {
            decade: null,
            tabs: false,
            storedFilms: null,
            storedGenres: null,
            collections: [],
        }
    },
    methods: {
        data(data) {
            this.decade = data
            this.$emit('decade', this.decade)
        },
        save() {
            if (this.filmdata && localStorage.getItem('filmdata') && this.filmdata.length != 0) {
                if (JSON.parse(localStorage.getItem('filmdata')).length != this.filmdata.length) {
                    localStorage.setItem('filmdata', JSON.stringify(this.filmdata))
                    localStorage.setItem('genres', JSON.stringify(this.genres))
                }
                this.storedFilms = this.filmdata
                this.storedGenres = this.genres
            } else if (this.filmdata && !localStorage.getItem('filmdata')) {
                this.storedFilms = this.filmdata
                this.storedGenres = this.genres
                localStorage.setItem('filmdata', JSON.stringify(this.filmdata))
                localStorage.setItem('genres', JSON.stringify(this.genres))
            } else {
                this.storedFilms = JSON.parse(localStorage.getItem('filmdata'))
                this.storedGenres = JSON.parse(localStorage.getItem('genres'))
            }
        },
    },
    created() {
        this.save()
        if (this.$route.path == '/stats') {
            this.tabs = false
        } else if (this.$route.path == '/stats/ratings') {
            this.tabs = true
        }
        for (let i = 0; i < this.storedFilms.length; i++) {
            if (this.storedFilms[i].collection) {
                this.collections.push(this.storedFilms[i])
            }
        }
    },
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
