<template>
    <bars
        :data="data"
        :gradient="['#f9ed69', '#f08a5d']"
        :growDuration="0.6"
        :barWidth="20"
        :height="200"
        :width="400"
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
        for (var i = 0.5; i <= 5; i += 0.5) {
            this.data.push(0)
            this.labelData.push(i.toString())
        }

        for (var x = 0; x < this.filmdata.length; x++) {
            for (var y = 0; y < this.data.length; y++) {
                if (this.filmdata[x].rating == this.labelData[y]) {
                    this.data[y]++
                }
            }
        }
    },
}
</script>

<style></style>
