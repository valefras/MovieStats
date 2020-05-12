<template>
    <bars
        :data="data"
        :gradient="['#f9ed69', '#f08a5d']"
        :barWidth="10"
        :growDuration="1"
        :height="300"
        :width="1100"
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
        }
    },
    created() {
        for (var i = 1940; i <= 2020; i++) {
            var data = {
                value: 0,
                title: i.toString(),
                count: 0,
            }
            this.data.push(data)
        }
        for (var x = 0; x < this.filmdata.length; x++) {
            for (var y = 0; y < this.data.length; y++) {
                if (this.filmdata[x].date == this.data[y].title) {
                    this.data[y].count = this.data[y].count + 1
                    this.data[y].value =
                        this.data[y].value + this.filmdata[x].rating
                }
            }
        }
        for (var z = 0; z < this.data.length; z++) {
            if (this.data[z].count != 0) {
                this.data[z].value = this.data[z].value / this.data[z].count / 2
            }
        }
    },
}
</script>

<style></style>
