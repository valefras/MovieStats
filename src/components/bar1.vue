<template>
    <bars
        :data="data"
        :gradient="['#f9ed69', '#f08a5d']"
        :barWidth="10"
        :growDuration="0.6"
        :height="300"
        :width="1100"
        :labelData="labelData"
    >
    </bars>
</template>

<script>
import Bars from 'vuebars'

export default {
    name: 'bar',
    props: {
        filmdata: Array,
    },
    components: {
        Bars,
    },
    data() {
        return {
            data: [],
            labelData: [],
        }
    },
    created() {
        var values = []
        for (var i = 1940; i <= 2020; i++) {
            var data = {
                value: 0,
                count: 0,
            }
            values.push(data)
            this.data.push(0)
            this.labelData.push(i.toString())
        }

        for (var x = 0; x < this.filmdata.length; x++) {
            for (var y = 0; y < this.labelData.length; y++) {
                if (this.filmdata[x].date == this.labelData[y]) {
                    values[y].count++
                    values[y].value += this.filmdata[x].rating
                }
            }
        }

        for (var z = 0; z < values.length; z++) {
            if (values[z].count != 0) {
                this.data[z] = parseFloat((values[z].value / values[z].count).toFixed(2))
            }
        }
    },
}
</script>

<style></style>
