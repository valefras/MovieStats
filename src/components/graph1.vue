<template>
    <p>bruh</p>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'graph1',
    data() {
        return {
            data: [],
        }
    },
    props: {
        id: Number,
        api_key: String,
    },
    created() {
        Axios.get(
            'https://api.themoviedb.org/3/account/' +
                this.id +
                '/rated/movies?api_key=' +
                this.api_key +
                '&language=en-US&sort_by=created_at.asc&page=1&session_id=' +
                sessionStorage.getItem('session_id')
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error)
            })
    },
}
</script>

<style></style>
