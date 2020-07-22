<template>
    <div>
        <div v-for="decade in n" :key="top[decade].decade">
            <container :decade="top[decade - 1]" />
            <hr id="decsep" />
        </div>
        <div v-if="show">
            <div v-for="decade in sorted.length - 3" :key="top[decade].decade">
                <container :decade="top[decade + 2]" />
                <hr id="decsep" />
            </div>
        </div>

        <button class="btn" @click="seeMore()" v-if="!show && sorted.length > 3">
            Show more decades
        </button>
        <button @click="seeLess()" v-if="show" class="btn">
            Hide
        </button>
    </div>
</template>
<script>
import container from '../components/filmcontainer.vue'
export default {
    name: 'decades',
    props: {
        filmdata: Array,
    },
    data() {
        return {
            decades: {
                1920: { films: [], average: 0, decade: 1920, sorted: false },
                1930: { films: [], average: 0, decade: 1930, sorted: false },
                1940: { films: [], average: 0, decade: 1940, sorted: false },
                1950: { films: [], average: 0, decade: 1950, sorted: false },
                1960: { films: [], average: 0, decade: 1960, sorted: false },
                1970: { films: [], average: 0, decade: 1970, sorted: false },
                1980: { films: [], average: 0, decade: 1980, sorted: false },
                1990: { films: [], average: 0, decade: 1990, sorted: false },
                2000: { films: [], average: 0, decade: 2000, sorted: false },
                2010: { films: [], average: 0, decade: 2010, sorted: false },
                2020: { films: [], average: 0, decade: 2020, sorted: false },
            },
            sorted: [],
            top: {},
            show: false,
            n: null,
        }
    },
    components: { container },
    created() {
        for (var i = 0; i < this.filmdata.length; i++) {
            var obj = {
                title: this.filmdata[i].title,
                poster: this.filmdata[i].poster,
                rating: this.filmdata[i].rating,
                id: this.filmdata[i].id,
                date: this.filmdata[i].date,
            }
            if (this.filmdata[i].date >= 1920 && this.filmdata[i].date < 1930) {
                this.decades['1920'].films.push(obj)
            } else if (this.filmdata[i].date >= 1930 && this.filmdata[i].date < 1940) {
                this.decades['1930'].films.push(obj)
            } else if (this.filmdata[i].date >= 1940 && this.filmdata[i].date < 1950) {
                this.decades['1940'].films.push(obj)
            } else if (this.filmdata[i].date >= 1950 && this.filmdata[i].date < 1960) {
                this.decades['1950'].films.push(obj)
            } else if (this.filmdata[i].date >= 1960 && this.filmdata[i].date < 1970) {
                this.decades['1960'].films.push(obj)
            } else if (this.filmdata[i].date >= 1970 && this.filmdata[i].date < 1980) {
                this.decades['1970'].films.push(obj)
            } else if (this.filmdata[i].date >= 1980 && this.filmdata[i].date < 1990) {
                this.decades['1980'].films.push(obj)
            } else if (this.filmdata[i].date >= 1990 && this.filmdata[i].date < 2000) {
                this.decades['1990'].films.push(obj)
            } else if (this.filmdata[i].date >= 2000 && this.filmdata[i].date < 2010) {
                this.decades['2000'].films.push(obj)
            } else if (this.filmdata[i].date >= 2010 && this.filmdata[i].date < 2020) {
                this.decades['2010'].films.push(obj)
            } else if (this.filmdata[i].date >= 2020 && this.filmdata[i].date < 2030) {
                this.decades['2020'].films.push(obj)
            }
        }
        for (var x = 1920; x <= 2020; x += 10) {
            for (var y = 0; y < this.decades[x].films.length; y++) {
                this.decades[x].average = this.decades[x].average + this.decades[x].films[y].rating
            }
            this.decades[x].average = (this.decades[x].average / this.decades[x].films.length).toFixed(2)
        }
        for (var z = 1920; z < 2020; z += 10) {
            if (this.decades[z].films.length >= 16) this.sorted.push(this.decades[z].average)
        }
        this.sorted.sort(function(a, b) {
            return b - a
        })
        //if (this.sorted.length >= 5) {
        for (var a = 0; a < this.sorted.length; a++) {
            for (var k = 1920; k <= 2020; k += 10) {
                if (this.decades[k].average == this.sorted[a] && !this.decades[k].sorted) {
                    this.top[a] = this.decades[k]
                    this.decades[k].sorted = true
                    break
                }
            }
        }
        if (this.sorted.length < 3) {
            this.n = this.sorted.length
        } else {
            this.n = 3
        }
        //}
    },
    methods: {
        seeMore() {
            this.show = true
        },
        seeLess() {
            this.show = false
        },
    },
}
</script>

<style></style>
