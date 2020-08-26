<template>
    <div id="collections">
        <div v-for="n in completed.length" :key="completed[n - 1].name" style="height: 175px">
            <p style="text-align: center">{{ completed[n - 1].name }}</p>
            <div v-if="completed[n - 1].parts.length < 4">
                <img
                    @mouseover="hover = true"
                    @mouseleave="hover = false"
                    :class="{ hover: hover }"
                    v-for="i in completed[n - 1].parts.length"
                    :key="completed[n - 1].parts[i - 1].id"
                    :src="completed[n - 1].parts[i - 1].poster"
                    id="part"
                />
            </div>
            <div v-else>
                <img
                    @mouseover="hover = true"
                    @mouseleave="hover = false"
                    :class="{ hover: hover }"
                    v-for="i in 3"
                    :key="completed[n - 1].parts[i - 1].id"
                    :src="completed[n - 1].parts[i - 1].poster"
                    id="part"
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
            hover: false,
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
                        for (let i = 0; i < response.data.parts.length; i++) {
                            this.completed[this.completed.length - 1].parts[i] = {
                                title: response.data.parts[i].title,
                                date: response.data.parts[i].release_date.substr(0, 4),
                                poster: 'https://image.tmdb.org/t/p/w300' + response.data.parts[i].poster_path,
                                language: response.data.parts[i].original_language,
                                genre_id: response.data.parts[i].genre_ids,
                                id: response.data.parts[i].id,
                                backdrop: 'https://image.tmdb.org/t/p/original' + response.data.parts[i].backdrop_path,
                            }
                        }
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

<style scoped>
#collections {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
}
#part {
    height: 75%;
    margin-right: -20%;
    /* transition: margin-right 0.5s; */
    transition: margin-right 0.5s, height 0.5s;
}
#part.hover {
    margin-right: 0;
    height: 80%;
}
</style>
