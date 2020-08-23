<template>
    <div>
        <button type="button" class="btn" @click="createToken" v-if="!authorized">
            Authorize on your TMDB account
        </button>
        <!-- <button type="button" @click="redirect">redirect</button> -->
        <!-- <button type="button" @click="createSession">create session</button> -->
        <button type="button" class="btn cnt" @click="createSession" v-if="!updated">
            Fetch your movies from TMDB
        </button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'session',
    data() {
        return {
            requestToken: '',
            sessionID: '',
            authorized: false,
            updated: true,
        }
    },
    created() {
        if (sessionStorage.getItem('token')) {
            this.authorized = true
            this.updated = false
        }
    },
    methods: {
        createToken() {
            axios
                .get('https://api.themoviedb.org/3/authentication/token/new?api_key=1de39ba8ae7e4330c0da7c4c9cb0adbf')
                .then(response => {
                    console.log(response.data)
                    this.requestToken = response.data.request_token
                    sessionStorage.setItem('token', this.requestToken)
                    window.location.href =
                        'https://www.themoviedb.org/authenticate/' +
                        this.requestToken +
                        '?redirect_to=http://localhost:8080/#/'
                    //https://moviestats-2ad27.web.app
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        createSession() {
            axios
                .post(
                    'https://api.themoviedb.org/3/authentication/session/new?api_key=1de39ba8ae7e4330c0da7c4c9cb0adbf&request_token=' +
                        sessionStorage.getItem('token')
                )
                .then(response => {
                    console.log(response)
                    this.sessionID = response.data.session_id
                    sessionStorage.setItem('session_id', this.sessionID)
                })
                .catch(function(error) {
                    console.log(error)
                })
                .then(() => {
                    this.$emit('call')
                    this.updated = true
                })
        },
        // redirect() {

        //},
    },
}
</script>
