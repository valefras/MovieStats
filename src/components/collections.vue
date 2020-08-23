<template>
    <div>
        <!-- <div v-for="n in completed.length" :key="completed[n - 1].name">
            <p>{{ completed[n - 1].name }}</p>
            <img :src="'https://image.tmdb.org/t/p/w300' + completed[n - 1].poster_path" style="width: 150px" />
        </div> -->
    </div>
</template>

<script>
// import axios from 'axios'

export default {
    name: 'collections',
    props: {
        collections: Array,
    },
    data() {
        return {
            seen: null,

            completed: [],
        }
    },
    // created() {
    //     var counter = {}

    //     this.collections.forEach(function(x) {
    //         counter[x.collection.id] = (counter[x.collection.id] || 0) + 1
    //     })
    //     console.log(counter)

    //     var new_arr = Object.entries(counter)

    //     var i = 0
    //     while (i < new_arr.length) {
    //         if (new_arr[i][1] <= 1) {
    //             new_arr.splice(i, 1)
    //         } else {
    //             ++i
    //         }
    //     }
    //     console.log(new_arr)
    //     this.seen = new_arr

    //     for (let i = 0; i < this.seen.length; i++) {
    //         axios
    //             .get(
    //                 'https://api.themoviedb.org/3/collection/' +
    //                     this.seen[i][0] +
    //                     '?api_key=1de39ba8ae7e4330c0da7c4c9cb0adbf&language=en-US'
    //             )
    //             .then(response => {
    //                 if (response.data.parts.length == this.seen[i][1]) {
    //                     console.log(response.data)
    //                     this.completed.push(response.data)
    //                 }
    //             })
    //     }

    // var unique = [...new Set(this.collections.map(a => a.collection.id))]
    // console.log(unique)
    // for (let i = 0; i < unique.length; i++) {}
    //   },
}
</script>

<style></style>
