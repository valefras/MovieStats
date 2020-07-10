<template>
    <div class="hello" ref="chartdiv"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
//import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

export default {
    name: 'HelloWorld',
    data() {
        return {
            storedFilms: JSON.parse(localStorage.getItem('filmdata')),
            words: '',
            count: 0,
        }
    },
    methods: {
        async data() {
            for (let i = 0; i < this.storedFilms.length; i++) {
                if (this.storedFilms[i].tagline) {
                    this.words += this.storedFilms[i].tagline + ' '

                    this.count++
                }
                //console.log(this.storedFilms[i].tagline)
            }
            console.log(this.storedFilms.length)
            //this.words = w.match(/\b(\w+)\b/g)
            //console.log(this.words)
        },
    },
    mounted() {
        this.data().then(() => {
            let chart = am4core.create(this.$refs.chartdiv, am4plugins_wordCloud.WordCloud)

            var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries())

            series.text = this.words

            series.maxCount = 200
            series.minWordLength = 3
            series.angles = [0]
            series.randomness = 0.4
            series.excludeWords = [
                'the',
                'of',
                'and',
                'a',
                'to',
                'in',
                'is',
                'you',
                'that',
                'it',
                'he',
                'was',
                'for',
                'on',
                'are',
                'as',
                'with',
                'his',
                'they',
                'I',
                'at',
                'be',
                'this',
                'have',
                'from',
                'or',
                'one',
                'had',
                'by',
                'but',
                'not',
                'what',
                'all',
                'were',
                'we',
                'when',
                'your',
                'can',
                'said',
                'there',
                'use',
                'an',
                'each',
                'which',
                'she',
                'do',
                'how',
                'their',
                'if',
                'will',
                'up',
                'other',
                'about',
                'out',
                'many',
                'then',
                'them',
                'these',
                'so',
                'some',
                'her',
                'would',
                'make',
                'like',
                'him',
                'into',
                'has',
                'two',
                'more',
                'go',
                'see',
                'no',
                'way',
                'could',
                'my',
                'than',
                'first',
                'been',
                'who',
                'its',
                'now',
                'find',
                'long',
                'down',
                'day',
                'did',
                'get',
                'come',
                'made',
                'may',
                'part',
                'every',
                'don',
                'some',
                'only',
                'just',
                'doesn',
            ]
            series.labelsContainer.rotation = 0
            series.labels.template.fill = am4core.color('#f0f5f9')

            this.chart = chart
        })
    },

    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
        }
    },
}
</script>

<style>
.hello {
    height: 500px;
}
</style>
