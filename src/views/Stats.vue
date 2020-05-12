<template>
    <div>
        <bar-chart :chartdata="chartData" :options="chartOptions" />
        <p>{{ chartData }}</p>
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
                    fill: true,
                    backgroundColor: 'red',
                    label: 'Bar Dataset',
                    data: [],
                },
                labels: [],
            },
            chartOptions: {
                barPercentage: 1,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                autoSkip: false,
                            },
                        },
                    ],
                },
            },
        }
    },

    created() {
        for (var x = 1940; x <= 2020; x++) {
            this.chartData.labels.push(x.toString())
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
