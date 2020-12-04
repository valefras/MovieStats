<template>
    <div>
        <button @click="rating = true" v-if="!rating" class="btn">Sort by number of movies</button>
        <button @click="rating = false" v-if="rating" class="btn">Sort by your average rating</button>

        <div class="peopleContainer" v-if="!rating">
            <div>
                <h3>Actors</h3>
                <div v-for="actor in actorsRating.length" :key="actorsRating[actor - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: actorsRating[actor - 1][0] + ' (Cast)', page: 1 },
                        }"
                    >
                        <p>{{ actorsRating[actor - 1][0] }}: {{ actorsRating[actor - 1][2] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Directors</h3>
                <div v-for="dir in crew.directors.length" :key="crew.directors[dir - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crew.directors[dir - 1][0] + ' (Director)', page: 1 },
                        }"
                    >
                        <p>{{ crew.directors[dir - 1][0] }}: {{ crew.directors[dir - 1][2] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Writers</h3>
                <div v-for="wri in crew.screenwriters.length" :key="crew.screenwriters[wri - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crew.screenwriters[wri - 1][0] + ' (Writer)', page: 1 },
                        }"
                    >
                        <p>{{ crew.screenwriters[wri - 1][0] }}: {{ crew.screenwriters[wri - 1][2] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Composers</h3>

                <div v-for="com in crew.composers.length" :key="crew.composers[com - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crew.composers[com - 1][0] + ' (Original Music Composer)', page: 1 },
                        }"
                    >
                        <p>{{ crew.composers[com - 1][0] }}: {{ crew.composers[com - 1][2] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Directors of photograhy</h3>
                <div v-for="pho in crew.photography.length" :key="crew.photography[pho - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crew.photography[pho - 1][0] + ' (Director of Photography)', page: 1 },
                        }"
                    >
                        <p>{{ crew.photography[pho - 1][0] }}: {{ crew.photography[pho - 1][2] }}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="peopleContainer" v-else>
            <div>
                <h3>Actors</h3>
                <div v-for="actor in actorsNum.length" :key="actorsNum[actor - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: actorsNum[actor - 1][0] + ' (Cast)', page: 1 },
                        }"
                    >
                        <p>{{ actorsNum[actor - 1][0] }}: {{ actorsNum[actor - 1][1] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Directors</h3>
                <div v-for="dir in crewNum.directors.length" :key="crewNum.directors[dir - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crewNum.directors[dir - 1][0] + ' (Director)', page: 1 },
                        }"
                    >
                        <p>{{ crewNum.directors[dir - 1][0] }}: {{ crewNum.directors[dir - 1][1] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Writers</h3>
                <div v-for="wri in crewNum.screenwriters.length" :key="crewNum.screenwriters[wri - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crewNum.screenwriters[wri - 1][0] + ' (Writer)', page: 1 },
                        }"
                    >
                        <p>{{ crewNum.screenwriters[wri - 1][0] }}: {{ crewNum.screenwriters[wri - 1][1] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Composers</h3>
                <div v-for="com in crewNum.composers.length" :key="crewNum.composers[com - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crewNum.composers[com - 1][0] + ' (Original Music Composer)', page: 1 },
                        }"
                    >
                        <p>{{ crewNum.composers[com - 1][0] }}: {{ crewNum.composers[com - 1][1] }}</p>
                    </router-link>
                </div>
            </div>
            <div>
                <h3>Directors of photograhy</h3>
                <div v-for="pho in crewNum.photography.length" :key="crewNum.photography[pho - 1][0]">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: crewNum.photography[pho - 1][0] + ' (Director of Photography)', page: 1 },
                        }"
                    >
                        <p>{{ crewNum.photography[pho - 1][0] }}: {{ crewNum.photography[pho - 1][1] }}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'people',
    props: {
        filmdata: Array,
    },
    data() {
        return {
            rating: true,
            actorsRating: null,
            actorsNum: null,
            crew: {},
            crewNum: {},
            data_to_sent: {},
        }
    },
    created() {
        this.organizeCast()
        this.organizeCrew()
        this.order('directors')
        this.order('screenwriters')
        this.order('composers')
        this.order('photography')
    },
    methods: {
        organizeCast() {
            var arr = []
            for (let i = 0; i < this.filmdata.length; i++) {
                for (let x = 0; x < this.filmdata[i].cast.length; x++) {
                    arr.push({
                        name: this.filmdata[i].cast[x].name,
                        total: this.filmdata[i].rating,
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

            if (this.actorsNum.length >= 10) {
                this.actorsNum = this.actorsNum.slice(0, 10)
            } else {
                this.actorsNum = this.actorsNum.slice(0, this.actorsNum.length)
            }

            if (this.actorsRating.length >= 10) {
                this.actorsRating = this.actorsRating.slice(0, 10)
            } else {
                this.actorsRating = this.actorsRating.slice(0, this.actorsRating.length)
            }
        },
        organizeCrew() {
            this.crew = { directors: [], composers: [], screenwriters: [], photography: [] }
            for (let i = 0; i < this.filmdata.length; i++) {
                for (let x = 0; x < this.filmdata[i].crew.length; x++) {
                    switch (this.filmdata[i].crew[x].job) {
                        case 'Director':
                            this.crew.directors.push({
                                name: this.filmdata[i].crew[x].name,
                                total: this.filmdata[i].rating,
                            })
                            break
                        case 'Original Music Composer':
                            this.crew.composers.push({
                                name: this.filmdata[i].crew[x].name,
                                total: this.filmdata[i].rating,
                            })
                            break
                        case 'Director of Photography':
                            this.crew.photography.push({
                                name: this.filmdata[i].crew[x].name,
                                total: this.filmdata[i].rating,
                            })
                            break
                        case 'Screenplay':
                            this.crew.screenwriters.push({
                                name: this.filmdata[i].crew[x].name,
                                total: this.filmdata[i].rating,
                            })
                            break
                        case 'Writer':
                            this.crew.screenwriters.push({
                                name: this.filmdata[i].crew[x].name,
                                total: this.filmdata[i].rating,
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
                    z = 3
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

            if (this.crewNum[mode].length >= 10) {
                this.crewNum[mode] = this.crewNum[mode].slice(0, 10)
            } else {
                this.crewNum[mode] = this.crewNum[mode].slice(0, this.crewNum[mode].length)
            }

            if (this.crew[mode].length >= 10) {
                this.crew[mode] = this.crew[mode].slice(0, 10)
            } else {
                this.crew[mode] = this.crew[mode].slice(0, this.crew[mode].length)
            }
        },
    },
}
</script>

<style>
.peopleContainer {
    margin: auto;
    display: grid;
    align-items: left;
    grid-template-columns: auto auto auto auto auto;
    text-align: left;
}
.peopleContainer a p,
.peopleContainer h3 {
    padding-left: 10%;
}
.peopleContainer a p:hover {
    text-decoration: underline;
}
@media screen and (max-width: 800px) {
    .peopleContainer {
        margin: auto;
        display: grid;
        align-items: left;
        grid-template-columns: auto auto auto;
        text-align: left;
    }
}

@media (min-width: 800px) and (max-width: 1199px) {
    .peopleContainer {
        margin: auto;
        display: grid;
        align-items: left;
        grid-template-columns: auto auto auto auto;
        text-align: left;
    }
}

@media screen and (min-width: 1200px) {
}
</style>
