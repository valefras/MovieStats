<template>
    <div>
        <bar-chart
            v-if="chartData.datasets.data"
            :chartdata="chartData"
            :options="chartOptions"
        />
    </div>
</template>

<script>
import BarChart from '../components/bar.vue'
export default {
    name: 'Stats',
    props: {
        filmdata: Array,
    },
    components: {
        BarChart,
    },
    data() {
        return {
            chartData: {
                datasets: {
                    data: [],
                },
                labels: [],
            },
            chartOptions: {
                barPercentage: 'flex',
                responsive: true,
                scaleShowValues: true,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                autoSkip: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    ],
                },
            },
        }
    },
    created() {
        for (var x = 1940; x <= 2020; x++) {
            this.chartData.labels.push(x)
            this.chartData.datasets.data.push(0)
        }
        for (var i = 0; i < this.filmdata.length; i++) {
            var year = this.filmdata[i].date
            var index = year - 1940
            for (var y = 0; y < this.chartData.labels.length; y++) {
                if (index == y) {
                    this.chartData.datasets.data[index] =
                        this.chartData.datasets.data[index] + 1
                }
            }
        }
    },
}
</script>

<style></style>
