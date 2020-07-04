<template>
    <div>
        <h1>All films</h1>
        <input type="checkbox" id="checkbox" v-model="show" />
        <label for="checkbox">Show ratings</label>
        <div class="box">
            <div v-for="index in filmdata.length" :key="index">
                <card :film="filmdata[index - 1]" />
                <transition name="fade">
                    <star-rating
                        :rating="filmdata[index - 1].rating"
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
import card from '../components/card.vue'
export default {
    name: 'Decade',
    /* props: {
        filmdata: Array,
    },*/
    components: {
        card,
        StarRating,
    },
    data() {
        return {
            filmdata: JSON.parse(localStorage.getItem('filmdata')),
            show: false,
            selected: '',
        }
    },
    created() {
        this.filmdata.sort((a, b) => (a.date > b.date ? -1 : 1))
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
