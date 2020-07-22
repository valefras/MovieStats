<template>
    <div ref="chartdiv" class="hello"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

export default {
    name: 'piechart',
    props: { filmdata: Array, genres: Array },
    data() {
        return {
            data: [],
            colors: [
                '#f08a5d',
                '#F3945F',
                '#F79E60',
                '#FAA862',
                '#FCB264',
                '#FFBC67',
                '#FFC669',
                '#FFD16C',
                '#FFDB6E',
                '#FFE571',
                '#FFEE74',
                '#FFF877',
                '#FFFF7B',
                '#FFFF7E',
                '#FFFF82',
                '#FFFF86',
                '#FFFF8A',
                '#FCFF8E',
                '#F6FF93',
            ],
        }
    },
    created() {
        for (let x = 0; x < this.genres.length; x++) {
            this.data.push({ genre: this.genres[x].name, number: 0 })
        }
        for (let i = 0; i < this.filmdata.length; i++) {
            for (let y = 0; y < this.filmdata[i].genre_id.length; y++) {
                for (let x = 0; x < this.genres.length; x++) {
                    if (this.filmdata[i].genre_id[y] == this.genres[x].id) {
                        this.data[x].number++
                    }
                }
            }
        }
        this.data.sort((a, b) => (a.number > b.number ? -1 : 1))
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].color = this.colors[i]
        }
    },
    mounted() {
        let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart)

        //chart.innerRadius = am4core.percent(30)

        chart.data = this.data

        let pieSeries = chart.series.push(new am4charts.PieSeries())
        pieSeries.tooltip.autoTextColor = false
        pieSeries.tooltip.label.fill = am4core.color('#f0f5f9')
        pieSeries.tooltip.label.fontSize = '90%'

        pieSeries.tooltip.getFillFromObject = false
        pieSeries.tooltip.background.fill = am4core.color('#2d3234')
        pieSeries.tooltip.background.stroke = am4core.color('#2d3234')

        pieSeries.labels.template.disabled = true
        pieSeries.ticks.template.disabled = true
        pieSeries.slices.template.tooltipText = '{category}: {value.value} movies'
        pieSeries.slices.template.propertyFields.fill = 'color'

        pieSeries.dataFields.value = 'number'
        pieSeries.dataFields.category = 'genre'
        let as = pieSeries.slices.template.states.getKey('active')
        as.properties.shiftRadius = 0

        pieSeries.slices.template.events.on(
            'hit',
            function(ev) {
                console.log(ev.target.dataItem.category)
                this.$router.replace({ name: 'All', params: { mode: ev.target.dataItem.category, page: 1 } })
            },
            this
        )

        this.chart = chart
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
        }
    },
}
</script>

<style scoped>
.hello {
    height: 500px;
    width: 100%;
}
</style>
