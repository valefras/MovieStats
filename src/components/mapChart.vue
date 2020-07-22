<template>
    <div ref="chartdiv" style="height: 500px"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

export default {
    props: { filmdata: Array },
    data() {
        return {
            data: [],
        }
    },
    created() {
        var arr = []

        for (let i = 0; i < this.filmdata.length; i++) {
            for (let x = 0; x < this.filmdata[i].countries.length; x++) {
                arr.push([this.filmdata[i].countries[x].name, this.filmdata[i].countries[x].iso_3166_1])
            }
        }
        var counts = {}
        arr.forEach(function(x) {
            counts[x] = (counts[x] || 0) + 1
        })
        var new_arr = Object.entries(counts)

        for (let i = 0; i < new_arr.length; i++) {
            var cou = new_arr[i][0].split(',')
            this.data.push({ name: cou[0], id: cou[1], value: new_arr[i][1] })
        }
    },
    mounted() {
        var map = am4core.create(this.$refs.chartdiv, am4maps.MapChart)
        map.geodata = am4geodata_worldLow
        map.projection = new am4maps.projections.Miller()
        //map.projection = new am4maps.projections.Orthographic()
        var polygonSeries = new am4maps.MapPolygonSeries()
        polygonSeries.useGeodata = true
        map.series.push(polygonSeries)

        var polygonTemplate = polygonSeries.mapPolygons.template

        polygonTemplate.tooltipText = '{name}: {value} movies'

        polygonSeries.tooltip.autoTextColor = false
        polygonSeries.tooltip.label.fill = am4core.color('#f0f5f9')
        polygonSeries.tooltip.getFillFromObject = false
        polygonSeries.tooltip.background.fill = am4core.color('#2d3234')
        polygonSeries.tooltip.background.stroke = am4core.color('#2d3234')
        polygonSeries.tooltip.label.fontSize = '90%'

        //console.log(this.data)
        polygonSeries.data = this.data

        polygonSeries.heatRules.push({
            property: 'fill',
            target: polygonSeries.mapPolygons.template,
            min: am4core.color('#f9ed69'),
            max: am4core.color('#f08a5d'),
            logarithmic: true,
        })

        polygonSeries.mapPolygons.template.events.on(
            'hit',
            function(ev) {
                //console.log(ev.target.dataItem.value)
                if (ev.target.dataItem.value > 0) {
                    this.$router.replace({
                        name: 'All',
                        params: {
                            mode: ev.target.dataItem.dataContext.id,
                            page: 1,
                        },
                    })
                }
            },
            this
        )

        polygonSeries.exclude = ['AQ']

        this.chart = map
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
        }
    },
}
</script>

<style></style>
