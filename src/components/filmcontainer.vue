<template>
    <div class="bigcontainer">
        <div class="container">
            <div class="title">
                <router-link to="Decade">
                    <h2 @click="$emit('decade', decade.decade)">
                        {{ decade.decade }}s
                    </h2>
                </router-link>
                <p>{{ decade.films.length }} films</p>
                <p>Average: {{ decade.average }}/5</p>
            </div>
            <div v-for="index in 16" :key="index">
                <card :film="decade.films[index - 1]" />
            </div>
        </div>
    </div>
</template>

<script>
import card from '../components/card.vue'
export default {
    name: 'container',
    props: {
        decade: Object,
    },
    components: {
        card,
    },
    data() {
        return {
            hover: false,
            currentlyhovering: null,
        }
    },
    created() {
        this.decade.films.sort(function(a, b) {
            return b[2] - a[2]
        })
    },
}
</script>

<style>
.container {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 20% 10% 10% 10% 10% 10% 10% 10% 10%;
    max-width: 80%;
}
.bigcontainer {
    margin: 25px 0 0 0;
}

.title {
    grid-row-start: 1;
    grid-row-end: span 2;
}
</style>
