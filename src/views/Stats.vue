<template>
    <div v-if="!filmdata">
        <div class="image-blurred-edge">
            <p style=" font-size: 80%; color: #9999;">
                The Assassination of Jesse James by the Coward Robert Ford (2007)
            </p>
            <p style="color: #f0f5f9; font-size: 150%; padding-top: 20px; text-align: end">
                "You ever count the stars? I can't ever get the same number, they keep changin' on me."
            </p>
        </div>

        <p style="color: #999; font-size: 110%;  position: relative; bottom: 0;   left:0;">
            Ops... There has been an error. No films were found. <router-link to="/">Try again!</router-link>
        </p>
    </div>

    <div class="cnt" v-else>
        <h1>Your Stats</h1>
        <p>{{ filmdata.length }} movies</p>
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
        <!-- <div id="sec1" class="section"> -->
        <h2 class="sectitle">General</h2>
        <div class="bars">
            <div @click="tabs = false" style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: end">
                <p :class="{ active: !tabs }">Number of movies (by release year)</p>
            </div>
            <div class="vl"></div>
            <div @click="tabs = true" style="display:inline; margin-bottom: 0; margin-top: 0; justify-self: start">
                <p :class="{ active: tabs }">
                    Average rating (by release year)
                </p>
            </div>
            <barChart :filmdata="filmdata" v-if="!tabs" class="chart" />
            <barChart1 :filmdata="filmdata" v-else class="chart" />
        </div>
        <!-- </div> -->

        <hr />

        <h2 class="sectitle">Ratings</h2>
        <div class="ratingCharts">
            <div>
                <h4>Rating distribution</h4>
                <barChart2 :filmdata="filmdata" />
            </div>
            <div>
                <h4>Total average rating</h4>
                <gaugeChart :filmdata="filmdata" />
            </div>
        </div>

        <hr />

        <h2 class="sectitle">Genres</h2>

        <div class="genresCharts">
            <div>
                <h4>Average rating</h4>
                <barChart3 :filmdata="filmdata" :genres="genres" />
            </div>
            <div>
                <h4>Number of movies</h4>
                <genresPieChart :filmdata="filmdata" :genres="genres" />
            </div>
        </div>
        <hr />

        <h2 class="sectitle">Decades</h2>

        <decades :filmdata="filmdata" />

        <hr />

        <h2 class="sectitle">People</h2>
        <people :filmdata="filmdata" />

        <hr />

        <h2 class="sectitle">Words in taglines<span style="font-size: 70%">*</span></h2>

        <wordCloud :filmdata="filmdata" />

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

        <mapChart :filmdata="filmdata" />
        <!-- <h2 class="sectitle">Completed collections</h2> -->

        <!-- <collections :filmdata="filmdata" /> -->
    </div>
</template>

<script>
import decades from '../components/decades.vue'
import barChart from '../components/barChart'
import barChart1 from '../components/barChart1'
import people from '../components/people'
// import collections from '../components/collections'
import wordCloud from '../components/wordCloud'
import genresPieChart from '../components/genresPieChart'
import barChart3 from '../components/barChart3'
import mapChart from '../components/mapChart'
import barChart2 from '../components/barChart2'
import gaugeChart from '../components/gaugeChart'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
        genres: Array,
    },
    components: {
        barChart,
        barChart1,
        barChart2,
        gaugeChart,
        decades,
        people,
        // collections,
        wordCloud,
        genresPieChart,
        barChart3,
        mapChart,
    },
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
        // async save() {
        //     if (this.filmdata) {
        //         localStorage.setItem('filmdata', JSON.stringify(this.filmdata))
        //         localStorage.setItem('genres', JSON.stringify(this.genres))
        //     }
        //     this.storedFilms = JSON.parse(localStorage.getItem('filmdata'))
        //     this.storedGenres = JSON.parse(localStorage.getItem('genres'))
        // },
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
        //this.save().then(() => {
        for (let i = 0; i < this.filmdata.length; i++) {
            this.hours += this.filmdata[i].runtime
        }
        //})
    },
}
</script>

<style>
.image-blurred-edge {
    background-image: url('../assets/jesse-james.jpg');
    width: auto;
    height: calc(100vh - 170px);
    box-shadow: 0 0 100px 100px #2d3234 inset;
    background-repeat: no-repeat;
    background-position: 50% 30%;
    position: relative;

    /* background-size: 100% 100%; */
    /* border-radius: 15%;
    border: transparent; */
    /* background-blend-mode: screen; */
}
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
.ratingCharts {
    margin: auto;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
}
.expl {
    text-align: right;
    font-size: 70%;
}
/* .section {
    height: 100%;
} */
@media (max-width: 991px) {
    .image-blurred-edge {
        background-image: url('../assets/jesse-james.jpg');
        width: auto;
        height: calc(100vh - 170px);
        box-shadow: 0 0 100px 100px #2d3234 inset;
        background-position: 50% 30%;
        position: relative;

        /* background-repeat: no-repeat; */
        /* border-radius: 15%;
    border: transparent; */
        /* background-blend-mode: screen; */
    }
}
</style>
