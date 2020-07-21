<template>
    <div ref="chartdiv" class="barFilms"></div>
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
            loading: true,
        }
    },

    created() {
        var arr = []
        for (let i = 1900; i <= 2020; i++) {
            arr.push({ number: 0, year: i.toString() })
        }
        for (var x = 0; x < this.filmdata.length; x++) {
            for (var y = 0; y < arr.length; y++) {
                if (this.filmdata[x].date == arr[y].year) {
                    arr[y].number++
                }
            }
        }
        let i = 0
        while (i < arr.length) {
            if (arr[i].number != 0) {
                arr = arr.splice(arr[i].year - 1900)
                break
            }
            i++
        }

        this.data = arr
    },
    mounted() {
        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
        chart.type = 'serial'

        chart.data = this.data

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'year'

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

        categoryAxis.renderer.grid.template.disabled = true
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.renderer.labels.template.disabled = true
        //categoryAxis.renderer.labels.template.disabled = true

        // valueAxis.min = 2
        // valueAxis.max = this.data[0].rating + 0.3

        var series = chart.series.push(new am4charts.ColumnSeries())
        series.columns.template.tooltipText = '{categoryX}: {valueY} movies'
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
        chart.fontSize = '70%'
        series.dataFields.valueY = 'number'
        series.dataFields.categoryX = 'year'
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
        series.columns.template.column.cornerRadiusBottomRight = 2
        series.columns.template.column.cornerRadiusTopRight = 2
        series.columns.template.column.cornerRadiusBottomLeft = 2
        series.columns.template.column.cornerRadiusTopLeft = 2
        categoryAxis.renderer.labels.template.rotation = 270
        categoryAxis.renderer.labels.template.verticalCenter = 'middle'
        categoryAxis.renderer.labels.template.horizontalCenter = 'left'

        series.columns.template.events.on(
            'hit',
            function(ev) {
                console.log(ev.target.dataItem.categoryX)
                //this.$emit('specific_data', { mode: 'year', data: ev.target.dataItem.categoryX })
                this.$router.replace({ name: 'All', params: { mode: ev.target.dataItem.categoryX, page: 1 } })
            },
            this
        )

        //series.labels.template.disabled = true
        // series.ticks.template.disabled = true

        this.chart = chart

        this.loading = false
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
        }
    },
}
</script>

<style></style>
