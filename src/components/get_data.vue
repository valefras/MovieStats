<template>
    <div>
        <div v-if="success == ''" class="cnt">
            <div class="loader"></div>
            <p>Fetching data...</p>
        </div>
        <div v-else>
            <router-link to="Stats">
                <button type="button" class="btn ctn">Take a look at your very personal stats!</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'getdata',
    data() {
        return {
            filmData: [],
            genres: [],
            page_num: null,
            calls: [],
            success: '',
            callMovies: axios.get(
                'https://api.themoviedb.org/3/account/' +
                    this.id +
                    '/rated/movies?api_key=' +
                    this.api_key +
                    '&language=en-US&sort_by=created_at.asc&page=1&session_id=' +
                    sessionStorage.getItem('session_id')
            ),
            callGenres: axios.get(
                'https://api.themoviedb.org/3/genre/movie/list?api_key=' + this.api_key + '&language=en-US'
            ),
        }
    },
    props: {
        id: Number,
        api_key: String,
    },
    async created() {
        // then(
        //     () => {
        //
        //         setTimeout(() => {
        //             this.success = 'data succesfully retrieved'
        //         }, 3000)
        //     }

        //.then(() => {
        //         this.getDetails().then(() => {
        //             this.success = 'bruhhh'
        //         })
        //     })
        //
        //)
        await this.getFirst().then(async () => {
            console.log('1')
            await this.callRemaining().then(async () => {
                console.log('2')

                await this.getOtherInfo().then(async () => {
                    console.log(this.filmData)
                    this.success = 'bruh'

                    this.$emit('data', this.filmData)
                    this.$emit('genres', this.genres)
                    this.$router.push({ name: 'Stats' })
                })
            })
        })
    },
    methods: {
        async getFirst() {
            await axios
                .all([this.callMovies, this.callGenres])
                .then(
                    axios.spread((...responses) => {
                        const response = responses[0]
                        const genres = responses[1]
                        for (let i = 0; i < genres.data.genres.length; i++) {
                            let genre = {
                                id: genres.data.genres[i].id,
                                name: genres.data.genres[i].name,
                            }
                            this.genres.push(genre)
                        }
                        for (var i = 2; i <= response.data.total_pages; i++) {
                            var call = axios.get(
                                'https://api.themoviedb.org/3/account/' +
                                    this.id +
                                    '/rated/movies?api_key=' +
                                    this.api_key +
                                    '&language=en-US&sort_by=created_at.asc&page=' +
                                    i +
                                    '&session_id=' +
                                    sessionStorage.getItem('session_id')
                            )
                            this.calls.push(call)
                        }

                        this.page_num = response.data.total_pages
                        for (var y = 0; y <= response.data.results.length; y++) {
                            this.filmData.push({
                                title: response.data.results[y].title,
                                date: response.data.results[y].release_date.substr(0, 4),
                                poster: 'https://image.tmdb.org/t/p/w300' + response.data.results[y].poster_path,
                                rating: response.data.results[y].rating / 2,
                                language: response.data.results[y].original_language,
                                genre_id: response.data.results[y].genre_ids,
                                id: response.data.results[y].id,
                                backdrop:
                                    'https://image.tmdb.org/t/p/original' + response.data.results[y].backdrop_path,
                            })
                        }
                    })
                )
                .catch(function(error) {
                    console.log(error)
                })
        },
        async callRemaining() {
            await axios
                .all(this.calls)
                .then(
                    axios.spread((...responses) => {
                        for (var x = 0; x < responses.length; x++) {
                            for (var i = 0; i < responses[x].data.results.length; i++) {
                                this.filmData.push({
                                    title: responses[x].data.results[i].title,
                                    date: responses[x].data.results[i].release_date.substr(0, 4),
                                    poster:
                                        'https://image.tmdb.org/t/p/w300' + responses[x].data.results[i].poster_path,
                                    rating: responses[x].data.results[i].rating / 2,
                                    language: responses[x].data.results[i].original_language,
                                    genre_id: responses[x].data.results[i].genre_ids,

                                    id: responses[x].data.results[i].id,
                                    backdrop:
                                        'https://image.tmdb.org/t/p/original' +
                                        responses[x].data.results[i].backdrop_path,
                                })
                            }
                        }
                    })
                )
                .catch(function(error) {
                    console.log(error)
                })
        },
        async getOtherInfo() {
            for (let i = 0; i < this.filmData.length; i++) {
                // var data = this.filmData[i]
                await axios
                    .get(
                        'https://api.themoviedb.org/3/movie/' +
                            this.filmData[i].id +
                            '?api_key=' +
                            this.api_key +
                            '&append_to_response=credits'
                    )
                    .then(response => {
                        for (let x = 0; x < this.filmData.length; x++) {
                            if (this.filmData[x].id == response.data.id) {
                                // let cast = []
                                // for (let i = 0; i < response.data.credits.cast.length; i++) {
                                //     if (response.data.credits.cast[i]) {
                                //         cast.push(response.data.credits.cast[i])
                                //     }
                                // }
                                this.filmData[x].cast = response.data.credits.cast
                                let crew = []
                                for (let i = 0; i < response.data.credits.crew.length; i++) {
                                    if (
                                        response.data.credits.crew[i].job == 'Original Music Composer' ||
                                        response.data.credits.crew[i].job == 'Director' ||
                                        response.data.credits.crew[i].job == 'Director of Photography' ||
                                        response.data.credits.crew[i].job == 'Screenplay' ||
                                        response.data.credits.crew[i].job == 'Writer'
                                    ) {
                                        crew.push(response.data.credits.crew[i])
                                    }
                                }

                                this.filmData[x].crew = crew
                                this.filmData[x].collection = response.data.belongs_to_collection
                                this.filmData[x].runtime = response.data.runtime
                                this.filmData[x].tagline = response.data.tagline
                                this.filmData[x].countries = response.data.production_countries
                                break
                            }
                        }
                    })
            }
        },
    },
}
</script>

<style scoped>
.loader {
    border: 8px solid #f08a5d;
    border-top: 8px solid #f9ed69;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
