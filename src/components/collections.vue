<template>
    <div id="collections">
        <div v-for="n in completed.length" :key="completed[n - 1].name" style="height: 175px">
            <p style="text-align: center">{{ completed[n - 1].name }}</p>
            <div v-if="completed[n - 1].parts.length < 4">
                <img
                    v-for="i in completed[n - 1].parts.length"
                    :key="completed[n - 1].parts[i - 1].id"
                    :src="'https://image.tmdb.org/t/p/w300' + completed[n - 1].parts[i - 1].poster_path"
                    style="height: 75%; margin-right: -20%"
                />
            </div>
            <div v-else>
                <img
                    v-for="i in 3"
                    :key="completed[n - 1].parts[i - 1].id"
                    :src="'https://image.tmdb.org/t/p/w300' + completed[n - 1].parts[i - 1].poster_path"
                    style="height: 75%; margin-right: -20%"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'collections',
    props: {
        filmdata: Array,
    },
    data() {
        return {
            seen: null,

            completed: [],
            collections: [],
        }
    },
    created() {
        for (let i = 0; i < this.filmdata.length; i++) {
            if (this.filmdata[i].collection) {
                this.collections.push(this.filmdata[i])
            }
        }

        var counter = {}

        this.collections.forEach(function(x) {
            counter[x.collection.id] = (counter[x.collection.id] || 0) + 1
        })
        console.log(counter)

        var new_arr = Object.entries(counter)

        var i = 0
        while (i < new_arr.length) {
            if (new_arr[i][1] <= 1) {
                new_arr.splice(i, 1)
            } else {
                ++i
            }
        }
        console.log(new_arr)
        this.seen = new_arr

        for (let i = 0; i < this.seen.length; i++) {
            axios
                .get(
                    'https://api.themoviedb.org/3/collection/' +
                        this.seen[i][0] +
                        '?api_key=1de39ba8ae7e4330c0da7c4c9cb0adbf&language=en-US'
                )
                .then(response => {
                    if (response.data.parts.length == this.seen[i][1]) {
                        console.log(response.data)
                        this.completed.push(response.data)
                    }
                })
        }
    },
    // var unique = [...new Set(this.collections.map(a => a.collection.id))]
    // console.log(unique)
    // for (let i = 0; i < unique.length; i++) {}
    //   },
}
</script>

<style>
#collections {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
}
</style>
