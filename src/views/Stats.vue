<template>
    <div class="cnt">
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
            <div @click="tabs = false" style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: end">
                <p :class="{ active: !tabs }">Number of films (by release year)</p>
            </div>
            <div class="vl"></div>
            <div @click="tabs = true" style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: start">
                <p :class="{ active: tabs }">
                    Average rating (by release year)
                </p>
            </div>
            <!-- <bar :filmdata="storedFilms" v-show="!tabs" class="chart" /> -->
            <barChart :filmdata="storedFilms" v-if="!tabs" class="chart" />
            <barChart1 :filmdata="storedFilms" v-else class="chart" />
        </div>

        <hr />

        <!-- <h2 class="sectitle">Ratings</h2>
        <br />
        <bar2 :filmdata="storedFilms" />

        <hr /> -->

        <h2 class="sectitle">Genres</h2>
        <br />
        <div class="genresCharts">
            <div>
                <h4>Average rating</h4>
                <!-- <bar3 :filmdata="storedFilms" :genres="storedGenres" /> -->
                <barChart3 :filmdata="storedFilms" :genres="storedGenres" />
            </div>
            <div>
                <h4>Number of films</h4>
                <genresPieChart :filmdata="storedFilms" :genres="storedGenres" />
            </div>
        </div>
        <hr />

        <h2 class="sectitle">Decades</h2>
        <br />

        <decades :filmdata="storedFilms" v-on:decade="data" />

        <hr />

        <h2 class="sectitle">People</h2>
        <br />
        <people :storedFilms="storedFilms" v-on:person="person_data" />

        <hr />

        <h2 class="sectitle">Words in taglines<span style="font-size: 70%">*</span></h2>

        <br />
        <wordCloud :storedFilms="storedFilms" />
        <div class="expl">
            <p>
                *Taglines are catchy, enticing short phrases used by marketers and film studios to advertise and sell a
                movie, and to sum up the plot, tone or themes of a film.
            </p>
            <p>
                "For three men the Civil War wasn't hell. It was practice." - The Good, the Bad and the Ugly (1966)
            </p>
        </div>

        <collections :collections="collections" />
    </div>
</template>

<script>
import decades from '../components/decades.vue'
//import bar from '../components/bar'
import barChart from '../components/barChart'

import barChart1 from '../components/barChart1'
//import bar2 from '../components/bar2'
//import bar3 from '../components/bar3'
import people from '../components/people'
import collections from '../components/collections'
import wordCloud from '../components/wordCloud'
import genresPieChart from '../components/genresPieChart'
import barChart3 from '../components/barChart3'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
        genres: Array,
    },
    components: { barChart, barChart1, decades, people, collections, wordCloud, genresPieChart, barChart3 },
    data() {
        return {
            decade: null,
            tabs: false,
            storedFilms: null,
            storedGenres: null,
            collections: [],
            person: null,
        }
    },
    methods: {
        data(data) {
            this.decade = data
            this.$emit('decade', this.decade)
        },
        person_data(data) {
            this.person = data
            this.$emit('person', this.person)
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
    grid-template-columns: 48% 4% 48%;
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
.genresCharts {
    margin: auto;
    display: grid;
    grid-template-columns: 50% 50%;
}
.expl {
    text-align: right;
    font-size: 70%;
}
</style>
