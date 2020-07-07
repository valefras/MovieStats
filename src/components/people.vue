<template>
    <div>
        <button @click="rating = true" v-if="!rating" class="btn">Sort by number of films</button>
        <button @click="rating = false" v-if="rating" class="btn">Sort by your average rating</button>

        <div class="peopleContainer" v-if="!rating">
            <div>
                <h3>Your favourite actors</h3>
                <div v-for="actor in 10" :key="actorsRating[actor - 1][0]">
                    <p>{{ actorsRating[actor - 1][0] }}: {{ actorsRating[actor - 1][2] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite directors</h3>
                <div v-for="dir in 10" :key="crew.directors[dir - 1][0]">
                    <p>{{ crew.directors[dir - 1][0] }}: {{ crew.directors[dir - 1][2] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite writers</h3>
                <div v-for="wri in 10" :key="crew.screenwriters[wri - 1][0]">
                    <p>{{ crew.screenwriters[wri - 1][0] }}: {{ crew.screenwriters[wri - 1][2] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite composers</h3>
                <div v-for="com in 10" :key="crew.composers[com - 1][0]">
                    <p>{{ crew.composers[com - 1][0] }}: {{ crew.composers[com - 1][2] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite directors of photograhy</h3>
                <div v-for="pho in 10" :key="crew.photography[pho - 1][0]">
                    <p>{{ crew.photography[pho - 1][0] }}: {{ crew.photography[pho - 1][2] }}</p>
                </div>
            </div>
        </div>
        <div class="peopleContainer" v-else>
            <div>
                <h3>Your favourite actors</h3>
                <div v-for="actor in 10" :key="actorsNum[actor - 1][0]">
                    <p>{{ actorsNum[actor - 1][0] }}: {{ actorsNum[actor - 1][1] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite directors</h3>
                <div v-for="dir in 10" :key="crew.directors[dir - 1][0]">
                    <p>{{ crewNum.directors[dir - 1][0] }}: {{ crewNum.directors[dir - 1][1] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite writers</h3>
                <div v-for="wri in 10" :key="crewNum.screenwriters[wri - 1][0]">
                    <p>{{ crewNum.screenwriters[wri - 1][0] }}: {{ crewNum.screenwriters[wri - 1][1] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite composers</h3>
                <div v-for="com in 10" :key="crewNum.composers[com - 1][0]">
                    <p>{{ crewNum.composers[com - 1][0] }}: {{ crewNum.composers[com - 1][1] }}</p>
                </div>
            </div>
            <div>
                <h3>Your favourite directors of photograhy</h3>
                <div v-for="pho in 10" :key="crewNum.photography[pho - 1][0]">
                    <p>{{ crewNum.photography[pho - 1][0] }}: {{ crewNum.photography[pho - 1][1] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'people',
    props: {
        storedFilms: Array,
    },
    data() {
        return {
            rating: true,
            actorsRating: null,
            actorsNum: null,
            crew: {},
            crewNum: {},
        }
    },
    created() {
        this.organizeCast()
        this.organizeCrew().then(
            () => this.order('directors'),
            this.order('screenwriters'),
            this.order('composers'),
            this.order('photography')
        )
    },
    methods: {
        organizeCast() {
            var arr = []
            for (let i = 0; i < this.storedFilms.length; i++) {
                for (let x = 0; x < this.storedFilms[i].cast.length; x++) {
                    arr.push({
                        name: this.storedFilms[i].cast[x].name,
                        total: this.storedFilms[i].rating,
                    })
                }
            }
            var counts = {}
            arr.forEach(function(x) {
                counts[x.name] = (counts[x.name] || 0) + x.total
            })

            var counts1 = {}
            arr.forEach(function(x) {
                counts1[x.name] = (counts1[x.name] || 0) + 1
            })

            var new_arr = Object.entries(counts)
            var new_arr1 = Object.entries(counts1)

            var i = 0
            while (i < new_arr1.length) {
                if (new_arr1[i][1] <= 4) {
                    new_arr1.splice(i, 1)
                    new_arr.splice(i, 1)
                } else {
                    ++i
                }
            }

            for (let i = 0; i < new_arr1.length; i++) {
                for (var x = 0; x < new_arr.length; x++) {
                    if (new_arr1[i][0] == new_arr[x][0]) {
                        new_arr1[i].push(parseFloat((new_arr[i][1] / new_arr1[i][1]).toFixed(2)))
                    }
                }
            }

            this.actorsNum = new_arr1.sort(function(a, b) {
                return b[1] - a[1]
            })

            var array = new_arr1.slice(0)

            this.actorsRating = array.sort(function(a, b) {
                return b[2] - a[2]
            })
        },
        async organizeCrew() {
            this.crew = { directors: [], composers: [], screenwriters: [], photography: [] }
            for (let i = 0; i < this.storedFilms.length; i++) {
                for (let x = 0; x < this.storedFilms[i].crew.length; x++) {
                    switch (this.storedFilms[i].crew[x].job) {
                        case 'Director':
                            this.crew.directors.push({
                                name: this.storedFilms[i].crew[x].name,
                                total: this.storedFilms[i].rating,
                            })
                            break
                        case 'Original Music Composer':
                            this.crew.composers.push({
                                name: this.storedFilms[i].crew[x].name,
                                total: this.storedFilms[i].rating,
                            })
                            break
                        case 'Director of Photography':
                            this.crew.photography.push({
                                name: this.storedFilms[i].crew[x].name,
                                total: this.storedFilms[i].rating,
                            })
                            break
                        case 'Screenplay':
                            this.crew.screenwriters.push({
                                name: this.storedFilms[i].crew[x].name,
                                total: this.storedFilms[i].rating,
                            })
                            break
                        case 'Writer':
                            this.crew.screenwriters.push({
                                name: this.storedFilms[i].crew[x].name,
                                total: this.storedFilms[i].rating,
                            })
                            break
                    }
                }
            }
        },
        order(mode) {
            var z
            switch (mode) {
                case 'directors':
                    z = 4
                    break
                case 'screenwriters':
                    z = 3
                    break
                case 'composers':
                    z = 3
                    break
                case 'photography':
                    z = 2
                    break
            }

            var counts = {}
            this.crew[mode].forEach(function(x) {
                counts[x.name] = (counts[x.name] || 0) + x.total
            })

            var counts1 = {}
            this.crew[mode].forEach(function(x) {
                counts1[x.name] = (counts1[x.name] || 0) + 1
            })

            var new_arr = Object.entries(counts)
            var new_arr1 = Object.entries(counts1)

            var i = 0
            while (i < new_arr1.length) {
                if (new_arr1[i][1] <= z) {
                    new_arr1.splice(i, 1)
                    new_arr.splice(i, 1)
                } else {
                    ++i
                }
            }

            for (let i = 0; i < new_arr1.length; i++) {
                for (var x = 0; x < new_arr.length; x++) {
                    if (new_arr1[i][0] == new_arr[x][0]) {
                        new_arr1[i].push(parseFloat((new_arr[i][1] / new_arr1[i][1]).toFixed(2)))
                    }
                }
            }

            this.crewNum[mode] = new_arr1.sort(function(a, b) {
                return b[1] - a[1]
            })

            var array = new_arr1.slice(0)

            this.crew[mode] = array.sort(function(a, b) {
                return b[2] - a[2]
            })
        },
    },
}
</script>

<style>
.peopleContainer {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: auto auto auto;
    max-width: 80%;
}
</style>
