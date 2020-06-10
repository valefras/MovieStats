<template>
    <div>
        <p>{{ success }}</p>
        <router-link to="Stats">
            <button type="button">create stats</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'getdata',
    data() {
        return {
            data: [],
            genres: null,
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
                'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
                    this.api_key +
                    '&language=en-US'
            ),
        }
    },
    props: {
        id: Number,
        api_key: String,
    },
    created() {
        axios
            .all([this.callMovies, this.callGenres])
            .then(
                axios.spread((...responses) => {
                    const response = responses[0]
                    const genres = responses[1]
                    console.log(genres.data.genres)
                    this.genres = genres.data.genres
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
                    axios.all(this.calls).then(
                        axios.spread((...responses) => {
                            for (var x = 0; x < responses.length; x++) {
                                for (
                                    var i = 0;
                                    i < responses[x].data.results.length;
                                    i++
                                ) {
                                    this.data.push({
                                        title:
                                            responses[x].data.results[i].title,
                                        date: responses[x].data.results[
                                            i
                                        ].release_date.substr(0, 4),
                                        poster:
                                            'https://image.tmdb.org/t/p/w500' +
                                            responses[x].data.results[i]
                                                .poster_path,
                                        rating:
                                            responses[x].data.results[i]
                                                .rating / 2,
                                        language:
                                            responses[x].data.results[i]
                                                .original_language,
                                        genre_id:
                                            responses[x].data.results[i]
                                                .genre_ids,
                                        vote_average:
                                            responses[x].data.results[i]
                                                .vote_average,
                                        popularity:
                                            responses[x].data.results[i]
                                                .popularity,
                                        id: responses[x].data.results[i].id,
                                    })
                                }
                            }
                        })
                    )
                    this.page_num = response.data.total_pages
                    for (var y = 0; y <= 20; y++) {
                        this.data.push({
                            title: response.data.results[y].title,
                            date: response.data.results[y].release_date.substr(
                                0,
                                4
                            ),
                            poster:
                                'https://image.tmdb.org/t/p/w500' +
                                response.data.results[y].poster_path,
                            rating: response.data.results[y].rating / 2,
                            language:
                                response.data.results[y].original_language,
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
        this.$emit('data', this.data)
        this.$emit('genres', this.genres)
        this.success = 'Your films have been succesfully retrieved'
    },
}
</script>

<style></style>
