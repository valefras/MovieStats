<template>
    <div class="small">
        <Bar :chartdata="chartdata" :options="options"></Bar>
    </div>
</template>

<script>
import Bar from './pieChart.js'

export default {
    components: {
        Bar,
    },
    props: { storedFilms: Array },
    data() {
        return {
            chartdata: { datasets: [{ data: [], backgroundColor: '#f9ed69' }], labels: [] },
            options: null,
        }
    },
    created() {
        this.options = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        display: false,
                    },
                ],
            },
        }
        for (var i = 1940; i <= 2020; i++) {
            this.chartdata.labels.push(i.toString())
            this.chartdata.datasets[0].data.push(0)
        }

        for (var x = 0; x < this.storedFilms.length; x++) {
            for (var y = 0; y < this.chartdata.labels.length; y++) {
                if (this.storedFilms[x].date == this.chartdata.labels[y]) {
                    this.chartdata.datasets[0].data[y] += 1
                }
            }
        }
    },
}
</script>

<style>
.small {
    max-width: 1000px;
    max-height: 300px;
    margin: 0 auto;
}
</style>
