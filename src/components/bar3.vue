<template>
    <bars
        style="transform: rotate(90deg)"
        :data="data"
        :gradient="['#f9ed69', '#f08a5d']"
        :barWidth="20"
        :growDuration="0.6"
        :height="600"
        :width="500"
        viewBox="0 0 500 650"
        :padding="0"
    />
</template>

<script>
import Bars from 'vuebars'

export default {
    name: 'bar',
    props: {
        filmdata: Array,
        genres: Array,
    },
    components: {
        Bars,
    },
    data() {
        return {
            data: [],
        }
    },
    created() {
        this.createArray()
        this.fillData()
        this.computeData()
        this.sort()
    },
    methods: {
        createArray() {
            for (var i = 0; i < this.genres.length; i++) {
                var data = {
                    rtg: 0,
                    num: 0,
                    title: this.genres[i].name,
                }
                this.data.push(data)
            }
        },
        fillData() {
            for (var x = 0; x < this.filmdata.length; x++) {
                for (var y = 0; y < this.filmdata[x].genre_id.length; y++) {
                    for (var z = 0; z < this.genres.length; z++)
                        if (this.filmdata[x].genre_id[y] == this.genres[z].id) {
                            this.data[z].num += 1
                            this.data[z].rtg += this.filmdata[x].rating
                        }
                }
            }
        },
        computeData() {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].num >= 10) {
                    let avg = this.data[i].rtg / this.data[i].num
                    this.data[i].value = avg
                }
            }
            function checkNum(genre) {
                return genre.num >= 10
            }
            this.data = this.data.filter(checkNum)
            /*            for (let i = 0; i < 19; i++) {
                if (this.data[i].num < 10) {
                    this.data.splice(i, 1)
                }
            }
            console.log(this.data)*/
        },
        sort() {
            this.data.sort((a, b) => (a.value > b.value ? -1 : 1))
        },
    },
}
</script>

<style></style>
