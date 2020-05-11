<template>
    <div class="home">
        <session v-on:load="sessionLoaded" />
        <graph1 :id="id" v-if="isLoaded" :api_key="api_key" />
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
            isLoaded: false,
        }
    },
    props: {
        id: Number,
        api_key: String,
    },
    methods: {
        sessionLoaded() {
            this.isLoaded = true
        },
    },
}
</script>
