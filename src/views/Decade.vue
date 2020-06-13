<template>
    <div>
        <h1>{{ decade.decade }}s</h1>
        <p>{{ decade.films.length }} films</p>
        <div class="box">
            <div v-for="index in decade.films.length" :key="index">
                <card :film="decade.films[index - 1]" />
                <star-rating
                    :rating="decade.films[index - 1][2]"
                    :increment="0.5"
                    :read-only="true"
                    :star-size="16"
                    :show-rating="false"
                    :border-width="2"
                    :max-rating="5"
                    active-color="#949494"
                    inactive-color="#000000"
                    :padding="1"
                    border-color="#949494"
                    style="margin-bottom: 4px; display: block"
                />
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import card from '../components/card.vue'
export default {
    name: 'Decade',
    props: {
        decade: Object,
    },
    components: {
        card,
        StarRating,
    },
    created() {
        console.log(this.decade.films)
    },
}
</script>

<style>
.box {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
    max-width: 80%;
}
</style>
