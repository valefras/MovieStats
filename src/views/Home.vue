<template>
    <div class="home">
        <session v-on:call="call" />
        <graph1 :id="id" :api_key="api_key" v-if="show" />
    </div>
</template>

<script>
// @ is an alias to /src
import session from '@/components/create_session.vue'
import graph1 from '../components/graph1'

export default {
    name: 'Home',
    components: {
        session,
        graph1,
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
    },
}
</script>
