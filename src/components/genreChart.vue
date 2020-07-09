<template>
    <div class="small">
        <Pie :chartdata="chartdata" :options="options" :width="450" :height="450"></Pie>
    </div>
</template>

<script>
import Pie from './pieChart.js'

export default {
    components: {
        Pie,
    },
    props: { storedFilms: Array, genres: Array },
    data() {
        return {
            chartdata: {
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            '#f08a5d',
                            '#F1915F',
                            '#F29860',
                            '#F39E62',
                            '#F4A563',
                            '#F5AB65',
                            '#F6B267',
                            '#F6B868',
                            '#F7BF6A',
                            '#F8C56C',
                            '#F9CB6D',
                            '#FAD26F',
                            '#FAD871',
                            '#FBDE73',
                            '#FCE475',
                            '#FCE976',
                            '#FDEF78',
                            '#FEF57A',
                            '#FEFA7C',
                            '#FEFF7E',
                        ].reverse(),
                        borderWidth: 0,
                    },
                ],
                labels: [],
            },
            options: null,
        }
    },
    created() {
        this.options = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                bodyFontFamily: "'IBM Plex Sans', sans-serif",
            },
            // elements: {
            //     arc: {
            //         borderWidth: 0,
            //     },
            // },
        }
        for (let z = 0; z < this.genres.length; z++) {
            this.chartdata.datasets[0].data.push(0)
            this.chartdata.labels.push(this.genres[z].name)
        }
        for (var x = 0; x < this.storedFilms.length; x++) {
            for (var y = 0; y < this.storedFilms[x].genre_id.length; y++) {
                for (var z = 0; z < this.genres.length; z++)
                    if (this.storedFilms[x].genre_id[y] == this.genres[z].id) {
                        this.chartdata.datasets[0].data[z] += 1
                    }
            }
        }

        //1) combine the arrays:
        var list = []
        for (var j = 0; j < this.chartdata.datasets[0].data.length; j++) {
            list.push({ name: this.chartdata.labels[j], n: this.chartdata.datasets[0].data[j] })
        }

        //2) sort:
        list.sort(function(a, b) {
            return a.n < b.n ? -1 : a.n == b.n ? 0 : 1
            //Sort could be modified to, for example, sort on the age
            // if the name is the same.
        })

        //3) separate them back out:
        for (var k = 0; k < list.length; k++) {
            this.chartdata.labels[k] = list[k].name
            this.chartdata.datasets[0].data[k] = list[k].n
        }
    },
}
</script>

<style>
.small {
    margin: 0 auto;
}
</style>
