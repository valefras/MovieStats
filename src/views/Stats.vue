<template>
    <div class="cnt">
        <h1>Your Stats</h1>
        <p>{{ storedFilms.length }} films</p>
        <p>{{ timeConvert(hours) }}</p>
        <router-link
            :to="{
                name: 'All',
                path: '/:mode/:page',
                params: { mode: 'all', page: 1 },
            }"
        >
            <button class="btn">See all</button>
        </router-link>
        <hr />
        <h2 class="sectitle">General</h2>
        <br />
        <br />

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
            <barChart :filmdata="storedFilms" v-if="!tabs" class="chart" />
            <barChart1 :filmdata="storedFilms" v-else class="chart" />
        </div>

        <hr />

        <h2 class="sectitle">Genres</h2>
        <br />
        <br />

        <div class="genresCharts">
            <div>
                <h4>Average rating</h4>
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

        <decades :filmdata="storedFilms" />

        <hr />

        <h2 class="sectitle">People</h2>
        <br />
        <people :storedFilms="storedFilms" />

        <hr />

        <h2 class="sectitle">Words in taglines<span style="font-size: 70%">*</span></h2>

        <wordCloud :storedFilms="storedFilms" /> <br />

        <div class="expl">
            <p>
                *Taglines are catchy, enticing short phrases used by marketers and film studios to advertise and sell a
                movie, and to sum up the plot, tone or themes of a film.
            </p>
            <p>
                "For three men the Civil War wasn't hell. It was practice." - The Good, the Bad and the Ugly (1966)
            </p>
        </div>

        <hr />

        <h2 class="sectitle">Production countries</h2>

        <br />

        <mapChart :filmdata="storedFilms" />

        <collections :collections="collections" />
    </div>
</template>

<script>
import decades from '../components/decades.vue'
import barChart from '../components/barChart'
import barChart1 from '../components/barChart1'
import people from '../components/people'
import collections from '../components/collections'
import wordCloud from '../components/wordCloud'
import genresPieChart from '../components/genresPieChart'
import barChart3 from '../components/barChart3'
import mapChart from '../components/mapChart'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
        genres: Array,
    },
    components: { barChart, barChart1, decades, people, collections, wordCloud, genresPieChart, barChart3, mapChart },
    data() {
        return {
            decade: null,
            tabs: false,
            storedFilms: null,
            storedGenres: null,
            collections: [],
            hours: 0,
        }
    },
    methods: {
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
        timeConvert(n) {
            var num = n
            var hours = num / 60
            var rhours = Math.floor(hours)
            var minutes = (hours - rhours) * 60
            var rminutes = Math.round(minutes)
            return rhours + ' hours and ' + rminutes + ' minutes'
        },
    },
    created() {
        this.save()

        for (let i = 0; i < this.storedFilms.length; i++) {
            this.hours += this.storedFilms[i].runtime
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
