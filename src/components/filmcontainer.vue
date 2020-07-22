<template>
    <div class="bigcontainer">
        <div class="container">
            <div class="title">
                <h2>{{ decade.decade }}s</h2>
                <p>{{ decade.films.length }} movies</p>
                <p>Average: {{ decade.average }}/5</p>
                <router-link
                    :to="{
                        name: 'All',
                        path: '/:mode/:page',
                        params: { mode: decade.decade + 's', page: 1 },
                    }"
                >
                    <button class="btn">See all</button>
                </router-link>
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
            return b.rating - a.rating
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
}
.bigcontainer {
    margin: 25px 0 0 0;
}

.title {
    grid-row-start: 1;
    grid-row-end: span 2;
}
@media screen and (max-width: 700px) {
    .container {
        margin: auto;
        display: grid;
        align-items: center;
        grid-template-columns: 25% 25% 25% 25%;
    }
    /* .bigcontainer {
        margin: 25px 0 0 0;
    } */

    .title {
        grid-column-start: 1;
        grid-column-end: span 2;
    }
}
@media (min-width: 700px) and (max-width: 991px) {
    .container {
        margin: auto;
        display: grid;
        align-items: center;
        grid-template-columns: 20% 20% 20% 20% 20%;
    }
    /* .bigcontainer {
        margin: 25px 0 0 0;
    } */

    .title {
        grid-column-start: 1;
        grid-column-end: span 2;
    }
}
@media (min-width: 992px) and (max-width: 1199px) {
    .container {
        margin: auto;
        display: grid;
        align-items: center;
        grid-template-columns: 17% 17% 17% 17% 17% 17%;
    }
    /* .bigcontainer {
        margin: 25px 0 0 0;
    } */

    .title {
        grid-column-start: 1;
        /* grid-column-end: span 2; */
    }
}
@media screen and (min-width: 1200px) {
    #decsep {
        display: none;
    }
}
</style>
