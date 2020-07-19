<template>
    <div ref="chartdiv" class="gauge"></div>
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
            avg: 0,
        }
    },
    created() {
        var n = 0
        for (let i = 0; i < this.filmdata.length; i++) {
            n += this.filmdata[i].rating
        }
        this.avg = n / this.filmdata.length
    },
    mounted() {
        var chart = am4core.create(this.$refs.chartdiv, am4charts.GaugeChart)
        var axis = chart.xAxes.push(new am4charts.ValueAxis())
        axis.min = 0.5
        axis.max = 5
        axis.strictMinMax = true
        chart.innerRadius = am4core.percent(70)
        var hand = chart.hands.push(new am4charts.ClockHand())
        hand.value = this.avg
        hand.fill = am4core.color('#f0f5f9')
        hand.stroke = am4core.color('#f0f5f9')
        hand.innerRadius = am4core.percent(50)
        axis.renderer.minGridDistance = 100
        axis.renderer.labels.template.fill = am4core.color('#999')
        chart.fontSize = '80%'

        var range = axis.axisRanges.create()
        range.value = 0.5
        range.endValue = 2
        range.axisFill.fillOpacity = 1
        range.axisFill.fill = am4core.color('#f9ed69')

        range.axisFill.zIndex = -1

        var range1 = axis.axisRanges.create()
        range1.value = 2
        range1.endValue = 3.5
        range1.axisFill.fillOpacity = 1
        range1.axisFill.fill = am4core.color('#F6CC65')
        range1.axisFill.zIndex = -1

        var range2 = axis.axisRanges.create()
        range2.value = 3.5
        range2.endValue = 4.5
        range2.axisFill.fillOpacity = 1
        range2.axisFill.fill = am4core.color('#F3AB61')
        range2.axisFill.zIndex = -1

        var range3 = axis.axisRanges.create()
        range3.value = 4.5
        range3.endValue = 5
        range3.axisFill.fillOpacity = 1
        range3.axisFill.fill = am4core.color('#F08A5D')
        range3.axisFill.zIndex = -1

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
.gauge {
    height: 300px;
    width: 500px;
}
@media screen and (max-width: 800px) {
    .gauge {
        height: 250px;
        width: 350px;
    }
}
@media (min-width: 800px) and (max-width: 1000px) {
    .gauge {
        height: 250px;
        width: 400px;
    }
}
@media (min-width: 1001px) and (max-width: 1200px) {
    .gauge {
        height: 250px;
        width: 400px;
    }
}
</style>
