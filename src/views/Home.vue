<template>
    <div class="home">
        <h1>My Film Stats</h1>
        <session v-on:call="call" />
        <getdata :id="id" :api_key="api_key" v-if="show" v-on:data="data" />
    </div>
</template>

<script>
// @ is an alias to /src
import session from '@/components/create_session.vue'
import getdata from '../components/get_data.vue'

export default {
    name: 'Home',
    components: {
        session,
        getdata,
    },
    data() {
        return {
            show: false,
        }
    },
    props: {
        id: Number,
        api_key: String,
    },
    methods: {
        call() {
            this.show = true
        },
        data(data) {
            this.$emit('data', data)
        },
    },
}
</script>
