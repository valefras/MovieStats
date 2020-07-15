<template>
    <div class="cnt">
        <router-link to="/stats">
            <button class="btn">
                Home
            </button>
        </router-link>
        <h1 :class="{ leone: leone, kubrick: kubrick }">{{ param }}</h1>
        <cardGrid :current="current" />
        <div v-if="data_to_display.length > numPerPage" class="pagination-nav">
            <router-link
                :to="{
                    name: 'All',
                    path: 'all/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page--"
                    v-if="data_to_display.length > numPerPage && page >= 1"
                    style="float: left"
                >
                    Previous
                </button>
            </router-link>
            <span></span>
            <router-link
                :to="{
                    name: 'All',
                    path: 'all/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page++"
                    v-if="data_to_display.length > numPerPage && page < pageNum"
                    style="float: right"
                >
                    Next
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import cardGrid from '../components/cardGrid'

export default {
    name: 'Decade',
    // props: {
    //     mode: Array,
    // },
    components: {
        cardGrid,
    },
    data() {
        return {
            filmdata: JSON.parse(localStorage.getItem('filmdata')),
            genres: JSON.parse(localStorage.getItem('genres')),
            selected: '',
            current: [],
            page: 0,
            pageNum: 1,
            numPerPage: 40,
            param: null,
            regexYear: /(^[0-9]+$)/,
            regexDecade: /(?<!\d)(?!0000)\d{4}(?!\d)(\D$)/,
            data_to_display: [],
            leone: false,
            kubrick: false,
            //regexPeople: /\(([^)]+)\)/,
        }
    },
    created() {
        this.param = this.$route.params.mode

        // console.log(this.regexDecade.test(this.param))
        // console.log(this.regexYear.test(this.param))
        if (this.regexYear.test(this.param)) {
            for (let i = 0; i < this.filmdata.length; i++) {
                if (this.filmdata[i].date == this.param) {
                    this.data_to_display.push(this.filmdata[i])
                }
            }
            this.data_to_display.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        } else if (this.regexDecade.test(this.param)) {
            var dec = this.param.slice(0, -1)
            for (let i = 0; i < this.filmdata.length; i++) {
                if (this.filmdata[i].date >= dec && this.filmdata[i].date < parseInt(dec) + 10) {
                    this.data_to_display.push(this.filmdata[i])
                }
            }
            this.data_to_display.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        } else if (this.genres.findIndex(x => x.name === this.param) != -1) {
            for (let y = 0; y < this.genres.length; y++) {
                if (this.genres[y].name == this.param) {
                    var genreId = this.genres[y].id
                }
            }

            for (let i = 0; i < this.filmdata.length; i++) {
                if (this.filmdata[i].genre_id.includes(genreId)) {
                    this.data_to_display.push(this.filmdata[i])
                }
            }
            this.data_to_display.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        } else if (this.param == 'all') {
            this.data_to_display = this.filmdata
            this.data_to_display.sort((a, b) => (a.date > b.date ? -1 : 1))
        } else {
            var mode
            var person = this.param.split(/[()]+/)
            var name = person[0].trim()
            person.pop()
            switch (person[1]) {
                case 'Director':
                    mode = 'Directing'
                    break
                case 'Writer':
                    mode = 'Writing'
                    break
                case 'Composer':
                    mode = 'Sound'
                    break
                case 'Director of photography':
                    mode = 'Camera'
                    break
                case 'Cast':
                    mode = 'cast'
                    break
            }
            //console.log(name)
            this.person_data(mode, name)
            this.data_to_display.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        }

        this.pageNum = Math.ceil(this.data_to_display.length / this.numPerPage) - 1
        // if (this.data_to_display.length > this.numPerPage) {
        this.currentPage()
        //}
    },
    methods: {
        currentPage() {
            for (let i = this.page * this.numPerPage; i < this.page * this.numPerPage + this.numPerPage; i++) {
                if (this.data_to_display[i]) {
                    this.current.push(this.data_to_display[i])
                }
            }
        },
        person_data(mode, person) {
            if (mode == 'cast') {
                for (let i = 0; i < this.filmdata.length; i++) {
                    for (let x = 0; x < this.filmdata[i][mode].length; x++) {
                        if (this.filmdata[i][mode][x].name == person) {
                            this.data_to_display.push(this.filmdata[i])
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.filmdata.length; i++) {
                    for (let x = 0; x < this.filmdata[i].crew.length; x++) {
                        if (this.filmdata[i].crew[x].department == mode && this.filmdata[i].crew[x].name == person) {
                            this.data_to_display.push(this.filmdata[i])
                        }
                    }
                }
                this.data_to_display = [...new Set(this.data_to_display)]
            }
            if (person == 'Stanley Kubrick') {
                this.kubrick = true
            } else if (person == 'Sergio Leone') {
                this.leone = true
            }
        },
    },
    watch: {
        page: function() {
            this.current = []
            this.currentPage()
        },
    },
}
</script>

<style scoped>
.leone {
    font-family: 'Eastwood', sans-serif;
    font-size: 40;
}
.kubrick {
    font-family: 'Futura Extra Bold', sans-serif;
    font-size: 40;
}
</style>
