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
        for (var i = 1940; i <= 2020; i++) {
            this.data.push(0)
            this.labelData.push(i.toString())
        }
        for (var x = 0; x < this.filmdata.length; x++) {
            for (var y = 0; y < this.data.length; y++) {
                if (this.filmdata[x].date == this.labelData[y]) {
                    this.data[y]++
                }
            }
        }
    },
}
</script>

<style></style>
