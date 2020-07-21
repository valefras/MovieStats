<template>
    <div ref="chartdiv" style="height: 500px"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

export default {
    props: {
        filmdata: Array,
        genres: Array,
    },
    data() {
        return {
            data: [],
            dataToCompute: [],
        }
    },
    created() {
        for (var i = 0; i < this.genres.length; i++) {
            var data = {
                rtg: 0,
                num: 0,
                title: this.genres[i].name,
            }
            this.dataToCompute.push(data)
        }
        for (var x = 0; x < this.filmdata.length; x++) {
            for (var y = 0; y < this.filmdata[x].genre_id.length; y++) {
                for (var z = 0; z < this.genres.length; z++)
                    if (this.filmdata[x].genre_id[y] == this.genres[z].id) {
                        this.dataToCompute[z].num++
                        this.dataToCompute[z].rtg += this.filmdata[x].rating
                    }
            }
        }
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

        this.dataToCompute.sort((a, b) => (a.avg > b.avg ? 1 : -1))

        for (let i = 0; i < this.dataToCompute.length; i++) {
            this.data.push({ rating: this.dataToCompute[i].avg, genre: this.dataToCompute[i].title })
        }
    },
    mounted() {
        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
        chart.type = 'serial'

        chart.data = this.data

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'genre'

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis())

        categoryAxis.renderer.grid.template.disabled = true
        //valueAxis.renderer.grid.template.disabled = true
        //valueAxis.renderer.labels.template.disabled = true
        valueAxis.renderer.labels.template.fill = am4core.color('#999')
        valueAxis.renderer.grid.template.stroke = am4core.color('#999')

        valueAxis.min = parseFloat(this.data[0].rating - 0.5)
        valueAxis.max = parseFloat(this.data[this.data.length - 1].rating)
        valueAxis.strictMinMax = true

        //console.log(valueAxis.min)

        var series = chart.series.push(new am4charts.ColumnSeries())
        series.columns.template.tooltipText = '{categoryY}\nAverage: {valueX}'
        series.tooltip.autoTextColor = false
        series.tooltip.label.fill = am4core.color('#f0f5f9')
        series.tooltip.getFillFromObject = false
        series.tooltip.background.fill = am4core.color('#2d3234')
        series.tooltip.background.stroke = am4core.color('#2d3234')
        categoryAxis.renderer.labels.template.fill = am4core.color('#999')
        series.tooltip.label.fontSize = '90%'

        series.columns.template.width = am4core.percent(50)
        categoryAxis.renderer.cellStartLocation = 0.2
        categoryAxis.renderer.cellEndLocation = 0.8
        chart.fontSize = '75%'
        series.dataFields.valueX = 'rating'
        series.dataFields.categoryY = 'genre'
        series.heatRules.push({
            target: series.columns.template,
            property: 'fill',
            min: am4core.color('#f9ed69'),
            max: am4core.color('#f08a5d'),
            dataField: 'valueX',
        })
        series.heatRules.push({
            target: series.columns.template,
            property: 'stroke',
            min: am4core.color('#f9ed69'),
            max: am4core.color('#f08a5d'),
            dataField: 'valueX',
        })
        chart.rotate = true
        categoryAxis.renderer.minGridDistance = 20
        series.columns.template.column.cornerRadiusBottomRight = 2
        series.columns.template.column.cornerRadiusTopRight = 2
        series.columns.template.column.cornerRadiusBottomLeft = 2
        series.columns.template.column.cornerRadiusTopLeft = 2
        //series.labels.template.disabled = true
        // series.ticks.template.disabled = true

        series.columns.template.events.on(
            'hit',
            function(ev) {
                console.log(ev.target.dataItem.categoryY)
                this.$router.replace({ name: 'All', params: { mode: ev.target.dataItem.categoryY, page: 1 } })
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

<style></style>
