<template>
    <div ref="chartdiv" class="barRating"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)
export default {
    props: {
        filmdata: Array,
    },
    data() {
        return {
            data: [],
        }
    },
    created() {
        for (let i = 0.5; i <= 5; i += 0.5) {
            this.data.push({ rating: i.toString(), number: 0 })
        }
        for (let i = 0; i < this.filmdata.length; i++) {
            for (let x = 0; x < this.data.length; x++) {
                if (this.filmdata[i].rating == this.data[x].rating) {
                    this.data[x].number++
                }
            }
        }
    },
    mounted() {
        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
        chart.type = 'serial'

        chart.data = this.data

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'rating'

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

        categoryAxis.renderer.grid.template.disabled = true
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.renderer.labels.template.disabled = true
        //categoryAxis.renderer.labels.template.disabled = true

        var series = chart.series.push(new am4charts.ColumnSeries())
        series.columns.template.tooltipText = '{categoryX} rating: {valueY} films'
        series.tooltip.autoTextColor = false
        series.tooltip.label.fill = am4core.color('#f0f5f9')
        series.tooltip.getFillFromObject = false
        series.tooltip.background.fill = am4core.color('#2d3234')
        series.tooltip.background.stroke = am4core.color('#2d3234')
        categoryAxis.renderer.labels.template.fill = am4core.color('#999')
        series.tooltip.label.fontSize = '90%'

        //series.columns.template.width = am4core.percent(50)
        categoryAxis.renderer.cellStartLocation = 0.2
        categoryAxis.renderer.cellEndLocation = 0.8
        chart.fontSize = '80%'
        series.dataFields.valueY = 'number'
        series.dataFields.categoryX = 'rating'
        series.heatRules.push({
            target: series.columns.template,
            property: 'fill',
            min: am4core.color('#f9ed69'),
            max: am4core.color('#f08a5d'),
            dataField: 'valueY',
        })
        series.heatRules.push({
            target: series.columns.template,
            property: 'stroke',
            min: am4core.color('#f9ed69'),
            max: am4core.color('#f08a5d'),
            dataField: 'valueY',
        })
        chart.rotate = true
        categoryAxis.renderer.minGridDistance = 1
        series.columns.template.column.cornerRadiusBottomRight = 4
        series.columns.template.column.cornerRadiusTopRight = 4
        series.columns.template.column.cornerRadiusBottomLeft = 4
        series.columns.template.column.cornerRadiusTopLeft = 4
        // categoryAxis.renderer.labels.template.rotation = 270
        // categoryAxis.renderer.labels.template.verticalCenter = 'middle'
        // categoryAxis.renderer.labels.template.horizontalCenter = 'left'

        series.columns.template.events.on(
            'hit',
            function(ev) {
                console.log(ev.target.dataItem.categoryX)
                this.$router.replace({ name: 'All', params: { mode: ev.target.dataItem.categoryX, page: 1 } })
            },
            this
        )

        //series.labels.template.disabled = true
        // series.ticks.template.disabled = true

        this.chart = chart
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
        }
    },
}
</script>

<style>
.barRating {
    height: 300px;
    width: 500px;
}
@media screen and (max-width: 800px) {
    .barRating {
        height: 250px;
        width: 350px;
    }
}
@media (min-width: 800px) and (max-width: 1000px) {
    .barRating {
        height: 250px;
        width: 400px;
    }
}
@media (min-width: 1001px) and (max-width: 1200px) {
    .barRating {
        height: 250px;
        width: 400px;
    }
}
</style>
