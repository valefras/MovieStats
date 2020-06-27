<template>
    <div class="bigcontainer">
        <div class="container">
            <div class="title">
                <h2>{{ decade.decade }}s</h2>
                <p>{{ decade.films.length }} films</p>
                <p>Average: {{ decade.average }}/5</p>
                <router-link
                    :to="{
                        name: 'Decade',
                        path: '/:year',
                        params: { year: decade.decade + 's' },
                    }"
                >
                    <p @click="$emit('decade', decade.decade)">See all</p>
                </router-link>
            </div>
            <div v-for="index in 16" :key="index">
                <cardDecade :film="decade.films[index - 1]" />
            </div>
        </div>
    </div>
</template>

<script>
import cardDecade from '../components/cardDecade.vue'
export default {
    name: 'container',
    props: {
        decade: Object,
    },
    components: {
        cardDecade,
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
