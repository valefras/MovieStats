<template>
    <div>
        <h1>Your Stats</h1>
        <h2>{{ storedFilms.length }} films</h2>
        <router-link to="/all">
            <p>See all</p>
        </router-link>
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
            <router-view class="chart" :filmdata="storedFilms" />
        </div>
        <h3>Your ratings</h3>
        <bar2 :filmdata="storedFilms" />
        <h3>Your favourite genres</h3>
        <bar3 :filmdata="storedFilms" :genres="storedGenres" />
        <h3>Your favourite decades</h3>
        <decades :filmdata="storedFilms" v-on:decade="data" />
        <h3>Your favourite actors</h3>
        <div v-for="actor in actors" :key="actor[0]">
            <p>{{ actor[0] }}: {{ actor[1] }}</p>
        </div>
        <h3>Your favourite directors</h3>
        <div v-for="dir in crew.directors" :key="dir[0]">
            <p>{{ dir[0] }}: {{ dir[1] }}</p>
        </div>
        <h3>Your favourite writers</h3>
        <div v-for="wri in crew.screenwriters" :key="wri[0]">
            <p>{{ wri[0] }}: {{ wri[1] }}</p>
        </div>
        <h3>Your favourite composers</h3>
        <div v-for="com in crew.composers" :key="com[0]">
            <p>{{ com[0] }}: {{ com[1] }}</p>
        </div>
        <h3>Your favourite directors of photograhy</h3>
        <div v-for="pho in crew.photography" :key="pho[0]">
            <p>{{ pho[0] }}: {{ pho[1] }}</p>
        </div>
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
            storedFilms: null,
            storedGenres: null,
            actors: [],
            crew: {},
        }
    },
    methods: {
        data(data) {
            this.decade = data
            this.$emit('decade', this.decade)
        },
        async save() {
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
        organizeCast() {
            var arr = []
            for (let i = 0; i < this.storedFilms.length; i++) {
                for (let x = 0; x < this.storedFilms[i].cast.length; x++) {
                    arr.push(this.storedFilms[i].cast[x].name)
                }
            }
            var counts = {}
            arr.forEach(function(x) {
                counts[x] = (counts[x] || 0) + 1
            })
            var sortable = []
            for (var actor in counts) {
                if (counts[actor] > 4) {
                    sortable.push([actor, counts[actor]])
                }
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1]
            })
            this.actors = sortable
        },
        organizeCrew() {
            var crew = { directors: [], composers: [], screenwriters: [], photography: [] }
            for (let i = 0; i < this.storedFilms.length; i++) {
                for (let x = 0; x < this.storedFilms[i].crew.length; x++) {
                    switch (this.storedFilms[i].crew[x].job) {
                        case 'Director':
                            crew.directors.push(this.storedFilms[i].crew[x].name)
                            break
                        case 'Original Music Composer':
                            crew.composers.push(this.storedFilms[i].crew[x].name)
                            break
                        case 'Director of Photography':
                            crew.photography.push(this.storedFilms[i].crew[x].name)
                            break
                        case 'Screenplay':
                            crew.screenwriters.push(this.storedFilms[i].crew[x].name)
                            break
                        case 'Writer':
                            crew.screenwriters.push(this.storedFilms[i].crew[x].name)
                            break
                    }
                }
            }

            //directors
            var counts = {}
            crew.directors.forEach(function(x) {
                counts[x] = (counts[x] || 0) + 1
            })
            var directors = []
            for (var dir in counts) {
                if (counts[dir] > 3) {
                    directors.push([dir, counts[dir]])
                }
            }
            directors.sort(function(a, b) {
                return b[1] - a[1]
            })
            this.crew.directors = directors

            //composers
            var counts1 = {}
            crew.composers.forEach(function(x) {
                counts1[x] = (counts1[x] || 0) + 1
            })
            var composers = []
            for (var com in counts1) {
                if (counts1[com] > 3) {
                    composers.push([com, counts1[com]])
                }
            }
            composers.sort(function(a, b) {
                return b[1] - a[1]
            })
            this.crew.composers = composers

            //photograhy
            var counts2 = {}
            crew.photography.forEach(function(x) {
                counts2[x] = (counts2[x] || 0) + 1
            })
            var photograhy = []
            for (var pho in counts2) {
                if (counts2[pho] > 3) {
                    photograhy.push([pho, counts2[pho]])
                }
            }
            photograhy.sort(function(a, b) {
                return b[1] - a[1]
            })
            this.crew.photography = photograhy

            //writers
            var counts3 = {}
            crew.screenwriters.forEach(function(x) {
                counts3[x] = (counts3[x] || 0) + 1
            })
            console.log(counts3)
            var screenwriters = []
            for (var wri in counts3) {
                if (counts3[wri] > 3) {
                    screenwriters.push([wri, counts3[wri]])
                }
            }
            screenwriters.sort(function(a, b) {
                return b[1] - a[1]
            })
            this.crew.screenwriters = screenwriters
        },
    },
    created() {
        this.save().then(() => this.organizeCast(), this.organizeCrew())
        if (this.$route.path == '/stats') {
            this.tabs = false
        } else if (this.$route.path == '/stats/ratings') {
            this.tabs = true
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
