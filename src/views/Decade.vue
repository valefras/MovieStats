<template>
    <div>
        <h1>{{ decade.decade }}s</h1>
        <p>{{ decade.films.length }} films</p>
        <input type="checkbox" id="checkbox" v-model="show" />
        <label for="checkbox">Show ratings</label>
        <div class="box">
            <div v-for="index in decade.films.length" :key="index">
                <cardDecade :film="decade.films[index - 1]" />
                <transition name="fade">
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
                        style="margin-bottom: 8px;"
                        :inline="true"
                        v-show="show"
                    />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import cardDecade from '../components/cardDecade.vue'
export default {
    name: 'Decade',
    props: {
        decade: Object,
    },
    data() {
        return {
            show: false,
        }
    },
    components: {
        cardDecade,
        StarRating,
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
