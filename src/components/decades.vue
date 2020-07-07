<template>
    <div>
        <div v-for="decade in 3" :key="top[decade].decade">
            <container :decade="top[decade - 1]" v-on:decade="decade_data" />
        </div>
        <div v-if="show">
            <div v-for="decade in sorted.length - 3" :key="top[decade].decade">
                <container :decade="top[decade + 2]" v-on:decade="decade_data" />
            </div>
        </div>

        <button class="btn" @click="seeMore()" v-if="!show && sorted.length > 3">
            Show more
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
        }
    },
    components: { container },
    created() {
        for (var i = 0; i < this.filmdata.length; i++) {
            if (this.filmdata[i].date >= 1940 && this.filmdata[i].date < 1950) {
                var obj = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['1940'].films.push(obj)
            } else if (this.filmdata[i].date >= 1950 && this.filmdata[i].date < 1960) {
                var obj1 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['1950'].films.push(obj1)
            } else if (this.filmdata[i].date >= 1960 && this.filmdata[i].date < 1970) {
                var obj2 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['1960'].films.push(obj2)
            } else if (this.filmdata[i].date >= 1970 && this.filmdata[i].date < 1980) {
                var obj3 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['1970'].films.push(obj3)
            } else if (this.filmdata[i].date >= 1980 && this.filmdata[i].date < 1990) {
                var obj4 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['1980'].films.push(obj4)
            } else if (this.filmdata[i].date >= 1990 && this.filmdata[i].date < 2000) {
                var obj5 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['1990'].films.push(obj5)
            } else if (this.filmdata[i].date >= 2000 && this.filmdata[i].date < 2010) {
                var obj6 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['2000'].films.push(obj6)
            } else if (this.filmdata[i].date >= 2010 && this.filmdata[i].date < 2020) {
                var obj7 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['2010'].films.push(obj7)
            } else if (this.filmdata[i].date >= 2020 && this.filmdata[i].date < 2030) {
                var obj8 = {
                    title: this.filmdata[i].title,
                    poster: this.filmdata[i].poster,
                    rating: this.filmdata[i].rating,
                    id: this.filmdata[i].id,
                    date: this.filmdata[i].date,
                }
                this.decades['2020'].films.push(obj8)
            }
        }
        for (var x = 1940; x <= 2020; x += 10) {
            for (var y = 0; y < this.decades[x].films.length; y++) {
                this.decades[x].average = this.decades[x].average + this.decades[x].films[y].rating
            }
            this.decades[x].average = (this.decades[x].average / this.decades[x].films.length).toFixed(2)
        }
        for (var z = 1940; z < 2020; z += 10) {
            if (this.decades[z].films.length >= 16) this.sorted.push(this.decades[z].average)
        }
        this.sorted.sort(function(a, b) {
            return b - a
        })
        if (this.sorted.length >= 5) {
            for (var a = 0; a < 10; a++) {
                for (var k = 1940; k <= 2020; k += 10) {
                    if (this.decades[k].average == this.sorted[a] && !this.decades[k].sorted) {
                        this.top[a] = this.decades[k]
                        this.decades[k].sorted = true
                        break
                    }
                }
            }
        }
    },
    methods: {
        decade_data(y) {
            for (var i = 1940; i < 2020; i += 10) {
                if (y == i) {
                    this.$emit('decade', this.decades[i])
                }
            }
        },
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
