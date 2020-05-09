<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>User name</label>
            <input
                required
                v-model="username"
                type="text"
                placeholder="Snoopy"
            />
            <label>Password</label>
            <input
                required
                v-model="password"
                type="password"
                placeholder="Password"
            />
            <hr />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HelloWorld',
    data() {
        return {
            username: '',
            password: '',
        }
    },
    created() {
        axios
            .get()
            .then(function(response) {})
            .catch(function(error) {
                console.log(error)
            })
    },
    methods: {
        login() {},
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
