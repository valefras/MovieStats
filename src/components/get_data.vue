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
            data: [],
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
    created() {
        this.getInitial().then(
            () => {
                this.$emit('data', this.data)
                this.$emit('genres', this.genres)
            }
            //.then(() => {
            //         this.getDetails().then(() => {
            //             this.success = 'bruhhh'
            //         })
            //     })
            //
        )
    },
    methods: {
        async getInitial() {
            axios
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
                        axios
                            .all(this.calls)
                            .then(
                                axios.spread((...responses) => {
                                    for (var x = 0; x < responses.length; x++) {
                                        for (var i = 0; i < responses[x].data.results.length; i++) {
                                            this.data.push({
                                                title: responses[x].data.results[i].title,
                                                date: responses[x].data.results[i].release_date.substr(0, 4),
                                                poster:
                                                    'https://image.tmdb.org/t/p/w500' +
                                                    responses[x].data.results[i].poster_path,
                                                rating: responses[x].data.results[i].rating / 2,
                                                language: responses[x].data.results[i].original_language,
                                                genre_id: responses[x].data.results[i].genre_ids,
                                                vote_average: responses[x].data.results[i].vote_average,
                                                popularity: responses[x].data.results[i].popularity,
                                                id: responses[x].data.results[i].id,
                                            })
                                        }
                                    }
                                })
                            )
                            .catch(function(error) {
                                console.log(error)
                            })
                            .then(() => {
                                for (let i = 0; i < this.data.length; i++) {
                                    // var data = this.data[i]
                                    axios
                                        .get(
                                            'https://api.themoviedb.org/3/movie/' +
                                                this.data[i].id +
                                                '?api_key=' +
                                                this.api_key +
                                                '&append_to_response=credits'
                                        )
                                        .then(response => {
                                            for (let x = 0; x < this.data.length; x++) {
                                                if (this.data[x].id == response.data.id) {
                                                    let cast = []
                                                    for (let i = 0; i < 15; i++) {
                                                        if (response.data.credits.cast[i]) {
                                                            cast.push(response.data.credits.cast[i])
                                                        }
                                                    }
                                                    this.data[x].cast = cast
                                                    let crew = []
                                                    for (let i = 0; i < response.data.credits.crew.length; i++) {
                                                        if (
                                                            response.data.credits.crew[i].job ==
                                                                'Original Music Composer' ||
                                                            response.data.credits.crew[i].job == 'Director' ||
                                                            response.data.credits.crew[i].job ==
                                                                'Director of Photography' ||
                                                            response.data.credits.crew[i].job == 'Screenplay' ||
                                                            response.data.credits.crew[i].job == 'Writer'
                                                        ) {
                                                            crew.push(response.data.credits.crew[i])
                                                        }
                                                    }

                                                    this.data[x].crew = crew
                                                    this.data[x].collection = response.data.belongs_to_collection
                                                    this.data[x].runtime = response.data.runtime
                                                    this.data[x].tagline = response.data.tagline
                                                    this.data[x].countries = response.data.production_countries
                                                    break
                                                }
                                            }
                                        })
                                        .then(() => {
                                            this.success = 'data succesfully retrieved'
                                        })
                                }
                            })

                        this.page_num = response.data.total_pages
                        for (var y = 0; y <= 20; y++) {
                            this.data.push({
                                title: response.data.results[y].title,
                                date: response.data.results[y].release_date.substr(0, 4),
                                poster: 'https://image.tmdb.org/t/p/w500' + response.data.results[y].poster_path,
                                rating: response.data.results[y].rating / 2,
                                language: response.data.results[y].original_language,
                                genre_id: response.data.results[y].genre_ids,
                                vote_average: response.data.results[y].vote_average,
                                popularity: response.data.results[y].popularity,
                                id: response.data.results[y].id,
                            })
                        }
                    })
                )
                .catch(function(error) {
                    console.log(error)
                })
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
