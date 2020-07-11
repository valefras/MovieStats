<template>
    <bars
        style="transform: rotate(90deg)"
        :data="data"
        :gradient="['#f9ed69', '#f08a5d']"
        :barWidth="20"
        :growDuration="0.6"
        :height="500"
        :width="500"
        :padding="0"
        viewBox="0 0 500 550"
        :labelData="labelData"
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
            labelData: [],
            dataToCompute: [],
        }
    },
    created() {
        this.createArray()
        this.fillData()
        this.computeData()
    },
    methods: {
        createArray() {
            for (var i = 0; i < this.genres.length; i++) {
                var data = {
                    rtg: 0,
                    num: 0,
                    title: this.genres[i].name,
                }
                this.dataToCompute.push(data)
            }
        },
        fillData() {
            for (var x = 0; x < this.filmdata.length; x++) {
                for (var y = 0; y < this.filmdata[x].genre_id.length; y++) {
                    for (var z = 0; z < this.genres.length; z++)
                        if (this.filmdata[x].genre_id[y] == this.genres[z].id) {
                            this.dataToCompute[z].num++
                            this.dataToCompute[z].rtg += this.filmdata[x].rating
                        }
                }
            }
        },
        computeData() {
            for (let i = 0; i < this.dataToCompute.length; i++) {
                if (this.dataToCompute[i].num >= 10) {
                    let avg = parseFloat((this.dataToCompute[i].rtg / this.dataToCompute[i].num).toFixed(2))
                    this.dataToCompute[i].avg = avg
                }
            }
            function checkNum(genre) {
                return genre.num >= 10
            }
            this.dataToCompute = this.dataToCompute.filter(checkNum)

            this.dataToCompute.sort((a, b) => (a.avg > b.avg ? -1 : 1))

            for (let i = 0; i < this.dataToCompute.length; i++) {
                this.data.push(this.dataToCompute[i].avg)
                this.labelData.push(this.dataToCompute[i].title)
            }
            /*            for (let i = 0; i < 19; i++) {
                if (this.data[i].num < 10) {
                    this.data.splice(i, 1)
                }
            }
            console.log(this.data)*/
        },
    },
}
</script>

<style></style>
