<template>
    <div>
        <div v-for="(decade, name) in topfour" :key="name">
            <container :decade="decade" />
        </div>
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
                1940: { films: [], average: 0, decade: 1940 },
                1950: { films: [], average: 0, decade: 1950 },
                1960: { films: [], average: 0, decade: 1960 },
                1970: { films: [], average: 0, decade: 1970 },
                1980: { films: [], average: 0, decade: 1980 },
                1990: { films: [], average: 0, decade: 1990 },
                2000: { films: [], average: 0, decade: 2000 },
                2010: { films: [], average: 0, decade: 2010 },
                2020: { films: [], average: 0, decade: 2020 },
            },
            sorted: [],
            topfour: {},
        }
    },
    components: { container },
    created() {
        for (var i = 0; i < this.filmdata.length; i++) {
            if (this.filmdata[i].date >= 1940 && this.filmdata[i].date < 1950) {
                var arr = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['1940'].films.push(arr)
            } else if (
                this.filmdata[i].date >= 1950 &&
                this.filmdata[i].date < 1960
            ) {
                var arr1 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['1950'].films.push(arr1)
            } else if (
                this.filmdata[i].date >= 1960 &&
                this.filmdata[i].date < 1970
            ) {
                var arr2 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['1960'].films.push(arr2)
            } else if (
                this.filmdata[i].date >= 1970 &&
                this.filmdata[i].date < 1980
            ) {
                var arr3 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['1970'].films.push(arr3)
            } else if (
                this.filmdata[i].date >= 1980 &&
                this.filmdata[i].date < 1990
            ) {
                var arr4 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['1980'].films.push(arr4)
            } else if (
                this.filmdata[i].date >= 1990 &&
                this.filmdata[i].date < 2000
            ) {
                var arr5 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['1990'].films.push(arr5)
            } else if (
                this.filmdata[i].date >= 2000 &&
                this.filmdata[i].date < 2010
            ) {
                var arr6 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['2000'].films.push(arr6)
            } else if (
                this.filmdata[i].date >= 2010 &&
                this.filmdata[i].date < 2020
            ) {
                var arr7 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['2010'].films.push(arr7)
            } else if (
                this.filmdata[i].date >= 2020 &&
                this.filmdata[i].date < 2030
            ) {
                var arr8 = [
                    this.filmdata[i].title,
                    this.filmdata[i].poster,
                    this.filmdata[i].rating,
                ]
                this.decades['2020'].films.push(arr8)
            }
        }
        for (var x = 1950; x <= 2020; x += 10) {
            for (var y = 0; y < this.decades[x].films.length; y++) {
                this.decades[x].average =
                    this.decades[x].average + this.decades[x].films[y][2]
            }
            this.decades[x].average = (
                this.decades[x].average /
                this.decades[x].films.length /
                2
            ).toFixed(2)
        }
        for (var z = 1940; z < 2020; z += 10) {
            if (this.decades[z].films.length >= 16)
                this.sorted.push(this.decades[z].average)
        }
        this.sorted.sort(function(a, b) {
            return b - a
        })
        if (this.sorted.length >= 4) {
            for (var a = 0; a < 4; a++) {
                for (var k = 1940; k <= 2020; k += 10) {
                    if (this.decades[k].average == this.sorted[a]) {
                        this.topfour[a] = this.decades[k]
                    }
                }
            }
        }
    },
}
</script>

<style></style>
