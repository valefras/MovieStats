<template>
    <div>
        <button type="button" @click="createToken">create token</button>
        <button type="button" @click="redirect">redirect</button>
        <button type="button" @click="createSession">create session</button>
        <button type="button" @click="$emit('call')">Update films</button>
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
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        redirect() {
            window.location.href =
                'https://www.themoviedb.org/authenticate/' + this.requestToken + '?redirect_to=http://localhost:8080/#/'
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
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
